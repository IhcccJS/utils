/**
 * 字符串拼接，过滤掉非值，如果参数是一个，返回一个接收任意多个字符串参数的方法，调用进行拼接；如果大于一个，以默认符号 `-` 进行拼接
 * @param  {...any} args 字符串参数；或拼接字符串的符号，默认 `-`
 * @example
 * 默认符号拼接
 * joinString('a', 'b', '', null, 'd') => 'a-b-d'
 * 自定义拼接符号
 * joinString(',')('a', 'b', '', null, 'd') => 'a,b,d'
 */
function joinString(...args: string[]): string;
function joinString(symbol: string): (...args: string[]) => string;
function joinString(...args: string[]) {
  function joint(array: string[], symbol = '-') {
    return array.filter((s) => !!s).join(symbol);
  }
  if (args.length > 1) return joint(args);
  return (...keys: string[]) => joint(keys, args[0]);
}

export default joinString;
