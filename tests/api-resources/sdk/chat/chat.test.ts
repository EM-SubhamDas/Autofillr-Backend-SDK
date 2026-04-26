// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Pdffillr from '@pdffillr/sdk';

const client = new Pdffillr({
  apiKey: 'My API Key',
  developerJwt: 'My Developer Jwt',
  baseURL: process.env["TEST_API_BASE_URL"] ?? 'http://127.0.0.1:4010',
});

describe('resource chat', () => {
  // Mock server tests are disabled
  test.skip('sendMessage: only required params', async () => {
    const responsePromise = client.sdk.chat.sendMessage({ message: 'What is the deadline field on page 2?', session_id: 'clx9f2k3n0000abc123xyz' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('sendMessage: required and optional params', async () => {
    const response = await client.sdk.chat.sendMessage({ message: 'What is the deadline field on page 2?', session_id: 'clx9f2k3n0000abc123xyz' });
  });
});
