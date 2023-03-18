import * as incomingEvents from './incomingEvents';

describe('incomingEvents', () => {
  it('matches JOIN to be joinRoom', () => {
    expect(incomingEvents.JOIN).toBe('joinRoom');
  });
  it('matches START to be startGame', () => {
    expect(incomingEvents.START).toBe('startGame');
  });
  it('matches UPDATE to be clientUpdateState', () => {
    expect(incomingEvents.UPDATE).toBe('clientUpdateState');
  });
  it('matches END to be clientEndGame', () => {
    expect(incomingEvents.END).toBe('clientEndGame');
  });
  it('matches RESET to be resetGame', () => {
    expect(incomingEvents.RESET).toBe('resetGame');
  });
  it('matches BLOCK to be blockOpponentRows', () => {
    expect(incomingEvents.BLOCK).toBe('blockOpponentRows');
  });
});
