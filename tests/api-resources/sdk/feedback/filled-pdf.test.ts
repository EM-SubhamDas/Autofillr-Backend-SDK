// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import EmcBackendSDK from 'autofillr-sdk';

const client = new EmcBackendSDK({
  apiKey: 'My API Key',
  developerJwt: 'My Developer Jwt',
  adminJwt: 'My Admin Jwt',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource filledPdf', () => {
  // Mock server tests are disabled
  test.skip('getVersionHistory: only required params', async () => {
    const responsePromise = client.sdk.feedback.filledPdf.getVersionHistory({
      pdf_id: 'pdf_id',
      session_id: 'session_id',
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
  test.skip('getVersionHistory: required and optional params', async () => {
    const response = await client.sdk.feedback.filledPdf.getVersionHistory({
      pdf_id: 'pdf_id',
      session_id: 'session_id',
    });
  });

  // Mock server tests are disabled
  test.skip('recordSaveEvent: only required params', async () => {
    const responsePromise = client.sdk.feedback.filledPdf.recordSaveEvent({
      filled_pdf_location: 'filled-pdfs/developer-123/session-abc/filled-form-v1.pdf',
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
  test.skip('recordSaveEvent: required and optional params', async () => {
    const response = await client.sdk.feedback.filledPdf.recordSaveEvent({
      filled_pdf_location: 'filled-pdfs/developer-123/session-abc/filled-form-v1.pdf',
      pdf_id: '42',
      session_id: 'clx9f2k3n0000abc123xyz',
    });
  });
});
