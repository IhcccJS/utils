/**
 * 复制内容到剪切板，并返回是否成功
 * @param text 待拷贝的内容
 * TODO: 使用依赖库实现
 */
const copyText = (text: string): boolean => {
  if (window?.navigator?.clipboard?.writeText) {
    window?.navigator?.clipboard?.writeText(text);
    return true;
  } else if (document.hasOwnProperty('execCommand')) {
    const el = document.createElement('textarea');
    el.value = text;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    return true;
  }
  return false;
};

export default copyText;
