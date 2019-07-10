import svelte from 'rollup-plugin-svelte';
import pkg from './package.json';

const name = pkg.name
  .replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
  .replace(/^\w/, m => m.toUpperCase())
  .replace(/-\w/g, m => m[1].toUpperCase());

export default {
  input: 'src/index.svelte',
  output: [
    {
      format: 'esm',
      file: pkg.module,
    },
    {
      format: 'umd',
      file: pkg.main,
      name,
      globals: {
        svelte: 'svelte',
        'svelte/internal': 'svelteInternal',
        'size-sensor': 'sizeSensor',
      },
    },
  ],
  plugins: [svelte()],
  watch: {
    clearScreen: false,
  },
  external: ['svelte', 'svelte/internal', 'size-sensor'],
};
