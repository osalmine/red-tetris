export const ALERT_POP = 'ALERT_POP'

export const alert = (message: string) => ({
  type: ALERT_POP,
  message,
})

