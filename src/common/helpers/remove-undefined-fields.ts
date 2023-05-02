export const removeUndefinedFields = <T>(options: T): Partial<T> => {
  const partialOfObject = Object.fromEntries<string>(
    Object.entries(options).filter(([, value]) => value !== undefined),
  );
  return partialOfObject as Partial<T>;
};
