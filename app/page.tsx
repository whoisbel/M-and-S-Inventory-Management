"use client";
import Link from "next/link";
import { Chart, ArcElement } from "chart.js/auto";
import { useEffect, useRef, useState } from "react";
import { Doughnut, Bar, Line } from "react-chartjs-2";

import { getSession, signOut } from "next-auth/react";
import { Pagination, GradePage, DownloadButton } from "@/components";
import { generateRandomPastelColor } from "../utils/generatePastelColor";
import { usePathname } from "next/navigation";
type dashboardDataType = {
  areaSummary: { quantity: number; name: string }[];
  gradeSummary: { quantity: number; name: string }[];
  monthSummary: { quantity: number; month: number }[];
  yearSummary: { quantity: number; year: number }[];
};

export default function Dashboard() {
  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      if (session && !session.user) {
        signOut({ callbackUrl: "/auth" });
      }
    };
    fetchSession();
  }, []);

  const [dashboardData, setDashboardData] = useState<dashboardDataType>();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
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
        data: dashboardData?.gradeSummary.map((grade) => grade.quantity) || [],
        backgroundColor: donutColors,
        hoverOffset: 4,
      },
    ],
  };

  const barData = {
    labels: dashboardData?.yearSummary.map((year) => year.year) || [],
    datasets: [
      {
        label: "Kilograms",
        data: dashboardData?.yearSummary.map((year) => year.quantity) || [],

        backgroundColor: barColors,
        hoverOffset: 4,
      },
    ],
  };

  const lineData = {
    labels: months,
    datasets: [
      {
        label: "Test",
        data:
          months.map((month, index) => {
            return (
              dashboardData?.monthSummary.find(
                (monthData) => monthData.month === index + 1
              )?.quantity || 0
            );
          }) || [],
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
          boxWidth: 25,
          boxHeight: 25,
          color: "#18191A" as const,
          font: {
            size: 20,
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

  function generateGradeElements(grades: { quantity: number; name: string }[]) {
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
      <div className="w-full h-1/2 bg-accent-green rounded-3xl px-4 flex flex-col flex-1">
        <div className="w-full flex justify-between items-center">
          <h1 className="subtitle-bold text-letters-color text-[15px]">
            Inventory Summary
          </h1>
          <DownloadButton />
        </div>
        <div className="w-full h-[calc(100%-20px)] max-h-screen grid grid-cols-2 gap-5 ">
          <div className=" bg-custom-white mb-5 rounded-3xl">
            <div className=" text-letters-color h-full flex flex-col p-4">
              {/* TODO: By Grade/Area Regular A/B/C/D KG Pie Chart, Time series chart, and Yearly Chart */}

              {sortOption == "grade" && dashboardData?.gradeSummary && (
                <>
                  <div className="w-full h-full ">
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
            </div>
          </div>
          <div className=" bg-custom-white mb-5 rounded-3xl">
            <div className="w-full h-full flex justify-center items-center">
              <Doughnut data={donutData} options={donutOptions} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-1/2 ">
        <div className="w-full h-[calc(100%-20px)] max-h-screen grid grid-cols-2 gap-5 ">
          <div className=" bg-custom-white p-4 mt-4 rounded-3xl">
          <h1 className="subtitle-bold text-letters-color">
                Seasonal Chart
              </h1>
              <Line data={lineData} options={line_options} />
          </div>
          <div className=" bg-custom-white p-4 mt-4 rounded-3xl">
          <h1 className="subtitle-bold text-letters-color">
                Yearly Chart
              </h1>
              <Bar data={barData} options={bar_options} />
          </div>
          
        </div>
      </div>
      {/* Seasonal and Yearly chart container */}

    </div>
  );
}
