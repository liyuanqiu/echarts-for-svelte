<script>
  import { onMount } from "svelte";
  import echartsFull from "echarts";
  import echartsCore from "echarts/lib/echarts";
  import ECharts from "echarts-for-svelte";
  import produce from "immer";

  let style = "height: 500px;";
  function changeStyle() {
    style = "height: 600px;";
  }

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
        data: [1, 2, 3, 4, 5, 6, 7],
        type: "line"
      },
      {
        data: [1, 2, 3, 4, 5, 6, 7],
        type: "bar"
      }
    ],
    animation: false
  };

  function changeOption() {
    option = produce(option, draft => {
      draft.series[0].data = [7, 6, 5, 4, 3, 2, 1];
    });
  }

  let echarts = echartsFull;
  function changeEcharts() {
    echarts = echartsCore;
  }

  let className = "full-width";
  function changeClassName() {
    className = "half-width";
  }

  function removeBar() {
    option = produce(option, draft => {
      delete draft.series[1];
    });
  }

  let notMerge = false;
  function changeNotMerge() {
    notMerge = true;
  }
</script>

<ECharts {echarts} {option} {style} {className} {notMerge} />
<div>
  <button on:click={changeStyle}>change style</button>
  <button on:click={changeOption}>change option</button>
  <button on:click={changeEcharts}>change ECharts</button>
  <button on:click={changeClassName}>change className</button>
  <button on:click={removeBar}>remove bar(merge)</button>
  <button on:click={changeNotMerge}>changeNotMerge</button>
</div>
