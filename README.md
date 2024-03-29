> `echarts-for-svelte` was suspended for a long time, because `Svelte` doesn't support `Typescript`. I planned to relaunch the development process right after `Typescript` is supported.

# IMPORTANT
`echarts-for-svelte@0.1.11` doesn't support `svelte>3.15.0`, because it seems like `svelte@3.16.0` introduced some breaking changes(didn't make effort to locate them). So at this moment, please do not use `echarts-for-svelte@0.1.11` with `svelte>3.15.0`. I'll fix this issue when `svelte` begins to support `Typescript`.

# echarts-for-svelte

A very simple echarts(v3.0 & v4.0) wrapper for [svelte](https://svelte.dev).

Inspired by [echarts-for-react](https://github.com/hustcc/echarts-for-react)

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![minified + gzip](https://badgen.net/bundlephobia/minzip/echarts-for-svelte)](https://bundlephobia.com/result?p=echarts-for-svelte)

<div>
  <img height="40" src="https://liyuanqiu.github.io/github-readme-assets/echarts-logo-dark.png">
  <img height="40" src="https://liyuanqiu.github.io/github-readme-assets/svelte-logo.svg">
</div>

# Installation

```bash
yarn add echarts-for-svelte
# or
npm install --save echarts-for-svelte
```

# Basic Example
👉 Try `echarts-for-svelte` in [CodeSandbox](https://codesandbox.io/s/nice-brattain-o5mik)
```html
<!-- App.svelte -->
<script>
  import echarts from 'echarts';
  import ECharts from 'echarts-for-svelte';

  let option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
      },
    ],
  };
</script>

<ECharts {echarts} {option} />
```
![echarts](https://liyuanqiu.github.io/github-readme-assets/echarts.png)

# API Reference

```javascript
import ECharts from 'echarts-for-svelte';
```

## Component Props

```javascript
// echarts lib
// import echarts from 'echarts';
// or import echarts from 'echarts/lib/echarts';
export let echarts;

// the echarts option config, can see http://echarts.baidu.com/option.html#title.
export let option;

// the class of echarts div. you can setting the css style of charts by class name.
export let className = '';

// the style of echarts div.
export let style = '';

// when setOption, not merge the data, default is false.
// See http://echarts.baidu.com/api.html#echartsInstance.setOption.
export let notMerge = false;

// when setOption, lazy update the data, default is false.
// See http://echarts.baidu.com/api.html#echartsInstance.setOption.
export let lazyUpdate = false;

// the theme of echarts. string, should registerTheme before use it
// (theme object format: https://github.com/ecomfe/echarts/blob/master/theme/dark.js).
export let theme = null;

// when the chart is ready, will callback the function
export let onChartReady = () => {};

// the echarts loading option config
// See http://echarts.baidu.com/api.html#echartsInstance.showLoading
export let loadingOption = null;

// manually set loading status
export let loading = false;

// binding the echarts event, will callback with the echarts event object as it's paramter.
// {
//   click() {...},
//   legendselectchanged() {...},
// }
export let events = {};

// the opts of echarts. object, will be used when initial echarts instance by echarts.init
export let opts = {};
```
