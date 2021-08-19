import * as Sentry from '@sentry/browser';
import Cohere from 'cohere-js';

/**
 * This integration creates a link from the Sentry Error to the Cohere Replay session.
 * Docs on Sentry SDK integrations are here: https://docs.sentry.io/platforms/javascript/advance-settings/#dealing-with-integrations
 */

class SentryCohere {
  public readonly name: string = SentryCohere.id;
  public static id: string = 'SentryCohere';

  replayStartTime: number;

  constructor() {
    this.replayStartTime = Date.now();
  }

  setupOnce() {
    const sessionUrlListener = (sessionUrl) => {
      Sentry.configureScope((scope) => {
        scope.addEventProcessor((event) => {
          event.contexts = {
            ...event.contexts,
            Cohere: {
              'Cohere Session URL': `${sessionUrl}${
                event.timestamp ? `?ts=${event.timestamp * 1000}` : ''
              }`,
            },
          };
          return event;
        });
      });
    };

    Cohere.addSessionUrlListener(sessionUrlListener);
  }
}

export default SentryCohere;
