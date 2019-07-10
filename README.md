# echarts-for-svelte

A very simple echarts(v3.0 & v4.0) wrapper for [svelte](https://svelte.dev).

Inspired by [echarts-for-react](https://github.com/hustcc/echarts-for-react)

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

# Installation

```bash
yarn add echarts-for-svelte

# or

npm install --save echarts-for-svelte
```

# Basic Example

```html
<!-- App.svelte -->
<script>
  import echarts from "echarts";
  import ECharts from "echarts-for-svelte";

  let option = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "line"
      }
    ]
  };
</script>

<ECharts {echarts} {option} />
```

# API Reference

```javascript
import ECharts from "echarts-for-svelte";
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
export let className = "";

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
