/**
 * AI chat-based PDF fill workflow:
 *
 * 1. Upload an empty PDF template       → pdf_doc_id
 * 2. Create a chat session              → session_id
 * 3. Attach the PDF to the session
 * 4. Exchange messages with the AI to supply field values
 * 5. Trigger fill from the session      → queues fill job
 * 6. Poll until the fill job is ready
 * 7. Print the download URL
 *
 * Usage:
 *   PDFFILLR_API_KEY=sk_live_xxx npx ts-node examples/chat-fill-workflow.ts
 */

import fs from 'node:fs';
import path from 'node:path';
import * as readline from 'node:readline/promises';
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
  console.log(`Template uploaded. doc_id = ${pdfDocId}\n`);

  // --- Step 2: Create a chat session ---
  console.log('Creating chat session…');
  const sessionResponse = await client.sdk.chat.sessions.create({
    title: 'PDF fill via chat',
  }).asResponse();

  if (!sessionResponse.ok) {
    throw new Error(`Session creation failed (${sessionResponse.status})`);
  }

  const { session_id: sessionId } = (await sessionResponse.json()) as { session_id: string };
  console.log(`Session created. session_id = ${sessionId}\n`);

  // --- Step 3: Attach the PDF to the session ---
  console.log('Attaching PDF to session…');
  await client.sdk.chat.sessions.attachDocument(sessionId, { doc_id: pdfDocId });
  console.log('PDF attached. The AI now has the document as context.\n');

  // --- Step 4: Interactive chat loop ---
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  console.log('Start chatting with the AI to provide field values.');
  console.log('Type "done" when you are ready to trigger the fill.\n');

  while (true) {
    const userMessage = await rl.question('You: ');

    if (userMessage.trim().toLowerCase() === 'done') {
      rl.close();
      break;
    }

    const messageResponse = await client.sdk.chat.sendMessage({
      message: userMessage,
      session_id: sessionId,
    }).asResponse();

    if (!messageResponse.ok) {
      console.error(`Message failed (${messageResponse.status})`);
      continue;
    }

    const { reply } = (await messageResponse.json()) as { reply: string };
    console.log(`\nAI: ${reply}\n`);
  }

  // --- Step 5: Trigger fill from the session output ---
  console.log('\nTriggering fill pipeline from session…');
  await client.sdk.chat.sessions.triggerFill(sessionId, { pdf_doc_id: pdfDocId });
  console.log('Fill job queued. Ending session.');

  await client.sdk.chat.sessions.end(sessionId);

  // --- Step 6: Poll until the job is done ---
  console.log('Polling for fill result (timeout: 2 min)…');
  const result = await pollUntilReady(client, pdfDocId, {
    timeoutMs: 120_000,
    initialIntervalMs: 3_000,
  });

  // --- Step 7: Done ---
  console.log('\nFill complete!');
  console.log(`Download URL (expires in 1 hr): ${result.url}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
