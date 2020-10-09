import React from "react";
import { Line } from "react-chartjs-2";

const options = {
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  tooltips: {
    backgroundColor: "#f5f5f5",
    titleFontColor: "#333",
    bodyFontColor: "#666",
    bodySpacing: 4,
    xPadding: 12,
    mode: "nearest",
    intersect: 0,
    position: "nearest",
  },
  responsive: true,
  scales: {
    yAxes: [
      {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(29,140,248,0.0)",
          zeroLineColor: "transparent",
        },
        ticks: {
          suggestedMin: 0,
          suggestedMax: 1,
          padding: 20,
          fontColor: "#9a9a9a",
        },
      },
    ],
    xAxes: [
      {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(29,140,248,0.1)",
          zeroLineColor: "transparent",
        },
        ticks: {
          padding: 20,
          fontColor: "#9a9a9a",
        },
      },
    ],
  },
};
let calcSum = (item, type) => {
  let sum = 0;

  for (var i = 0; i < item.length; i++) {
    sum += parseInt(item[i]._type) === type ? parseInt(item[i].size) : 0;
  }
  return sum;
};
const SummaryChart = ({ data }) => {
  //console.log("ec")
  let DataFilter = data.map((item) => {
    return {
      date: new Date(parseInt(item.date)).toLocaleDateString(),
      upload: calcSum(item.data, 0),
      download: calcSum(item.data, 1),
    };
  });
  let chartData = {
    date: DataFilter.map((item) => {
      return item.date;
    }),
    download: DataFilter.map((item) => {
      return item.download;
    }),
    upload: DataFilter.map((item) => {
      return item.upload;
    }),
  };
  let config = {
    data: (canvas) => {
      let ctx = canvas.getContext("2d");

      let gradientStroke1 = ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke1.addColorStop(1, "rgba(29,140,248,0.2)");
      gradientStroke1.addColorStop(0.4, "rgba(29,140,248,0.0)");
      gradientStroke1.addColorStop(0, "rgba(29,140,248,0)"); //blue colors
      let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
      gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
      gradientStroke.addColorStop(0, "rgba(119,52,169,0)");
      return {
        labels: chartData.date,
        datasets: [
          {
            label: "Upload",
            fill: true,
            backgroundColor: gradientStroke1,
            borderColor: "#1f8ef1",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#1f8ef1",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#1f8ef1",
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: chartData.upload,
          },
          {
            label: "Download",
            fill: true,
            backgroundColor: gradientStroke,
            hoverBackgroundColor: gradientStroke,
            borderColor: "#d048b6",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#d048b6",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#d048b6",
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: chartData.download,
          },
        ],
      };
    },
    options: options,
  };
  return (
    <div className="chart-area">
      <Line data={config.data} options={config.options} />
    </div>
  );
};
export default SummaryChart;
