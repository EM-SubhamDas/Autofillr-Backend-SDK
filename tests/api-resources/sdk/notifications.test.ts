// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Pdffillr from '@pdffillr/sdk';

const client = new Pdffillr({
  apiKey: 'My API Key',
  developerJwt: 'My Developer Jwt',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource notifications', () => {
  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.sdk.notifications.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.sdk.notifications.list({ page: 0, pageSize: 0 }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Pdffillr.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('markRead', async () => {
    const responsePromise = client.sdk.notifications.markRead({});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
