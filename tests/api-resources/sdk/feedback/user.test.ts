// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import EmcBackendSDK from 'emc-backend-sdk';

const client = new EmcBackendSDK({
  apiKey: 'My API Key',
  developerJwt: 'My Developer Jwt',
  adminJwt: 'My Admin Jwt',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource user', () => {
  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.sdk.feedback.user.list();
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
      client.sdk.feedback.user.list(
        {
          limit: 0,
          page: 0,
          pdf_id: 'pdf_id',
          session_id: 'session_id',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(EmcBackendSDK.NotFoundError);
  });

  // Mock server tests are disabled
  test.skip('submit: only required params', async () => {
    const responsePromise = client.sdk.feedback.user.submit({
      error_type: 'wrong_value',
      feedback: 'Date was filled as MM/DD/YYYY but form requires DD/MM/YYYY.',
      field_name: 'Date of Birth',
      field_type: 'date',
      page_number: 2,
      pdf_id: '42',
      session_id: 'clx9f2k3n0000abc123xyz',
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
  test.skip('submit: required and optional params', async () => {
    const response = await client.sdk.feedback.user.submit({
      error_type: 'wrong_value',
      feedback: 'Date was filled as MM/DD/YYYY but form requires DD/MM/YYYY.',
      field_name: 'Date of Birth',
      field_type: 'date',
      page_number: 2,
      pdf_id: '42',
      session_id: 'clx9f2k3n0000abc123xyz',
      corners: {
        x1: 120,
        y1: 340,
        x2: 300,
        y2: 360,
      },
    });
  });
});
