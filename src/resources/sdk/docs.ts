// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { type Uploadable } from '../../core/uploads';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { multipartFormRequestOptions } from '../../internal/uploads';
import { path } from '../../internal/utils/path';

/**
 * Upload PDF templates, trigger the AI fill pipeline, and download filled PDFs.
 */
export class Docs extends APIResource {
  /**
   * Returns metadata for a document — `doc_id`, filename, MIME type, fill status,
   * and S3 key.
   *
   * @example
   * ```ts
   * await client.sdk.docs.retrieve(0);
   * ```
   */
  retrieve(docID: number, options?: RequestOptions): APIPromise<void> {
    return this._client.get(path`/v1/sdk/docs/${docID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
      __security: { apiKeyAuth: true },
    });
  }

  /**
   * Permanently deletes a document and its S3 object. In-progress fill jobs
   * referencing this document will fail.
   *
   * @example
   * ```ts
   * await client.sdk.docs.delete(0);
   * ```
   */
  delete(docID: number, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/sdk/docs/${docID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
      __security: { apiKeyAuth: true },
    });
  }

  /**
   * Returns fill job status: `processing` (poll again in 3–5 s), `ready` (download
   * `url` — expires 1 hr), or `failed` (`error` field).
   *
   * @example
   * ```ts
   * await client.sdk.docs.pollFillResult(0);
   * ```
   */
  pollFillResult(pdfID: number, options?: RequestOptions): APIPromise<void> {
    return this._client.get(path`/v1/sdk/docs/${pdfID}/result`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
      __security: { apiKeyAuth: true },
    });
  }

  /**
   * Uploads a PDF, DOCX, or image (max 10 MB). Returns a `doc_id` used in all fill
   * and chat operations.
   *
   * @example
   * ```ts
   * await client.sdk.docs.upload({
   *   file: fs.createReadStream('path/to/file'),
   * });
   * ```
   */
  upload(body: DocUploadParams, options?: RequestOptions): APIPromise<void> {
    return this._client.post(
      '/v1/sdk/docs/upload',
      multipartFormRequestOptions(
        {
          body,
          ...options,
          headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
          __security: { apiKeyAuth: true },
        },
        this._client,
      ),
    );
  }

  /**
   * Uploads a filled-info data file and triggers the AI fill pipeline. **Workflow:**
   * (1) Upload empty PDF → `pdf_doc_id`. (2) Upload filled-info here with
   * `?pdf_doc_id=`. (3) Poll `GET /{pdfId}/result` until `ready`. (4) Download.
   *
   * @example
   * ```ts
   * await client.sdk.docs.uploadFilledInfo({
   *   pdf_doc_id: 0,
   *   file: fs.createReadStream('path/to/file'),
   * });
   * ```
   */
  uploadFilledInfo(params: DocUploadFilledInfoParams, options?: RequestOptions): APIPromise<void> {
    const { pdf_doc_id, ...body } = params;
    return this._client.post(
      '/v1/sdk/docs/upload-filled-info',
      multipartFormRequestOptions(
        {
          query: { pdf_doc_id },
          body,
          ...options,
          headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
          __security: { apiKeyAuth: true },
        },
        this._client,
      ),
    );
  }
}

export interface DocUploadParams {
  file: Uploadable;
}

export interface DocUploadFilledInfoParams {
  /**
   * Query param: `doc_id` of the empty PDF to fill.
   */
  pdf_doc_id: number;

  /**
   * Body param
   */
  file: Uploadable;
}

export declare namespace Docs {
  export {
    type DocUploadParams as DocUploadParams,
    type DocUploadFilledInfoParams as DocUploadFilledInfoParams,
  };
}
