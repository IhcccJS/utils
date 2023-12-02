import { setStorage, getStorage, removeStorage } from '@ihccc/utils';

function Demo() {
  const secret = '123456';

  const set = () => {
    setStorage('data', { message: 'hello world!' }, secret);
  };

  const get = () => {
    const data = getStorage('data', {}, secret);
    console.log('data:', data);
  };

  const remove = () => {
    removeStorage(null, (key) => {
      console.log(key);
      return key === 'data';
    });
  };

  return (
    <div>
      <button onClick={set}>set</button>
      <button onClick={get}>get</button>
      <button onClick={remove}>remove</button>
    </div>
  );
}

export default Demo;
