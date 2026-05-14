// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Register an account, log in, and manage API keys. Start here to get your sk_live_xxx secret key.
 */
export class APIKeys extends APIResource {
  /**
   * Generates a new `pk_live_xxx` / `sk_live_xxx` pair. **`secret_key` shown only
   * once** — store immediately. Use `name` to label per environment.
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
      __security: {},
    });
  }

  /**
   * Returns all API keys with secrets masked (`sk_live_***...`).
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
      __security: {},
    });
  }

  /**
   * Permanently deletes an API key. Requests using this key immediately receive
   * `401`. Cannot be undone.
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
      __security: {},
    });
  }

  /**
   * Issues a new `sk_live_xxx` secret, immediately invalidating the old one.
   * `key_id` and `public_key` stay the same. New secret shown only once.
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
      __security: {},
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
