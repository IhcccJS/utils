import { defineConfig } from 'father';

export default defineConfig({
  // more father config: https://github.com/umijs/father/blob/master/docs/config.md
  esm: { output: 'es', ignores: ['src/**/demo/**/*', 'src/components/**'] },
  cjs: { output: 'lib', ignores: ['src/**/demo/**/*', 'src/components/**'] },
  umd: { name: 'wtools', output: 'dist' },
});
