// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Engineersmind } from '../client';

export abstract class APIResource {
  protected _client: Engineersmind;

  constructor(client: Engineersmind) {
    this._client = client;
  }
}
