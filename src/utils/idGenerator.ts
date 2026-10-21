export function createIdGenerator(prefix: string) {
  let count = 0;

  return (): string => {
    count += 1;
    return `${prefix}-${count}`;
  };
}
