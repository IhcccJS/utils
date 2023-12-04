import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'dist-utils',
  hash: true,
  base: '/', // 根路径
  publicPath: '/', // 静态文件路径
  resolve: {
    atomDirs: [{ type: 'util', dir: 'src' }],
  },
  favicons: [],
  themeConfig: {
    name: '@ihccc/utils',
    title: '@ihccc/utils',
    logo: '',
  },
  styles: ['section.dumi-default-header-left { width: 300px; }'],
});
