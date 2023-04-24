type UrlParams = {
  roomName: string | null;
  playerName: string | null;
};

const hashReg = /(^#[^[\]]+\[[^[\]]+\]$)/;

export const getHashUrl = (hash: string): UrlParams => {
  const test = hashReg.test(hash);

  if (test) {
    const roomName = (/([^[#\]]+)/.exec(hash) as RegExpExecArray)[0];
    const playerName = (/\[+(.*)\]/.exec(hash) as RegExpExecArray)[1];
    return { roomName, playerName };
  }
  return { roomName: null, playerName: null };
};
