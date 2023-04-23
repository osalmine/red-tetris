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
  const filteredArrayToInsert =
    // eslint-disable-next-line no-undefined
    ignoreInInsertArray !== undefined
      ? arrayToInsert.filter((item) => item !== ignoreInInsertArray)
      : arrayToInsert;

  targetArray.splice(start, 0, ...filteredArrayToInsert);
  return targetArray;
};
