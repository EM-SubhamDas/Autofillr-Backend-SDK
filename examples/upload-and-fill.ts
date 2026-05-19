/**
 * Direct PDF fill workflow (no AI chat):
 *
 * 1. Upload an empty PDF template  → pdf_doc_id
 * 2. Upload a filled-info data file (JSON / CSV) → triggers the fill pipeline
 * 3. Poll until the fill job is ready
 * 4. Print the download URL (expires in 1 hour)
 *
 * Usage:
 *   PDFFILLR_API_KEY=sk_live_xxx npx ts-node examples/upload-and-fill.ts
 */

import fs from 'node:fs';
import path from 'node:path';
import Pdffillr from '@pdffillr/sdk';
import { pollUntilReady } from '../src/lib/poll';

const client = new Pdffillr({
  apiKey: process.env['PDFFILLR_API_KEY'],
});

async function main() {
  // --- Step 1: Upload the blank PDF template ---
  const pdfPath = path.resolve(__dirname, 'sample-template.pdf');
  if (!fs.existsSync(pdfPath)) {
    console.error(
      `PDF template not found at ${pdfPath}.\n` +
        'Place a sample PDF at examples/sample-template.pdf and re-run.',
    );
    process.exit(1);
  }

  console.log('Uploading PDF template…');
  const uploadResponse = await client.sdk.docs.upload({
    file: fs.createReadStream(pdfPath),
  }).asResponse();

  if (!uploadResponse.ok) {
    const text = await uploadResponse.text();
    throw new Error(`Upload failed (${uploadResponse.status}): ${text}`);
  }

  const { doc_id: pdfDocId } = (await uploadResponse.json()) as { doc_id: number };
  console.log(`Template uploaded. doc_id = ${pdfDocId}`);

  // --- Step 2: Upload filled-info data and trigger the pipeline ---
  const filledInfoPath = path.resolve(__dirname, 'sample-filled-info.json');
  if (!fs.existsSync(filledInfoPath)) {
    console.error(
      `Filled-info file not found at ${filledInfoPath}.\n` +
        'Place a data file at examples/sample-filled-info.json and re-run.',
    );
    process.exit(1);
  }

  console.log('Uploading filled-info data and triggering fill pipeline…');
  await client.sdk.docs.uploadFilledInfo({
    pdf_doc_id: pdfDocId,
    file: fs.createReadStream(filledInfoPath),
  });
  console.log('Fill job queued.');

  // --- Step 3: Poll until the job is done ---
  console.log('Polling for fill result (timeout: 2 min)…');
  const result = await pollUntilReady(client, pdfDocId, {
    timeoutMs: 120_000,
    initialIntervalMs: 3_000,
  });

  // --- Step 4: Done ---
  console.log('\nFill complete!');
  console.log(`Download URL (expires in 1 hr): ${result.url}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
