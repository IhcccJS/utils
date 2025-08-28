import { defineConfig } from 'dumi';

const BASE_PATH = '/ihccc-utils';

export default defineConfig({
  define: {
    BASE_PATH,
  },
  outputPath: 'dist',
  hash: true,
  base: `${BASE_PATH}`, // 根路径
  publicPath: `${BASE_PATH}/`, // 静态文件路径
  resolve: {
    atomDirs: [{ type: 'util', dir: 'src' }],
  },
  favicons: [`${BASE_PATH}/logo.png`],
  themeConfig: {
    name: '@ihccc/utils',
    title: '@ihccc/utils',
    logo: `${BASE_PATH}/logo.png`,
  },
  styles: [`${BASE_PATH}/reset.css`],
  mfsu: false,
});
