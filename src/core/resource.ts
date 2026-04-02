// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Autofillr } from '../client';

export abstract class APIResource {
  protected _client: Autofillr;

  constructor(client: Autofillr) {
    this._client = client;
  }
}
