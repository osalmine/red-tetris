export const spliceArrayToArray = <T>({
  start,
  targetArray,
  arrayToInsert,
  ignoreInInsertArray,
}: {
  start: number;
  targetArray: T[];
  arrayToInsert: T[];
  ignoreInInsertArray?: T;
}) => {
  const insertLength = arrayToInsert.length;

  for (let i = start; i < start + insertLength; i++) {
    if (arrayToInsert[i - start] !== ignoreInInsertArray) {
      targetArray[i] = arrayToInsert[i - start];
    }
  }
  return targetArray;
};
