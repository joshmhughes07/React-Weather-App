import { useRef,useEffect } from "react";
import "./styling/ExtendedForecastStyling.css"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import { Bar } from "react-chartjs-2";


const ExtendedForecast = ({ data }) => {

  const heading = useRef(null);
// const tempCanvasEl = useRef(null);
//   const precipCanvasEl = useRef(null);
//   const rainCanvasEl = useRef(null);
//   const chartIns1 = useRef(null);
//   const chartIns2 = useRef(null);
//   const chartIns3 = useRef(null);
//   const heading = useRef(null);

//   useEffect(() => {
//     let currHeading = heading.current;
//     let canvas1 = tempCanvasEl.current;
//     let canvas2 = precipCanvasEl.current;
//     let canvas3 = rainCanvasEl.current;

//     if (chartIns1.current) {
//       chartIns1.current.destroy();
//     }
//     if (chartIns2.current) {
//       chartIns2.current.destroy();
//     }
//     if (chartIns3.current) {
//       chartIns3.current.destroy();
//     }
//     chartIns1.current = new Chart(canvas1, {
//       type: "bar",
//       data: {
//         labels: data.map((entry) => entry.time),
//         datasets: [
//           {
//             label: "Temperature",
//             data: data.map((entry) => entry.temp),
//             backgroundColor: "#f55a0090"
//           }
//         ]
//       },
//       options: {
//         scales: {
//           y: {
//             ticks: {
//               callback: function (value) {
//                 return value + data[0].tempUnit;
//               }
//             }
//           }
//         },
//         maintainAspectRatio: false,
//         responsive: true
//       }
//     });
//     chartIns2.current = new Chart(canvas2, {
//       type: "bar",
//       data: {
//         labels: data.map((entry) => entry.time),
//         datasets: [
//           {
//             label: "Precipitation",
//             data: data.map((entry) => entry.precipProb),
//             backgroundColor: "#079beb90",
//             yAxisID: "yPrecip"
//           },
//           {
//             label: "Chance Of Rain",
//             data: data.map((entry) => entry.rain),
//             backgroundColor: "#0010ed90"
//           },
//           {
//             label: "Showers",
//             data: data.map((entry) => entry.showers),
//             backgroundColor: "#8e8f9190",
//             yAxisID: "yShowers"
//           }
//         ]
//       },
//       options: {
//         scales: {
//           yPrecip: {
//             ticks: {
//               callback: function (value) {
//                 return value + data[0].precipUnit;
//               }
//             }
//           },
//           yShowers: {
//             ticks: {
//               callback: function (value) {
//                 return value + data[0].showerUnit;
//               }
//             }
//           }
//         },
//         maintainAspectRatio: false
//       }
//     });
//     chartIns3.current = new Chart(canvas3, {
//       type: "line",
//       data: {
//         labels: data.map((entry) => entry.time),
//         datasets: [
//           {
//             label: "Wind Speed",
//             data: data.map((entry) => entry.wind),
//             backgroundColor: "#079beb90"
//           }
//         ]
//       },
//       options: {
//         scales: {
//           y: {
//             ticks: {
//               callback: function (value) {
//                 return value + data[0].windUnit;
//               }
//             }
//           }
//         },
//         maintainAspectRatio: false
//       }
//     });
//     currHeading.textContent = `Detailed Forecast for ${data[0].date}`;
//     return () => {
//       if (chartIns1.current) {
//         chartIns1.current.destroy();
//       }
//       if (chartIns2.current) {
//         chartIns2.current.destroy();
//       }
//       if (chartIns3.current) {
//         chartIns3.current.destroy();
//       }
//     };
//   }, [data]);


    useEffect(()=>{
        let currHeading = heading.current;
        currHeading.textContent = `Detailed Forecast for ${data[0].date}`;
      
    },[data])



  return (
    // <div className="extendedForecastParentDiv Background">
    //   <h3 ref={heading}>Detailed Forecast</h3>
    //   <div className="graphCanvasDiv Background">
    //     <canvas id="TempCanvas" className="canvasEl" ref={tempCanvasEl}></canvas>
    //   </div>
    //   <div className="graphCanvasDiv Background">
    //     <canvas id="PrecipProbCanvas" className="canvasEl" ref={precipCanvasEl}></canvas>
    //   </div>
    //   <div className="graphCanvasDiv Background">
    //     <canvas id="RainCanvas" className="canvasEl" ref={rainCanvasEl}></canvas>
    //   </div>
    // </div>
    <div className="extendedForecastParentDiv Background">
       <h3 ref={heading}>Detailed Forecast</h3>
      <div className="graphCanvasDiv Background">
        <Bar className="canvasEl " options={{
        scales: {
          y: {
            ticks: {
              callback: function (value) {
                return value + data[0].tempUnit;
              }
            }
          }
        },
        maintainAspectRatio: false,
        responsive: true
      }} data={{
        labels: data.map((entry) => entry.time),
        datasets: [
          {
            label: "Temperature",
            data: data.map((entry) => entry.temp),
            backgroundColor: "#f55a0090"
          }
        ]
      }}></Bar>
        </div>
        <div className="graphCanvasDiv Background">
        <Bar className="canvasEl " options={{
        scales: {
          yPrecip: {
            ticks: {
              callback: function (value) {
                return value + data[0].precipUnit;
              }
            }
          },
          yShowers: {
            ticks: {
              callback: function (value) {
                return value + data[0].showerUnit;
              }
            }
          }
        },
        maintainAspectRatio: false
      }} data={{
        labels: data.map((entry) => entry.time),
        datasets: [
          {
            label: "Precipitation",
            data: data.map((entry) => entry.precipProb),
            backgroundColor: "#079beb90",
            yAxisID: "yPrecip"
          },
          {
            label: "Chance Of Rain",
            data: data.map((entry) => entry.rain),
            backgroundColor: "#0010ed90"
          },
          {
            label: "Showers",
            data: data.map((entry) => entry.showers),
            backgroundColor: "#8e8f9190",
            yAxisID: "yShowers"
          }
        ]
      }}></Bar>
        </div>
        <div className="graphCanvasDiv Background">
        <Bar className="canvasEl " options={{
        scales: {
          y: {
            ticks: {
              callback: function (value) {
                return value + data[0].windUnit;
              }
            }
          }
        },
        maintainAspectRatio: false
      }} data={{
        labels: data.map((entry) => entry.time),
        datasets: [
          {
            label: "Wind Speed",
            data: data.map((entry) => entry.wind),
            backgroundColor: "#079beb90"
          }
        ]
      }}></Bar>
        </div>
      </div>
  );
}

export { ExtendedForecast }


