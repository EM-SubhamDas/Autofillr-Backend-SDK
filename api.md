# SDK

## Chat

Methods:

- <code title="post /v1/sdk/chat/send">client.sdk.chat.<a href="./src/resources/sdk/chat/chat.ts">sendMessage</a>({ ...params }) -> void</code>

### Sessions

Methods:

- <code title="post /v1/sdk/chat/sessions">client.sdk.chat.sessions.<a href="./src/resources/sdk/chat/sessions.ts">create</a>({ ...params }) -> void</code>
- <code title="get /v1/sdk/chat/sessions">client.sdk.chat.sessions.<a href="./src/resources/sdk/chat/sessions.ts">list</a>() -> void</code>
- <code title="post /v1/sdk/chat/sessions/{sessionId}/attach-document">client.sdk.chat.sessions.<a href="./src/resources/sdk/chat/sessions.ts">attachDocument</a>(sessionID, { ...params }) -> void</code>
- <code title="post /v1/sdk/chat/sessions/{sessionId}/end">client.sdk.chat.sessions.<a href="./src/resources/sdk/chat/sessions.ts">end</a>(sessionID) -> void</code>
- <code title="get /v1/sdk/chat/sessions/{sessionId}/messages">client.sdk.chat.sessions.<a href="./src/resources/sdk/chat/sessions.ts">getMessages</a>(sessionID, { ...params }) -> void</code>
- <code title="post /v1/sdk/chat/sessions/{sessionId}/fill">client.sdk.chat.sessions.<a href="./src/resources/sdk/chat/sessions.ts">triggerFill</a>(sessionID, { ...params }) -> void</code>

## Docs

Methods:

- <code title="delete /v1/sdk/docs/{docId}">client.sdk.docs.<a href="./src/resources/sdk/docs.ts">delete</a>(docID) -> void</code>
- <code title="get /v1/sdk/docs/{docId}">client.sdk.docs.<a href="./src/resources/sdk/docs.ts">getMetadata</a>(docID) -> void</code>
- <code title="get /v1/sdk/docs/{pdfId}/result">client.sdk.docs.<a href="./src/resources/sdk/docs.ts">pollFillResult</a>(pdfID) -> void</code>
- <code title="post /v1/sdk/docs/upload">client.sdk.docs.<a href="./src/resources/sdk/docs.ts">upload</a>({ ...params }) -> void</code>
- <code title="post /v1/sdk/docs/upload-filled-info">client.sdk.docs.<a href="./src/resources/sdk/docs.ts">uploadFilledInfo</a>({ ...params }) -> void</code>

## Feedback

### User

Methods:

- <code title="get /v1/sdk/feedback/user">client.sdk.feedback.user.<a href="./src/resources/sdk/feedback/user.ts">list</a>({ ...params }) -> void</code>
- <code title="post /v1/sdk/feedback/user">client.sdk.feedback.user.<a href="./src/resources/sdk/feedback/user.ts">submit</a>({ ...params }) -> void</code>

### FilledPdf

Methods:

- <code title="get /v1/sdk/feedback/filled-pdf">client.sdk.feedback.filledPdf.<a href="./src/resources/sdk/feedback/filled-pdf.ts">getVersionHistory</a>({ ...params }) -> void</code>
- <code title="post /v1/sdk/feedback/filled-pdf">client.sdk.feedback.filledPdf.<a href="./src/resources/sdk/feedback/filled-pdf.ts">recordSave</a>({ ...params }) -> void</code>

## Notifications

Methods:

- <code title="get /v1/sdk/notifications">client.sdk.notifications.<a href="./src/resources/sdk/notifications.ts">list</a>({ ...params }) -> void</code>
- <code title="post /v1/sdk/notifications/read">client.sdk.notifications.<a href="./src/resources/sdk/notifications.ts">markAsRead</a>({ ...params }) -> void</code>

# Developers

Methods:

- <code title="post /v1/developers/login">client.developers.<a href="./src/resources/developers/developers.ts">login</a>({ ...params }) -> void</code>
- <code title="post /v1/developers/register">client.developers.<a href="./src/resources/developers/developers.ts">register</a>({ ...params }) -> void</code>
- <code title="get /v1/developers/me">client.developers.<a href="./src/resources/developers/developers.ts">retrieveProfile</a>() -> void</code>

## APIKeys

Methods:

- <code title="post /v1/developers/api-keys">client.developers.apiKeys.<a href="./src/resources/developers/api-keys.ts">create</a>({ ...params }) -> void</code>
- <code title="get /v1/developers/api-keys">client.developers.apiKeys.<a href="./src/resources/developers/api-keys.ts">list</a>() -> void</code>
- <code title="delete /v1/developers/api-keys/{keyId}">client.developers.apiKeys.<a href="./src/resources/developers/api-keys.ts">delete</a>(keyID) -> void</code>
- <code title="post /v1/developers/api-keys/{keyId}/rotate">client.developers.apiKeys.<a href="./src/resources/developers/api-keys.ts">rotate</a>(keyID) -> void</code>
