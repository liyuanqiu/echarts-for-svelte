<script>
  import { onMount, onDestroy } from 'svelte';
  import { bind, clear } from 'size-sensor';

  // echarts lib
  export let echarts;
  // the echarts option config, can see http://echarts.baidu.com/option.html#title.
  export let option;
  // the class of echarts div. you can setting the css style of charts by class name.
  export let className = '';
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
  export let events = {};
  // the opts of echarts. object, will be used when initial echarts instance by echarts.init
  export let opts = {};

  $: rootClassName = ['root', className].join(' ');

  let rootElement;
  let instance;

  onMount(() => {
    instance = echarts.init(rootElement, theme, opts);
    instance.setOption(option, notMerge, lazyUpdate);
    if (loading) {
      instance.showLoading(loadingOption);
    }
    Object.entries(events).forEach(([name, cb]) => {
      instance.on(name, cb);
    });
    onChartReady();
    bind(rootElement, () => instance.resize());
  });

  onDestroy(() => {
    clear(rootElement);
    instance.dispose(rootElement);
  });
</script>

<style>
  .root {
    height: 300px;
  }
</style>

<div bind:this={rootElement} class={rootClassName} />
