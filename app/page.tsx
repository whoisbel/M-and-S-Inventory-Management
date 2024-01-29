"use client"
import Link from "next/link";
import { DisplayID } from "@/components";
import Chart from "chart.js/auto";
import { useState } from "react";

export default function Dashboard() {

  const [sortOption, setSortOption] = useState('grade')

  const sortByGrade = () => {
    setSortOption('grade')
  }

  const sortByArea = () => {
    setSortOption('area')
  }

  (async function() {
    const data = {
      labels: [
        'Red',
        'Blue',
        'Yellow'
      ],
      datasets:[{
        label: "Test",
        data: [300,50,100],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
    };
  
    // Test chart: Only for demonstration
    // PIE CHART
    new Chart(
      document.getElementById('acquisitions') as HTMLCanvasElement,
      {
        type: 'doughnut',
        data: data,
        options: {
          layout: {
            padding:{
              top: 10,
              bottom: 10,
              left: 10,
            }
          },
          aspectRatio:2,
          plugins: {
            legend: {
              display: true,
              labels:{
                color: 'rgb(24, 25, 26)',
                font: {
                  size: 40
                },
                boxWidth: 40,
                boxHeight: 40
              },
              position: "left",
              align: "start"
            },
          },
        }
      }
    );
  })();
  (async function() {
    const data = {
      labels: [
        'Red',
        'Blue',
        'Yellow'
      ],
      datasets:[{
        label: "Test",
        data: [300,50,100],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
    };
    new Chart(
      document.getElementById('line-graph') as HTMLCanvasElement,
      {
        type: 'line',
        data: data,
        options: {
          plugins: {
            legend: {
              display: false,
            },
          },
        }
      }
    );
  })();
  return <div className="w-full h-full flex flex-col">
    <DisplayID/>
    {/* Inventory Summary container */}
    <div className="w-full h-1/2 bg-accent-green rounded-3xl p-7 flex">
      <div className="w-full flex flex-col">
        <h1 className="text-[30px] text-letters-color font-black pb-4">Inventory Summary</h1>
        <div className="w-full h-full pr-4">
          <div className="w-full h-full bg-custom-white rounded-3xl p-4 flex flex-col">
            <div className="w-full h-full text-letters-color flex flex-col p-4">
                {/* TODO: By Grade/Area Regular A/B/C/D KG Pie Chart, Time series chart, and Yearly Chart */}
                <div className="flex w-full justify-evenly">
                  {/* BY GRADE/AREA HERE*/}
                  <button className={sortOption === 'grade' ?  "w-[250px] h-[50px] rounded-xl bg-accent-green flex justify-center items-center": "w-[250px] h-[50px] rounded-xl bg-custom-white border-2 border-opacity-40 flex justify-center items-center"} onClick={sortByGrade}>
                    <h1 className="font-bold text-[20px] text-letters-color">By Grade</h1>
                  </button>
                  <button className={sortOption === 'area' ?  "w-[250px] h-[50px] rounded-xl bg-accent-green flex justify-center items-center":"w-[250px] h-[50px] rounded-xl bg-custom-white border-2 border-opacity-40 flex justify-center items-center"} onClick={sortByArea}>
                    <h1 className="font-bold text-[20px] text-letters-color">By Area</h1>
                  </button>
                </div>
                <div className="w-full h-full pt-[20px]">
                  {/* REGULAR A TO D HERE */}
                  <div className="w-full justify-evenly flex">
                    <div className="rounded-xl flex flex-col w-[250px] h-[100px] bg-red-400 p-4">
                      <h1 className="text-[15px] font-bold text-letters-color">Regular A</h1>
                      <h1 className="text-[35px] font-bold text-letters-color self-center">4000 KG</h1>
                    </div>
                    <div className="rounded-xl flex flex-col w-[250px] h-[100px] bg-blue-400 p-4">
                      <h1 className="text-[15px] font-bold text-letters-color">Regular B</h1>
                      <h1 className="text-[35px] font-bold text-letters-color self-center">4000 KG</h1>
                    </div>
                  </div>
                  <div className="w-full justify-evenly flex pt-[20px]">
                    <div className="rounded-xl flex flex-col w-[250px] h-[100px] bg-red-400 p-4">
                      <h1 className="text-[15px] font-bold text-letters-color">Regular C</h1>
                      <h1 className="text-[35px] font-bold text-letters-color self-center">4000 KG</h1>
                    </div>
                    <div className="rounded-xl flex flex-col w-[250px] h-[100px] bg-blue-400 p-4">
                      <h1 className="text-[15px] font-bold text-letters-color">Regular D</h1>
                      <h1 className="text-[35px] font-bold text-letters-color self-center">4000 KG</h1>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-custom-white w-full h-full rounded-3xl text-letters-color">
        {/* Pie Chart HERE */}
        <div className="w-full h-full flex justify-center items-center">
          <canvas id="acquisitions"></canvas>
        </div>
      </div>
    </div>
    {/* Seasonal and Yearly chart container */}
    <div className="w-full h-1/2 flex">
      {/* Seasonal chart container */}
      <div className="w-full h-full rounded-3xl pr-4 pt-4">
        <div className="w-full h-full rounded-3xl bg-custom-white p-7">
          <h1 className="font-bold text-letters-color text-[30px]">Seasonal Chart</h1>
          <canvas id="line-graph" className="mt-4"></canvas>
        </div>
      </div>
      {/* Yearly chart container */}
      <div className="w-full h-full rounded-3xl pt-4">
        <div className="w-full h-full rounded-3xl bg-custom-white"></div>
      </div>
    </div>
  </div>;
}
