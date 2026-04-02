// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { type Uploadable } from '../../core/uploads';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { multipartFormRequestOptions } from '../../internal/uploads';
import { path } from '../../internal/utils/path';

export class Docs extends APIResource {
  /**
   * Retrieves the metadata for a single document by its `doc_id`. Useful for
   * checking the document's current fill status and storage details before
   * initiating a fill job.
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
   * Returns all documents uploaded under your developer account, ordered by upload
   * date descending. Each record includes `doc_id`, filename, MIME type, size,
   * upload timestamp, and fill status.
   *
   * @example
   * ```ts
   * await client.sdk.docs.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<void> {
    return this._client.get('/v1/sdk/docs', {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
      __security: { apiKeyAuth: true },
    });
  }

  /**
   * Permanently deletes a document and its associated S3 object. This action cannot
   * be undone. Any in-progress fill jobs referencing this document will fail.
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
   * Triggers the AI form-filling pipeline using the output already collected by a
   * chat session — no file upload required.
   *
   * **Use this when:**
   *
   * 1. You created a chat session via `POST /v1/sdk/chat/sessions`.
   * 2. You attached a PDF to the session via
   *    `POST /v1/sdk/chat/sessions/{sessionId}/attach-document`.
   * 3. The user chatted with the AI and provided their form details.
   * 4. Now you want to fill the PDF using what the AI collected.
   *
   * The pipeline reads the AI's stored output for this session and fills the
   * specified PDF. Poll `GET /v1/sdk/docs/{pdfDocId}/result` every 3–5 seconds until
   * `status` is `ready`, then download the filled PDF from the returned URL.
   *
   * @example
   * ```ts
   * await client.sdk.docs.fillFromSession();
   * ```
   */
  fillFromSession(options?: RequestOptions): APIPromise<void> {
    return this._client.post('/v1/sdk/docs/fill-from-session', {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
      __security: { apiKeyAuth: true },
    });
  }

  /**
   * Returns a URL for accessing the raw (unfilled) uploaded document.
   *
   * - `presigned=false` (default) — returns the stored S3 key path.
   * - `presigned=true` — returns a temporary presigned S3 URL valid for 1 hour,
   *   suitable for direct browser download or preview.
   *
   * @example
   * ```ts
   * await client.sdk.docs.getURL(0);
   * ```
   */
  getURL(
    docID: number,
    query: DocGetURLParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<void> {
    return this._client.get(path`/v1/sdk/docs/${docID}/url`, {
      query,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
      __security: { apiKeyAuth: true },
    });
  }

  /**
   * Polls the fill pipeline for the result of a fill job. Call this endpoint after
   * uploading a filled-info document via `POST /v1/sdk/docs/upload-filled-info`. The
   * response contains a `status` field:
   *
   * - `processing` — the AI pipeline is still working; poll again after a few
   *   seconds.
   * - `ready` — filling is complete; a `url` field contains a presigned download
   *   link for the filled PDF.
   * - `failed` — the pipeline encountered an error; check the `error` field for
   *   details.
   *
   * Recommended polling interval: 3–5 seconds. Links expire after 1 hour.
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
   * Uploads a PDF or supported document file to your developer storage. The returned
   * `doc_id` is used in all subsequent operations — filling, polling results, and
   * chat context. Supports PDF, DOCX, and image formats up to 10 MB.
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
   * Uploads a filled-info JSON/data file and triggers the AI form-filling pipeline
   * against an existing empty PDF.
   *
   * **Workflow:**
   *
   * 1. Upload the empty PDF template via `POST /v1/sdk/docs/upload` → get
   *    `pdf_doc_id`.
   * 2. Prepare a filled-info file (JSON or structured data) containing the values to
   *    inject into the form fields.
   * 3. Call this endpoint with the filled-info file and `pdf_doc_id` as a query
   *    parameter.
   * 4. Poll `GET /v1/sdk/docs/{pdfId}/result` every 3–5 seconds until `status` is
   *    `ready`.
   * 5. Download the filled PDF from the returned presigned URL.
   *
   * The pipeline is asynchronous — this endpoint returns immediately after queuing
   * the job.
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

export interface DocGetURLParams {
  /**
   * Pass `true` to receive a time-limited presigned S3 download URL. Defaults to
   * `false`.
   */
  presigned?: 'true' | 'false';
}

export interface DocUploadParams {
  /**
   * The document file (PDF, DOCX, PNG, JPG). Max 10 MB.
   */
  file: Uploadable;
}

export interface DocUploadFilledInfoParams {
  /**
   * Query param: The `doc_id` of the empty PDF template to fill. Must have been
   * uploaded via `POST /v1/sdk/docs/upload` first.
   */
  pdf_doc_id: number;

  /**
   * Body param: The filled-info file containing field values to inject into the PDF.
   */
  file: Uploadable;
}

export declare namespace Docs {
  export {
    type DocGetURLParams as DocGetURLParams,
    type DocUploadParams as DocUploadParams,
    type DocUploadFilledInfoParams as DocUploadFilledInfoParams,
  };
}
