"use client";
import Link from "next/link";
import { Chart, ArcElement } from "chart.js/auto";
import { useEffect, useRef, useState } from "react";
import { Doughnut, Bar, Line } from "react-chartjs-2";
import { plugin } from "postcss";
import { getSession } from "next-auth/react";
import { Pagination, GradePage } from "@/components";
import { generateRandomPastelColor } from "../utils/generatePastelColor";

type dashboardDataType = {
  areaSummary: { totalQuantity: number; name: string }[];
  gradeSummary: { totalQuantity: number; name: string }[];
};

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<dashboardDataType>();
  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
    };
    fetchSession();
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      const response = await fetch("/api/dashboard");
      const data = await response.json();

      setDashboardData(data);
    };
    fetchDashboardData();
  }, []);

  Chart.register(ArcElement);
  const [sortOption, setSortOption] = useState("grade");

  const sortByGrade = () => {
    setSortOption("grade");
  };

  const sortByArea = () => {
    setSortOption("area");
  };
  function generateRandomPastelColors(count: number) {
    const colors = [];
    for (let i = 0; i < count; i++) {
      colors.push(generateRandomPastelColor());
    }
    return colors;
  }
  const [donutColors] = useState(() => generateRandomPastelColors(3));
  const [barColors] = useState(() => generateRandomPastelColors(1));
  const [lineColors] = useState(() => generateRandomPastelColors(1));

  // dataaasss

  const donutData = {
    labels: dashboardData?.gradeSummary.map((grade) => grade.name) || [],
    datasets: [
      {
        label: "Kilograms",
        data:
          dashboardData?.gradeSummary.map((grade) => grade.totalQuantity) || [],
        backgroundColor: donutColors,
        hoverOffset: 4,
      },
    ],
  };

  const barData = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "Test",
        data: [300, 50, 100],
        backgroundColor: barColors,
        hoverOffset: 4,
      },
    ],
  };

  const lineData = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "Test",
        data: [300, 50, 100],
        backgroundColor: lineColors,
        hoverOffset: 4,
      },
    ],
  };

  const donutOptions = {
    plugins: {
      legend: {
        display: true,
        position: "left" as const,
        align: "start" as const,
        labels: {
          boxWidth: 30,
          boxHeight: 30,
          color: "#18191A" as const,
          font: {
            size: 30,
            weight: "bold" as const,
          },
        },
      },
    },
    cutout: "65%", // Adjust this value to make the donut thinner or thicker
    maintainAspectRatio: false,
    responsive: true,
    layout: {
      padding: 30,
    },
  };

  const line_options = {
    plugins: {
      legend: {
        display: false,
        labels: {
          color: "#18191A" as const,
        },
      },
    },
    responsive: true,
    layout: {
      padding: {
        top: 20,
      },
    },
  };

  const bar_options = {
    plugins: {
      legend: {
        display: false,
        labels: {
          color: "#18191A" as const,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
    responsive: true,
    layout: {
      padding: {
        top: 20,
      },
    },
  };

  const [currentPage, setCurrentPage] = useState(0);

  function generateGradeElements(
    grades: { totalQuantity: number; name: string }[]
  ) {
    const gradesPerPage = 4; // Adjust as needed
    const pages = [];
    for (let i = 0; i < grades.length; i += gradesPerPage) {
      pages.push(grades.slice(i, i + gradesPerPage));
    }

    return pages;
  }

  // Function to handle page change
  const handlePageChange = (index: number) => {
    setCurrentPage(index);
  };
  return (
    // Parent container
    <div className="w-full h-full flex flex-col">
      {/* Inventory Summary container */}
      <div className="w-full h-max bg-accent-green rounded-3xl px-4 py-2 flex flex-col flex-1">
        <div className="w-full h-max flex justify-between items-center p-2">
          <h1 className="font-bold text-letters-color text-[30px]">
            Inventory Summary
          </h1>
          <button className="generate-report-button">Generate Report +</button>
        </div>
        <div className="w-full h-full flex">
          <div className="w-full flex flex-col">
            <div className="w-full h-full pr-4 pb-4">
              <div className="w-full h-full bg-custom-white rounded-3xl p-4 flex flex-col">
                <div className="w-full h-full text-letters-color flex flex-col p-4">
                  {/* TODO: By Grade/Area Regular A/B/C/D KG Pie Chart, Time series chart, and Yearly Chart */}
                  <div className="flex w-full justify-evenly">
                    {/* BY GRADE/AREA HERE*/}
                    <button
                      className={
                        sortOption === "grade"
                          ? "w-full h-[50px] rounded-xl bg-accent-green flex justify-center items-center"
                          : "w-full h-[50px] rounded-xl bg-custom-white border-2 border-opacity-40 flex ju" +
                            "stify-center items-center"
                      }
                      onClick={() => setSortOption("grade")}
                    >
                      <h1
                        className={
                          sortOption === "grade"
                            ? "font-bold text-[20px] text-letters-color"
                            : "text-[20px] text-letters-color"
                        }
                      >
                        By Grade
                      </h1>
                    </button>
                    <button
                      className={
                        sortOption === "area"
                          ? "w-full h-[50px] rounded-xl bg-accent-green flex justify-center items-center ml-[1rem] "
                          : "w-full h-[50px] rounded-xl bg-custom-white border-2 border-opacity-40 flex  ml-[1rem] ju" +
                            "stify-center items-center"
                      }
                      onClick={() => setSortOption("area")}
                    >
                      <h1
                        className={
                          sortOption === "area"
                            ? "font-bold text-[20px] text-letters-color"
                            : "text-[20px] text-letters-color"
                        }
                      >
                        By Area
                      </h1>
                    </button>
                  </div>
                  {sortOption == "grade" && dashboardData?.gradeSummary && (
                    <>
                      <div className="w-full h-full pt-[20px]">
                        <GradePage
                          page={
                            generateGradeElements(dashboardData.gradeSummary)[
                              currentPage
                            ]
                          }
                          generateRandomPastelColor={generateRandomPastelColor}
                        />
                      </div>
                      <Pagination
                        numPages={
                          dashboardData.gradeSummary
                            ? generateGradeElements(dashboardData.gradeSummary)
                                .length
                            : 0
                        }
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                      />
                    </>
                  )}
                  {sortOption == "area" && dashboardData?.areaSummary && (
                    <>
                      <div className="w-full h-full pt-[20px]">
                        <GradePage
                          page={
                            generateGradeElements(dashboardData.areaSummary)[
                              currentPage
                            ]
                          }
                          generateRandomPastelColor={generateRandomPastelColor}
                        />
                      </div>
                      <Pagination
                        numPages={
                          dashboardData.areaSummary
                            ? generateGradeElements(dashboardData.areaSummary)
                                .length
                            : 0
                        }
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-full rounded-3xl ">
            <div className="w-full h-full rounded-3xl pb-4 ">
              <div className="bg-custom-white w-full h-full rounded-3xl text-letters-color">
                {/* Pie Chart HERE */}
                <div className="w-full h-full flex justify-center items-center">
                  <Doughnut data={donutData} options={donutOptions} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Seasonal and Yearly chart container */}
      <div className="w-full h-full flex flex-1">
        {/* Seasonal and Yearly chart container */}
        <div className="w-full h-full flex">
          {/* Seasonal chart container */}
          <div className="w-full h-full rounded-3xl pr-4 pt-4">
            <div className="w-full h-full rounded-3xl bg-custom-white p-4">
              <h1 className="font-bold text-letters-color text-[30px]">
                Seasonal Chart
              </h1>
              <Line data={lineData} options={line_options} />
            </div>
          </div>
          {/* Yearly chart container */}
          <div className="w-full h-full rounded-3xl pt-4">
            <div className="w-full h-full rounded-3xl bg-custom-white p-4">
              <h1 className="font-bold text-letters-color text-[30px]">
                Yearly Chart
              </h1>
              <Bar data={barData} options={bar_options} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
