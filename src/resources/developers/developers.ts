// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as APIKeysAPI from './api-keys';
import { APIKeyCreateParams, APIKeys } from './api-keys';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';

export class Developers extends APIResource {
  apiKeys: APIKeysAPI.APIKeys = new APIKeysAPI.APIKeys(this._client);

  /**
   * Authenticates with email and password and returns a short-lived JWT
   * (`developer-session` token) for managing API keys via the dashboard endpoints.
   *
   * **This token is NOT used for SDK API calls.** To call SDK endpoints (documents,
   * chat, feedback, notifications), use your `sk_live_xxx` secret key directly in
   * the `Authorization: Bearer` header.
   *
   * The session token expires after a short period. Re-login when it expires.
   *
   * @example
   * ```ts
   * await client.developers.login({
   *   email: 'developer@example.com',
   *   password: 'MySecurePass123!',
   * });
   * ```
   */
  login(body: DeveloperLoginParams, options?: RequestOptions): APIPromise<void> {
    return this._client.post('/v1/developers/login', {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Creates a new developer account and automatically generates a default API key
   * pair (`pk_live_xxx` public key + `sk_live_xxx` secret key).
   *
   * **Important:** The `secret_key` (`sk_live_xxx`) is returned **only once** in
   * this response. Copy and store it immediately in a secure location (e.g. an
   * environment variable or secrets manager). It cannot be retrieved again — if
   * lost, rotate the key via `POST /v1/developers/api-keys/{keyId}/rotate`.
   *
   * The `public_key` (`pk_live_xxx`) can be used in client-side contexts where it is
   * acceptable to expose the key. Use the `secret_key` only in server-side code.
   *
   * @example
   * ```ts
   * await client.developers.register({
   *   display_name: 'John Doe',
   *   email: 'developer@example.com',
   *   password: 'MySecurePass123!',
   * });
   * ```
   */
  register(body: DeveloperRegisterParams, options?: RequestOptions): APIPromise<void> {
    return this._client.post('/v1/developers/register', {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Returns the profile of the currently authenticated developer including account
   * details and usage stats. Requires a valid `developer-session` token obtained
   * from `POST /v1/developers/login`.
   *
   * @example
   * ```ts
   * await client.developers.retrieveProfile();
   * ```
   */
  retrieveProfile(options?: RequestOptions): APIPromise<void> {
    return this._client.get('/v1/developers/me', {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
      __security: { developerSessionAuth: true },
    });
  }
}

export interface DeveloperLoginParams {
  /**
   * The email address registered with your developer account.
   */
  email: string;

  /**
   * Your account password.
   */
  password: string;
}

export interface DeveloperRegisterParams {
  /**
   * A human-readable display name shown in the developer dashboard and admin panel.
   */
  display_name: string;

  /**
   * The email address for the developer account. Used to log in and receive account
   * notifications. Must be unique across all developer accounts.
   */
  email: string;

  /**
   * Account password. Minimum 8 characters. Store this securely — it cannot be
   * recovered, only reset.
   */
  password: string;
}

Developers.APIKeys = APIKeys;

export declare namespace Developers {
  export {
    type DeveloperLoginParams as DeveloperLoginParams,
    type DeveloperRegisterParams as DeveloperRegisterParams,
  };

  export { APIKeys as APIKeys, type APIKeyCreateParams as APIKeyCreateParams };
}
