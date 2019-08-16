<script>
  import { onDestroy } from 'svelte';
  import { bind, clear } from 'size-sensor';

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

  $: rootClassName = ['root', className].join(' ');

  let rootElement;
  let instance;
  let prevEvents = {};

  function dispose() {
    if (Boolean(instance) && !isDisposed()) {
      clear(rootElement);
      instance.dispose(rootElement);
    }
  }

  // instance.isDisposed() always return undefined, maybe a bug
  function isDisposed() {
    return !Boolean(echarts.getInstanceByDom(rootElement));
  }

  $: if (rootElement) {
    // console.log('(re)create instance');
    dispose();
    instance = echarts.init(rootElement, theme, opts);
  }

  $: if (Boolean(instance) && !isDisposed()) {
    // console.log('update option / notMerge / lazyUpdate');
    instance.setOption(option, notMerge, lazyUpdate);
  }

  $: if (Boolean(instance) && !isDisposed()) {
    // console.log('update loading / loadingOption');
    if (loading) {
      instance.showLoading(loadingOption);
    } else {
      instance.hideLoading();
    }
  }

  $: {
    if (Boolean(instance) && !isDisposed()) {
      // console.log('bind events');
      Object.entries(prevEvents).forEach(([name, cb]) => {
        instance.off(name, cb);
      });
      Object.entries(events).forEach(([name, cb]) => {
        instance.on(name, cb);
      });
      prevEvents = events;
    }
  }

  $: if (Boolean(instance) && !isDisposed()) {
    // console.log('chart ready / bind resize');
    onChartReady();
    bind(rootElement, () => instance.resize());
  }

  $: {
    if (Boolean(instance) && !isDisposed()) {
      // console.log('resize');
      instance.resize();
    }
    [style, className];
  }

  onDestroy(dispose);
</script>

<style>
  .root {
    height: 300px;
  }
</style>

<div bind:this={rootElement} class={rootClassName} {style} />
