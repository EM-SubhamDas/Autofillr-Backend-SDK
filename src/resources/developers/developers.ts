// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as APIKeysAPI from './api-keys';
import { APIKeyCreateParams, APIKeys } from './api-keys';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';

/**
 * Register an account, log in, and manage API keys. Start here to get your sk_live_xxx secret key.
 */
export class Developers extends APIResource {
  apiKeys: APIKeysAPI.APIKeys = new APIKeysAPI.APIKeys(this._client);

  /**
   * Returns a short-lived `developer-session` JWT for managing API keys. **Not used
   * for SDK API calls** — use `sk_live_xxx` for those.
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
   * Creates an account and generates a default API key pair (`pk_live_xxx` +
   * `sk_live_xxx`). **The `secret_key` is shown only once** — store it immediately.
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
   * Returns the authenticated developer's profile. Requires `developer-session`
   * token from `POST /v1/developers/login`.
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
