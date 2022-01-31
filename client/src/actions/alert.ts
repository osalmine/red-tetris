import { AlertAction } from './types';

export const ALERT_POP = 'ALERT_POP';

export const alert = (message: string): AlertAction => ({
  type: ALERT_POP,
  message,
});

