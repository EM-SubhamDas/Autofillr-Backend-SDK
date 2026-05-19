/**
 * Developer authentication & API key management workflow:
 *
 * 1. Register a new developer account
 * 2. Log in and receive a JWT
 * 3. Create an API key (used for all SDK fill/chat operations)
 * 4. List all API keys
 * 5. Rotate an existing API key
 *
 * Usage:
 *   PDFFILLR_DEVELOPER_JWT=<jwt> npx ts-node examples/developer-auth.ts
 *
 * To get your first JWT, register and log in first:
 *   npx ts-node examples/developer-auth.ts --register
 */

import Pdffillr from '@pdffillr/sdk';

const unauthClient = new Pdffillr({ apiKey: null, developerJwt: null });

const authedClient = new Pdffillr({
  apiKey: null,
  developerJwt: process.env['PDFFILLR_DEVELOPER_JWT'],
});

async function register() {
  console.log('Registering developer account...');
  const res = await unauthClient.developers.register({
    display_name: 'Jane Doe',
    email: 'jane@example.com',
    password: 'super-secret-password',
  }, { headers: { Authorization: null } }).asResponse();

  if (!res.ok) throw new Error(`Registration failed (${res.status}): ${await res.text()}`);
  const data = await res.json() as { message: string };
  console.log('Registered:', data.message);
}

async function login() {
  console.log('Logging in...');
  const res = await unauthClient.developers.login({
    email: 'jane@example.com',
    password: 'super-secret-password',
  }, { headers: { Authorization: null } }).asResponse();

  if (!res.ok) throw new Error(`Login failed (${res.status}): ${await res.text()}`);
  const { token } = await res.json() as { token: string };
  console.log('\nSuccess! Set this env var for next steps:');
  console.log(`  export PDFFILLR_DEVELOPER_JWT="${token}"`);
  return token;
}

async function manageApiKeys() {
  // Create
  console.log('\nCreating API key...');
  const createRes = await authedClient.developers.apiKeys.create({ name: 'my-app-key' }).asResponse();
  if (!createRes.ok) throw new Error(`Create failed (${createRes.status}): ${await createRes.text()}`);
  const { key_id, api_key } = await createRes.json() as { key_id: string; api_key: string };
  console.log(`Created → ${api_key}  (id: ${key_id})`);
  console.log('Use this as PDFFILLR_API_KEY in other examples.');

  // List
  console.log('\nAll API keys:');
  const listRes = await authedClient.developers.apiKeys.list().asResponse();
  const { keys } = await listRes.json() as { keys: Array<{ key_id: string; name: string }> };
  keys.forEach((k) => console.log(`  · ${k.name}  (${k.key_id})`));

  // Rotate
  console.log(`\nRotating key ${key_id}...`);
  const rotateRes = await authedClient.developers.apiKeys.rotate(key_id).asResponse();
  const { api_key: newKey } = await rotateRes.json() as { api_key: string };
  console.log(`New key after rotation: ${newKey}`);
}

async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--register')) {
    await register();
    await login();
    return;
  }

  if (!process.env['PDFFILLR_DEVELOPER_JWT']) {
    console.error('Missing PDFFILLR_DEVELOPER_JWT. Run with --register first.');
    process.exit(1);
  }

  await manageApiKeys();
}

main().catch((err) => { console.error(err); process.exit(1); });