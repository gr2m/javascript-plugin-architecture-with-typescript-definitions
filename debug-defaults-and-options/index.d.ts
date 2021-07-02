type Optional<T extends object, K extends string | number | symbol> = Omit<
  T,
  K
> &
  Partial<Pick<T, keyof T & K>>;

type Options = {
  requiredOption: string;
  optionalOption?: string;
};

/**
 * If the `defaults` parameter includes all required options, the `options`
 * parameter is not required
 */
export function testWithDefaults<
  TDefaults extends Options & Record<string, unknown>
>(defaults: TDefaults): TDefaults;

/**
 * All properties set in `defaults` do not need to be defined in `options`.
 * Together they must set all required options
 */
export function testWithDefaults<
  TDefaults extends Partial<Options>,
  TOptions extends Optional<Options, keyof TDefaults> & Record<string, unknown>
>(defaults: TDefaults, options: TOptions): TDefaults & TOptions;
