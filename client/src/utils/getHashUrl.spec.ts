import { getHashUrl } from './getHashUrl';

describe('getHashUrl', () => {
  it('should return roomName and playerName when input is valid', () => {
    const input = '#roomName[playerName]';
    const expectedOutput = { roomName: 'roomName', playerName: 'playerName' };
    expect(getHashUrl(input)).toEqual(expectedOutput);
  });
  it('should return null for roomName and playerName when input is not valid', () => {
    const input = 'not-valid';
    const expectedOutput = { roomName: null, playerName: null };
    expect(getHashUrl(input)).toEqual(expectedOutput);
  });
  it('should return null for roomName and playerName when input is empty', () => {
    const input = '';
    const expectedOutput = { roomName: null, playerName: null };
    expect(getHashUrl(input)).toEqual(expectedOutput);
  });
  it('should return null for roomName and playerName when input is only a hash', () => {
    const input = '#';
    const expectedOutput = { roomName: null, playerName: null };
    expect(getHashUrl(input)).toEqual(expectedOutput);
  });
  it('should return null for roomName and playerName when input is missing roomName or playerName', () => {
    const input1 = '#roomName[]';
    const input2 = '#[playerName]';
    const expectedOutput = { roomName: null, playerName: null };
    expect(getHashUrl(input1)).toEqual(expectedOutput);
    expect(getHashUrl(input2)).toEqual(expectedOutput);
  });
  it('should return null for roomName and playerName when input has extra brackets', () => {
    const input = '#roomName[playerName][]';
    const expectedOutput = { roomName: null, playerName: null };
    expect(getHashUrl(input)).toEqual(expectedOutput);
  });
});
