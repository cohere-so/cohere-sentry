# cohere-sentry

The Cohere Sentry integration creates a link from the Sentry error report to the Cohere Replay session.

## Pre-Requisites

For the Cohere Sentry integration to work, you must have the [Sentry browser SDK package](https://www.npmjs.com/package/@sentry/browser) and the [Cohere JS package, version 1.0.19 or greater](https://www.npmjs.com/package/cohere-js/).

### On-Premise Installations

If you are using on-premise Sentry (not sentry.io), then you must have Sentry version 10+.

## Installation

With npm:

```
npm install --save cohere-sentry
```

With yarn:
`

```
yarn add cohere-sentry
```

## Setup

### Code Changes

To set up the integration, both Cohere and Sentry need to be initialized. Please add the following code:

```
import * as Sentry from '@sentry/browser';
import Cohere from 'cohere-js';
import CohereSentry from 'cohere-sentry';

Cohere.init('INSERT_COHERE_API_KEY_HERE');

Sentry.init({
  dsn: 'INSERT_SENTRY_DSN_HERE',
  integrations: [ new CohereSentry(), ],
  // ...
});
```

### Sentry Settings Change

In order for this integration to work properly, you need to whitelist the `cohereSessionUrl` field in your Sentry settings. If you don't, the Cohere URL might be scrubbed because the session ID matches a credit card regex. To do this change, go to `Settings` -> `Security & Privacy` and add `cohereSessionUrl` to the `Global Safe Fields` entry.

## How it works

In Sentry, you should see additional context of your error that has the `cohereSessionUrl` below the breadcrumbs and other information:

![Sentry](https://i.imgur.com/bv66rdP.png)
