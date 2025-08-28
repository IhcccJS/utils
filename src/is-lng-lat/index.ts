const isLocation = (loc: string) => /^(\d+?\.?\d{0,})$/g.test(loc);

/**
 * 判断一个点是不是正确的经纬度坐标
 * @param {object} point 点位数据
 * @returns
 */
const isLngLat = (point: any) => {
  if (!point) return false;
  return isLocation(point.lng) && isLocation(point.lat);
};

export default isLngLat;
