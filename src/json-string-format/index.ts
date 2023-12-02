/**
 * 将 socket 发送过来的消息转成 object
 * @param {string} msg 发送过来的消息
 */
const jsonStringFormat = (msg: string) => {
  if (/^\{.*\}$/.test(msg)) {
    try {
      return JSON.parse(msg);
    } catch (e) {
      return null;
    }
  }
  return null;
};

export default jsonStringFormat;
