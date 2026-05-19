#!/usr/bin/env -S npm run tsn -T

import PdffillrSDK from '@pdffillr/sdk';

const client = new PdffillrSDK({ apiKey: process.env['PDFFILLR_API_KEY'] });

async function main() {
  const session = await client.sdk.chat.sessions.create({
    title: 'Test session',
  });
  console.log(session);
}

main();
