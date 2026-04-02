// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class APIKeys extends APIResource {
  /**
   * Generates a new `pk_live_xxx` / `sk_live_xxx` API key pair under your developer
   * account.
   *
   * **Important:** The `secret_key` is returned **only once** in this response.
   * Store it immediately in a secure location. It cannot be retrieved again — rotate
   * the key to get a new one.
   *
   * You can create multiple key pairs (e.g. one per environment: development,
   * staging, production). Use the `name` field to label them.
   *
   * @example
   * ```ts
   * await client.developers.apiKeys.create();
   * ```
   */
  create(body: APIKeyCreateParams, options?: RequestOptions): APIPromise<void> {
    return this._client.post('/v1/developers/api-keys', {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
      __security: { developerSessionAuth: true },
    });
  }

  /**
   * Returns all API keys belonging to the authenticated developer. Secret keys are
   * masked in this response (shown as `sk_live_***...`). Use this to manage and
   * audit your active keys.
   *
   * @example
   * ```ts
   * await client.developers.apiKeys.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<void> {
    return this._client.get('/v1/developers/api-keys', {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
      __security: { developerSessionAuth: true },
    });
  }

  /**
   * Permanently deletes an API key pair. Any active requests using this key will
   * immediately start receiving `401 Unauthorized` responses. This action cannot be
   * undone.
   *
   * @example
   * ```ts
   * await client.developers.apiKeys.delete('keyId');
   * ```
   */
  delete(keyID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/developers/api-keys/${keyID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
      __security: { developerSessionAuth: true },
    });
  }

  /**
   * Generates a new secret key for an existing key pair, immediately invalidating
   * the old secret. The `key_id` and `public_key` remain the same — only the
   * `sk_live_xxx` secret changes.
   *
   * **Important:** The old secret stops working immediately upon rotation. Update
   * your environment variables with the new secret before rotating in production.
   * The new secret is returned only once.
   *
   * @example
   * ```ts
   * await client.developers.apiKeys.rotate('keyId');
   * ```
   */
  rotate(keyID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.post(path`/v1/developers/api-keys/${keyID}/rotate`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
      __security: { developerSessionAuth: true },
    });
  }
}

export interface APIKeyCreateParams {
  /**
   * Name for this API key
   */
  name?: string;
}

export declare namespace APIKeys {
  export { type APIKeyCreateParams as APIKeyCreateParams };
}
