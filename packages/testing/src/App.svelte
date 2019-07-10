<script>
  import { onMount } from "svelte";
  import echarts from "echarts";
  import ECharts from "echarts-for-svelte";

  function random() {
    return Math.round(Math.random() * 1000 + 500);
  }

  let data = Array(7)
    .fill(1)
    .map(() => random());

  $: option = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        data,
        type: "line"
      }
    ]
  };

  onMount(() => {
    const id = setInterval(() => {
      const [, ...rest] = data;
      data = [...rest, random()];
    }, 1000);
    return () => clearInterval(id);
  });
</script>

<ECharts {echarts} {option} style="height: 500px;" />
