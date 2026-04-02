// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as FilledPdfAPI from './filled-pdf';
import { FilledPdf, FilledPdfGetVersionHistoryParams, FilledPdfRecordSaveParams } from './filled-pdf';
import * as UserAPI from './user';
import { User, UserListParams, UserSubmitParams } from './user';

export class Feedback extends APIResource {
  user: UserAPI.User = new UserAPI.User(this._client);
  filledPdf: FilledPdfAPI.FilledPdf = new FilledPdfAPI.FilledPdf(this._client);
}

Feedback.User = User;
Feedback.FilledPdf = FilledPdf;

export declare namespace Feedback {
  export { User as User, type UserListParams as UserListParams, type UserSubmitParams as UserSubmitParams };

  export {
    FilledPdf as FilledPdf,
    type FilledPdfGetVersionHistoryParams as FilledPdfGetVersionHistoryParams,
    type FilledPdfRecordSaveParams as FilledPdfRecordSaveParams,
  };
}
