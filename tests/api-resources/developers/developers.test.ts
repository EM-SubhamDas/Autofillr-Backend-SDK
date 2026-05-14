// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Pdffillr from '@pdffillr/sdk';

const client = new Pdffillr({
  apiKey: 'My API Key',
  developerJwt: 'My Developer Jwt',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource developers', () => {
  // Mock server tests are disabled
  test.skip('login: only required params', async () => {
    const responsePromise = client.developers.login({
      email: 'developer@example.com',
      password: 'MySecurePass123!',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('login: required and optional params', async () => {
    const response = await client.developers.login({
      email: 'developer@example.com',
      password: 'MySecurePass123!',
      agreed_to_terms: true,
    });
  });

  // Mock server tests are disabled
  test.skip('register: only required params', async () => {
    const responsePromise = client.developers.register({
      display_name: 'John Doe',
      email: 'developer@example.com',
      password: 'MySecurePass123!',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('register: required and optional params', async () => {
    const response = await client.developers.register({
      display_name: 'John Doe',
      email: 'developer@example.com',
      password: 'MySecurePass123!',
    });
  });

  // Mock server tests are disabled
  test.skip('retrieveProfile', async () => {
    const responsePromise = client.developers.retrieveProfile();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
