function dataFormat(list: any[]) {
  const queue = [...list];
  return function exec(data: Record<string, any>) {
    if (!data) return data;
    const result = queue.reduce((values, format) => format(values), data);
    return { ...result };
  };
}

export default dataFormat;
