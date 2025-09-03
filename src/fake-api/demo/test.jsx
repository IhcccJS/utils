import React from 'react';
import { FakeApi, random } from '@ihccc/utils';

const initData = [
  { id: 'id-developer', name: '开发者', key: 'developer', enable: 1, remark: '开发者' },
  { id: 'id-admin', name: '管理员', key: 'admin', enable: 1, remark: '系统管理员' },
  { id: 'id-user', name: '普通用户', key: 'user', enable: 0, remark: '系统用户' },
  { id: 'id-guest', name: '访客', key: 'guest', enable: 1, remark: '访客' },
];

const roleList = new FakeApi(initData, {
  queryType: {
    id: 'is',
    key: 'like',
    name: 'like',
    enable: 'is',
  },
  sort: () => 0,
});

const nameArray = [
  '赵钱孙李周吴郑王张刘陈朱姜崔谭',
  '娟燕丽玉玲盼珠英颖盈莹梦莉雨语婷翠茹萍晴蕾馨娜美舒',
  '雷博伟强克国浩宇文星鑫鹏阳洋山海柯志龙杰旭磊树刚飞',
];

const PRESET_USERS = [
  { username: 'developer', enable: '1', roleKey: 'developer' },
  { username: 'admin', enable: '1', roleKey: 'admin' },
  { username: 'user', enable: '1', roleKey: 'user' },
  { username: 'guest', enable: '1', roleKey: 'guest' },
].map((item) => ({ ...item, roles: roleList.getItem({ key: item.roleKey }) }));

const initDataUser = Array.from({ length: random(100, 200) }).map((_, i) => {
  const sex = random(['0', '1']);
  const name = Array(random(11) < 8 ? 3 : 2)
    .fill()
    .map((_, i) => random(nameArray[i === 0 ? 0 : +sex + 1].split('')))
    .join('');
  const role = roleList.pick();
  return {
    // avatar: fileList.pick({ name: 'avatar' }),
    // cover: fileList.pick({ name: 'cover' }),
    name: name,
    username: i === 0 ? 'admin' : `user-${i}`,
    password: '123456',
    passwordLevel: 0,
    phone: random(12000000000, 19999999999).toString(),
    email: null,
    wechat: null,
    sex,
    // roles: roleList
    //   .getList({ enable: '1' })
    //   .sort(() => 0.5 - Math.random())
    //   .slice(0, random(1, 4)),
    roles: role,
    roleKey: role.key,
    enable: i === 0 ? '1' : random(['0', '1']),
    ...(PRESET_USERS[i] || {}),
  };
});

export const userList = new FakeApi(initDataUser, {
  queryType: {
    id: 'is',
    name: 'like',
    username: 'like',
    phone: 'like',
    sex: 'is',
    roleKey: 'is',
    enable: 'is',
  },
  sort: () => 0,
});

window.roleList = roleList;
window.userList = userList;

console.log(userList);

function Demo() {
  return <div>控制台调试中...</div>;
}

export default Demo;
