export const spliceArraytoArray = <T>({
  start,
  targetArray,
  arrayToInsert,
  ignoreInSplice,
}: {
  start: number;
  targetArray: T[];
  arrayToInsert: T[];
  ignoreInSplice?: T;
}) => {
  const insertLength = arrayToInsert.length;

  for (let i = start; i < start + insertLength; i++) {
    if (arrayToInsert[i - start] !== ignoreInSplice) {
      targetArray[i] = arrayToInsert[i - start];
    }
  }
  return targetArray;
};
