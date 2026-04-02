// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as DocsAPI from './docs';
import { DocUploadFilledInfoParams, DocUploadParams, Docs } from './docs';
import * as NotificationsAPI from './notifications';
import { NotificationListParams, NotificationMarkReadParams, Notifications } from './notifications';
import * as ChatAPI from './chat/chat';
import { Chat, ChatSendMessageParams } from './chat/chat';
import * as FeedbackAPI from './feedback/feedback';
import { Feedback } from './feedback/feedback';

export class SDK extends APIResource {
  chat: ChatAPI.Chat = new ChatAPI.Chat(this._client);
  docs: DocsAPI.Docs = new DocsAPI.Docs(this._client);
  feedback: FeedbackAPI.Feedback = new FeedbackAPI.Feedback(this._client);
  notifications: NotificationsAPI.Notifications = new NotificationsAPI.Notifications(this._client);
}

SDK.Chat = Chat;
SDK.Docs = Docs;
SDK.Feedback = Feedback;
SDK.Notifications = Notifications;

export declare namespace SDK {
  export { Chat as Chat, type ChatSendMessageParams as ChatSendMessageParams };

  export {
    Docs as Docs,
    type DocUploadParams as DocUploadParams,
    type DocUploadFilledInfoParams as DocUploadFilledInfoParams,
  };

  export { Feedback as Feedback };

  export {
    Notifications as Notifications,
    type NotificationListParams as NotificationListParams,
    type NotificationMarkReadParams as NotificationMarkReadParams,
  };
}
