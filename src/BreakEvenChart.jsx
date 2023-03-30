import { Chart } from "react-google-charts";
function calculateBreakEvenPoint(salesPrice, variableCosts, fixedCosts) {
  return fixedCosts / (salesPrice - variableCosts);
}
export default function BreakEvenChart(props) {
  const BEP = calculateBreakEvenPoint(
    props.salesPrice,
    props.variableCosts,
    props.fixedCosts
  );
  const SCALE = 2; //how many times the BEP units you want to show after BEP
  let data = [
    [
      "X",
      "MASK",
      "Loss Area",
      "Profit Area",
      "Total Costs",
      "Revenues",
      { type: "string", role: "style" },
    ],
    [0, props.fixedCosts, -props.fixedCosts, null, props.fixedCosts, 0, null], //assuming that before bep you are in loss and so revenues function is always starting from 0
    [
      BEP,
      props.variableCosts * BEP + props.fixedCosts,
      props.salesPrice * BEP - (props.variableCosts * BEP + props.fixedCosts),
      props.salesPrice * BEP - (props.variableCosts * BEP + props.fixedCosts),
      props.variableCosts * BEP + props.fixedCosts,
      props.salesPrice * BEP,
      "point { size: 8; shape-type: diamond; fill-color: #0ff; visible: true }",
    ], //BREAK EVEN POINT
    [
      BEP * SCALE,

      props.variableCosts * BEP * SCALE + props.fixedCosts,
      null,
      props.salesPrice * BEP * SCALE -
        (props.variableCosts * BEP * SCALE + props.fixedCosts),
      props.variableCosts * BEP * SCALE + props.fixedCosts,
      props.salesPrice * BEP * SCALE,
      null,
    ],
  ];
  const options = {
    title: "Break Even Chart",
    curveType: "function",
    legend: { position: "right" },
    hAxis: { title: "Units Sold" },
    vAxis: { title: "Costs-Revenues" },
    enableInteractivity: false,
    //explorer: {}, //TODO prevent negative quadrants
    isStacked: true,
    series: {
      0: {
        type: "area",
        color: "transparent",
        visibleInLegend: false,
      },
      1: {
        type: "area",
        color: "red",
      },
      2: {
        type: "area",
        color: "green",
      },
      3: {
        type: "line",
        color: "orange",
      },
      4: {
        type: "line",
        color: "blue",
      },
    },
  };

  return (
    <Chart
      chartType="ComboChart"
      data={data}
      width={props.width}
      height={props.height}
      options={options} //TODO add style capabilities
    />
  );
}
