// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';

export class User extends APIResource {
  /**
   * Retrieves all feedback submitted under your developer account, with optional
   * filters by session or PDF. Results are paginated and ordered by submission date
   * descending.
   *
   * Useful for building an admin view of reported issues in your application, or for
   * exporting feedback data for model improvement.
   *
   * @example
   * ```ts
   * await client.sdk.feedback.user.list();
   * ```
   */
  list(query: UserListParams | null | undefined = {}, options?: RequestOptions): APIPromise<void> {
    return this._client.get('/v1/sdk/feedback/user', {
      query,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
      __security: { apiKeyAuth: true },
    });
  }

  /**
   * Records feedback about an incorrectly filled form field. Use this endpoint to
   * let end-users report problems with the AI's output — for example, a field filled
   * with the wrong value, wrong type, or placed on the wrong page.
   *
   * This data is used to improve the AI model and is visible in the admin analytics
   * dashboard. You should call this endpoint whenever your application surfaces a
   * 'Report an issue' or 'This is wrong' UI action to end-users.
   *
   * **Required fields:** `session_id`, `pdf_id`, `error_type`, `field_name`,
   * `field_type`, `page_number`, `feedback`.
   *
   * **`error_type` values:** `wrong_value`, `wrong_field`, `missing_field`,
   * `extra_field`, `formatting`, `other`.
   *
   * @example
   * ```ts
   * await client.sdk.feedback.user.submit({
   *   error_type: 'wrong_value',
   *   feedback:
   *     'The date was filled as MM/DD/YYYY but the form requires DD/MM/YYYY format.',
   *   field_name: 'Date of Birth',
   *   field_type: 'date',
   *   page_number: 2,
   *   pdf_id: '42',
   *   session_id: 'clx9f2k3n0000abc123xyz',
   * });
   * ```
   */
  submit(body: UserSubmitParams, options?: RequestOptions): APIPromise<void> {
    return this._client.post('/v1/sdk/feedback/user', {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
      __security: { apiKeyAuth: true },
    });
  }
}

export interface UserListParams {
  /**
   * Number of records per page (1–100). Defaults to `20`.
   */
  limit?: number;

  /**
   * Page number (1-based). Defaults to `1`.
   */
  page?: number;

  /**
   * Filter feedback by a specific PDF ID.
   */
  pdf_id?: string;

  /**
   * Filter feedback by a specific chat session ID.
   */
  session_id?: string;
}

export interface UserSubmitParams {
  /**
   * Category of the error. Accepted values: `wrong_value` (field filled with
   * incorrect data), `wrong_field` (value placed in the wrong field),
   * `missing_field` (field was not filled but should have been), `extra_field`
   * (field filled when it should be empty), `formatting` (correct value but wrong
   * format), `other`.
   */
  error_type: string;

  /**
   * A plain-text description of what was wrong and, if known, what the correct value
   * should have been. This is shown to the admin team for review.
   */
  feedback: string;

  /**
   * The exact name or label of the form field that was filled incorrectly, as it
   * appears on the PDF.
   */
  field_name: string;

  /**
   * The type of the form field. Common values: `text`, `checkbox`, `radio`, `date`,
   * `signature`, `dropdown`.
   */
  field_type: string;

  /**
   * The page number (1-based) of the PDF where the incorrectly filled field appears.
   */
  page_number: number;

  /**
   * The ID of the PDF document that was incorrectly filled.
   */
  pdf_id: string;

  /**
   * The ID of the chat session in which the fill error occurred.
   */
  session_id: string;

  /**
   * Optional bounding-box corner coordinates of the field on the PDF page, in the
   * format `{ x1, y1, x2, y2 }`. Used for precise field highlighting in the admin
   * review UI.
   */
  corners?: unknown;
}

export declare namespace User {
  export { type UserListParams as UserListParams, type UserSubmitParams as UserSubmitParams };
}
