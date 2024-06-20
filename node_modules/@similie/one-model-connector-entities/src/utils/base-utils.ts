// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getId(query: number | any | undefined | null): number | null {
  if (query === 'undefined' || query === 'null') {
    return null;
  }

  return query && typeof query === 'object'
    ? query.id
      ? query.id
      : null
    : query;
}
