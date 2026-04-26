// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Pdffillr from '@pdffillr/sdk';

const client = new Pdffillr({
  apiKey: 'My API Key',
  developerJwt: 'My Developer Jwt',
  baseURL: process.env["TEST_API_BASE_URL"] ?? 'http://127.0.0.1:4010',
});

describe('resource sessions', () => {
  // Mock server tests are disabled
  test.skip('create', async () => {
    const responsePromise = client.sdk.chat.sessions.create({});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.sdk.chat.sessions.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('attachDocument: only required params', async () => {
    const responsePromise = client.sdk.chat.sessions.attachDocument('sessionId', { doc_id: 42 });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('attachDocument: required and optional params', async () => {
    const response = await client.sdk.chat.sessions.attachDocument('sessionId', { doc_id: 42 });
  });

  // Mock server tests are disabled
  test.skip('end', async () => {
    const responsePromise = client.sdk.chat.sessions.end('sessionId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('getMessages', async () => {
    const responsePromise = client.sdk.chat.sessions.getMessages('sessionId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('getMessages: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(client.sdk.chat.sessions.getMessages('sessionId', { page: 0, size: 0 }, { path: '/_stainless_unknown_path' }))
      .rejects
      .toThrow(Pdffillr.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('triggerFill: only required params', async () => {
    const responsePromise = client.sdk.chat.sessions.triggerFill('sessionId', { pdf_doc_id: 17 });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('triggerFill: required and optional params', async () => {
    const response = await client.sdk.chat.sessions.triggerFill('sessionId', { pdf_doc_id: 17 });
  });
});
