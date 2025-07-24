export const getErrorMessage = (err: unknown, fallback = 'Something went wrong'): string => {
  return err instanceof Error ? err.message : fallback;
};
