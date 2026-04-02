// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Pdffillr } from '../client';

export abstract class APIResource {
  protected _client: Pdffillr;

  constructor(client: Pdffillr) {
    this._client = client;
  }
}
