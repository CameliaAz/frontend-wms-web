import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

const Chart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const options = {
        xaxis: {
          show: true,
          categories: ['01 Feb', '02 Feb', '03 Feb', '04 Feb', '05 Feb', '06 Feb', '07 Feb'],
          labels: {
            show: true,
            style: {
              fontFamily: "Inter, sans-serif",
              cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400',
            },
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          show: true,
          labels: {
            show: true,
            style: {
              fontFamily: "Inter, sans-serif",
              cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400',
            },
            formatter: function (value) {
              return '$' + value;
            },
          },
        },
        series: [
          {
            name: "SheetMask AQUA",
            data: [150, 141, 145, 152, 135, 125],
            color: "#1A56DB",
          },
          {
            name: "Parfum Victoria",
            data: [43, 13, 65, 12, 42, 73],
            color: "#7E3BF2",
          },
        ],
        chart: {
          type: "area",
          height: "100%",
          width: "100%",
          fontFamily: "Inter, sans-serif",
        },
        tooltip: {
          enabled: true,
        },
        fill: {
          type: "gradient",
          gradient: {
            opacityFrom: 0.55,
            opacityTo: 0,
            gradientToColors: ["#1C64F2"],
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: 6,
        },
        grid: {
          show: false,
        },
      };

      const chart = new ApexCharts(chartRef.current, options);
      chart.render();

      return () => {
        chart.destroy();
      };
    }
  }, []);

  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800">
      <div className="flex justify-between p-4 md:p-6 pb-0 md:pb-0">
        <div>
          <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
            $12,423
          </h5>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">
            Sales this week
          </p>
        </div>
        <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
          23%
          <svg
            className="w-3 h-3 ms-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13V1m0 0L1 5m4-4 4 4"
            />
          </svg>
        </div>
      </div>
      <div id="labels-chart" ref={chartRef} className="px-2.5"></div>
    </div>
  );
};

export default Chart;
