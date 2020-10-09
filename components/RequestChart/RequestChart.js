import React from "react";
import { Bar, Doughnut } from "react-chartjs-2";

const RequestChart = ({ data }) => {
 
  const config = {
    data: (canvas) => {
      //console.log(data)
      return {
        labels: (data||[]).map((item) => {
          return new Date(parseInt(item.time)).toLocaleTimeString();
        }),
        datasets: [
          {
            label: "1xx",
            backgroundColor: "#ff3c7b",
            data: data?.map((item) => item.num_1xx[1]),
            borderWidth: "1",
            order:1,
            yAxesID :"bar-ax",
          },
          {
            label: "2xx",
            backgroundColor: "#4e8bf0",
            data: data?.map((item) => item.num_2xx[1]),
            borderWidth: "1",
            order:1,
            yAxesID :"bar-ax",
            borderRadius :"0"
          },
          {
            label: "3xx",
            backgroundColor: "#fade3e",
            data: data?.map((item) => item.num_3xx[1]),
            borderWidth: "1",
            order:1,
            yAxesID :"bar-ax"
          },
          {
            label: "4xx",
            backgroundColor: "#35c4c3",
            data: data?.map((item) => item.num_4xx[1]),
            borderWidth: "1",
            order:1,
            yAxesID :"bar-ax"
          },
          {
            label: "5xx",
            backgroundColor: "#e7e8ed",
            data: data?.map((item) => item.num_5xx[1]),
            borderWidth: "1",
            order:1,
            yAxesID :"bar-ax"
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
      scales: {
        xAxes: [{
            stacked: true
        }],
        yAxes: [{
          type: 'linear',
          display: true,
          position: 'left',
          id: 'bar-ax',
          gridLines: {
            display: false
          },
          labels: {
            show: true
          },
            stacked: true}]
    },
    },
  };
  return (
    <Bar  options={config.options} data={config.data} />
  );
};
export default RequestChart;
