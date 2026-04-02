// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { EmcBackendSDK } from '../client';

export abstract class APIResource {
  protected _client: EmcBackendSDK;

  constructor(client: EmcBackendSDK) {
    this._client = client;
  }
}
