import * as Sentry from '@sentry/browser';
import { Event } from '@sentry/types';
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
    Cohere.getSessionUrl((sessionUrl) => {
      Sentry.addGlobalEventProcessor(async (event: Event) => {
        const startTime = Math.max(
          0,
          Math.floor((event.timestamp ?? 0) - this.replayStartTime / 1000) - 2
        );

        const self = Sentry.getCurrentHub().getIntegration(SentryCohere);
        // Run the integration ONLY when it was installed on the current Hub
        if (self) {
          event.contexts = {
            ...event.contexts,
            cohere: {
              cohereSessionUrl: `${sessionUrl}?startAt=${startTime}`,
            },
          };
        }
        return event;
      });
    });
  }
}

export default SentryCohere;
