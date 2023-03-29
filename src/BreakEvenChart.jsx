import { Chart } from "react-google-charts";

export default function BreakEvenChart(props) {
  options = {
    title: "Break Even Chart",
    curveType: "function",
    legend: { position: "bottom" },
    hAxis: { gridlines: { count: 5 } },
    enableInteractivity: false,
    explorer: {},
  };
  data = {};
  return (
    <Chart
      chartType="LineChart"
      data={data}
      width={props.width}
      height={props.height}
      options={props.options ?? options}
    />
  );
}
