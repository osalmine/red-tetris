import * as outgoingEvents from './outgoingEvents';

describe('outgoingEvents', () => {
  it('matches UPDATE to be serverUpdateState', () => {
    expect(outgoingEvents.UPDATE).toBe('serverUpdateState');
  });
  it('matches ERROR to be serverError', () => {
    expect(outgoingEvents.ERROR).toBe('serverError');
  });
  it('matches RESET to be serverResetGame', () => {
    expect(outgoingEvents.RESET).toBe('serverResetGame');
  });
});
