import React from "react";
import { Pie } from "react-chartjs-2";

const StorageChart = ({ data, free }) => {
  const config = {
    data: (canvas) => {
      //console.log(data)
      return {
        labels: ["Used", "Free"],
        datasets: [
          {
            labels: "Used",
            backgroundColor: ["grey", "blue"],
            data: [data.total - free, free],
            borderWidth: "0",
          },
        ],
      };
    },
    options: {
      legend: {
        labels: {
          fontColor: "grey",
        },
      },
      segmentShowStroke: false,
      elements: {
        arc: {
          borderWidth: 0,
        },
        line: {
          borderWidth: 0,
        },
      },
    },
  };

  return (
    <div>
      <Pie data={config.data} options={config.options} />
    </div>
  );
};
export default StorageChart;
