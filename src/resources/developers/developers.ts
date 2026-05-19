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
   * Returns a paginated list of API request logs, ordered by most recent first.
   *
   * @example
   * ```ts
   * await client.developers.getRequestHistory();
   * ```
   */
  getRequestHistory(
    query: DeveloperGetRequestHistoryParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<void> {
    return this._client.get('/v1/developers/me/requests', {
      query,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
      __security: {},
    });
  }

  /**
   * Returns active API key count, today's request count (with % change vs
   * yesterday), quota usage, and security event count for the current month.
   *
   * @example
   * ```ts
   * await client.developers.getStats();
   * ```
   */
  getStats(options?: RequestOptions): APIPromise<void> {
    return this._client.get('/v1/developers/me/stats', {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
      __security: {},
    });
  }

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
   * Clears the `developerToken` HttpOnly cookie. Call this on sign-out.
   *
   * @example
   * ```ts
   * await client.developers.logout();
   * ```
   */
  logout(options?: RequestOptions): APIPromise<void> {
    return this._client.post('/v1/developers/logout', {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Allows platform users to access the Developer Console using their existing
   * platform Auth0 token. Automatically creates or links a Developer account — no
   * separate registration needed.
   *
   * @example
   * ```ts
   * await client.developers.platformLogin();
   * ```
   */
  platformLogin(body: DeveloperPlatformLoginParams, options?: RequestOptions): APIPromise<void> {
    return this._client.post('/v1/developers/platform-login', {
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
   * Returns the authenticated developer's profile. Requires `developerToken` cookie
   * from `POST /v1/developers/login` or `POST /v1/developers/platform-login`.
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
      __security: {},
    });
  }
}

export interface DeveloperGetRequestHistoryParams {
  /**
   * Items per page (default: 20, max: 100)
   */
  limit?: number;

  /**
   * Page number (default: 1)
   */
  page?: number;
}

export interface DeveloperLoginParams {
  /**
   * The email address registered with your platform account.
   */
  email: string;

  /**
   * Your platform account password.
   */
  password: string;

  /**
   * Must be true to proceed. Confirms acceptance of the Developer Console terms and
   * conditions.
   */
  agreed_to_terms?: boolean;
}

export interface DeveloperPlatformLoginParams {
  /**
   * Platform Auth0 access token. If omitted, the token is read from the
   * `accessToken` HttpOnly cookie set during platform login — useful when the
   * frontend cannot access the token directly (e.g. after Google OAuth).
   */
  access_token?: string;

  /**
   * Optional password to set (or update) on your Developer Console account. Once
   * set, you can also login using your email + this password via POST
   * /v1/developers/login.
   */
  password?: string;
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
    type DeveloperGetRequestHistoryParams as DeveloperGetRequestHistoryParams,
    type DeveloperLoginParams as DeveloperLoginParams,
    type DeveloperPlatformLoginParams as DeveloperPlatformLoginParams,
    type DeveloperRegisterParams as DeveloperRegisterParams,
  };

  export { APIKeys as APIKeys, type APIKeyCreateParams as APIKeyCreateParams };
}
