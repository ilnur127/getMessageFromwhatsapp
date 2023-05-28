export type IReturn<TYPE> = {
  data: TYPE;
  error: string | null | boolean | Record<string, unknown>;
};
