# sentry-cohere

The Sentry-Cohere integration seamlessly integrates the Sentry and Cohere platforms. When you look at a browser error in Sentry, you will see a link to the Cohere session replay at that exact moment in time. When you are watching a Cohere replay and your user experiences an error, you will see a link that will take you to that error in Sentry.

## Pre-Requisites

For the Sentry-Cohere integration to work, you must have the [Sentry browser SDK package](https://www.npmjs.com/package/@sentry/browser) and the [Cohere JS SDK package](https://www.npmjs.com/package/cohere-js/).

### On-Premise Installations

If you are using on-premise Sentry (not sentry.io), then you must have Sentry version 10+.

## Installation

To install the stable version:

with npm:

```
npm install --save sentry-cohere
```

with yarn:

```
yarn add sentry-cohere
```

## Setup

### Code Changes

To set up the integration, both Cohere and Sentry need to be initialized. Please add the following code:

```
import * as Sentry from '@sentry/browser';
import Cohere from 'cohere-js';
import SentryCohere from 'sentry-cohere';

Cohere.init('INSERT_COHERE_API_KEY_HERE');

Sentry.init({
  dsn: '__DSN__',
  integrations: [ new SentryCohere(), ],
  // ...
});
```

### Sentry Settings Change

In order for this integration to work properly, you need to whitelist the `cohereSessionUrl` field in your Sentry settings. If you don't, the Cohere URL might be scrubbed because the session ID matches a credit card regex. To do this change, go to `Settings` -> `Security & Privacy` and add `cohereSessionUrl` to the `Global Safe Fields` entry.

<!---
![Settings](https://i.imgur.com/zk0hShj.png)

## How it works

In Sentry, you should see additional context of your error that has the `cohereSessionUrl` below the breadcrumbs and other information:

![Sentry](https://i.imgur.com/O4r4Wvq.png)
-->
