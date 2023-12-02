import { isArray, isString, isFunction } from '../types/index';
import { TMapToTreeConfig, TMapTreeItem } from './index.d';

const defaultConfig = {
  id: 'id',
  pid: 'pid',
  labelKey: 'name',
  valueKey: 'value',
  rootid: '',
  deep: 0,
  parentLabel: '',
  parentValue: '',
  symbolOfLabel: ',',
  symbolOfValue: ',',
};

/**
 * 将一维数组转换为带有children字段的树结构
 * @param {array} array 具有树结构关系的一维数组
 * @param {object} config 配置
 * @member {string} config.id 节点关系 id 字段名称
 * @member {string} config.pid 关联父节点的 pid 字段名称
 * @member {string|array} config.rootid 根节点的 pid 字段判断值
 * @member {string} config.labelKey 节点 标签 字段名称
 * @member {string} config.valueKey 节点 数据值 字段名称
 * @member {string} config.deep 当前节点的深度值
 * @member {string} config.parentLabel 根节点初始 label
 * @member {string} config.parentValue 根节点初始 value
 * @member {string} config.symbolOfLabel label 连接符
 * @member {string} config.symbolOfValue value 连接符
 * @member {string} config.sort  排序方法
 * @member {function} config.transform 转换函数，可以借助此方法修改任意节点数据 (item) => item
 */
function mapToTree(array: [], config: TMapToTreeConfig): TMapTreeItem[] {
  const {
    id,
    pid,
    rootid,
    labelKey,
    valueKey,
    deep,
    parentLabel,
    parentValue,
    symbolOfLabel,
    symbolOfValue,
    transform,
    sort,
  } = Object.assign({}, defaultConfig, config);

  const filterFn = isArray(rootid)
    ? (item: TMapTreeItem) => rootid.includes(item[pid] as string)
    : (item: TMapTreeItem) => item[pid] == rootid;

  if (isFunction(sort)) array.sort(sort);

  return array.filter(filterFn).map((item) => {
    let pathLabel: string = item[labelKey];
    let pathValue: string = item[valueKey];

    if (isString(parentLabel)) {
      pathLabel =
        parentLabel === ''
          ? pathLabel
          : parentLabel + symbolOfLabel + pathLabel;
    }

    if (isString(parentValue)) {
      pathValue =
        parentValue === ''
          ? pathValue
          : parentValue + symbolOfValue + pathValue;
    }

    const children = mapToTree(array, {
      ...config,
      rootid: item[id],
      deep: deep + 1,
      parentLabel: parentLabel !== void 0 ? pathLabel : parentLabel,
      parentValue: parentValue !== void 0 ? pathValue : parentValue,
    });

    const node = Object.assign(
      item,
      children.length > 0
        ? {
            deep,
            pathLabel,
            pathValue,
            children,
          }
        : {
            deep,
            pathLabel,
            pathValue,
          },
    );

    if (isFunction(transform)) return transform(node);
    return node;
  });
}

export default mapToTree;
