import { useRef,useEffect,useContext } from "react";
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
import { ThemeContext } from "./Context";


const ExtendedForecast = ({ data }) => {
  const Theme = useContext(ThemeContext)
  const heading = useRef(null);
  

    useEffect(()=>{
        let currHeading = heading.current;
        currHeading.textContent = `Detailed Forecast for ${data[0].date}`;
      
    },[data])



  return (
    <div className={`extendedForecastParentDiv ${Theme}`}>
       <h3 ref={heading}>Detailed Forecast</h3>
      <div className={`graphCanvasDiv Background`}>
        <Bar className="canvasEl " options={{
        scales: {
          y: {
            ticks: {
              callback: function (value) {
                return value + data[0].tempUnit;
              },

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
        <div className={`graphCanvasDiv Background`}>
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
        <div className={`graphCanvasDiv Background`}>
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


