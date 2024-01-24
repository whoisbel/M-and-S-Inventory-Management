import Link from "next/link";
import { DisplayID } from "@/components";
import { Chart } from "chart.js";
export default function Dashboard() {
  return <div className="w-full h-full flex flex-col">
    <DisplayID/>
    {/* Inventory Summary container */}
    <div className="w-full h-full bg-accent-green rounded-3xl p-7 flex">
      <div className="w-full flex flex-col">
        <h1 className="text-[30px] text-letters-color font-black pb-4">Inventory Summary</h1>
        <div className="w-full h-full pr-4">
          <div className="w-full h-full bg-custom-white rounded-3xl p-4 flex flex-col">
            <div className="w-full h-full text-letters-color flex flex-col p-4">
                {/* TODO: By Grade/Area Regular A/B/C/D KG Pie Chart, Time series chart, and Yearly Chart */}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-custom-white w-full h-full rounded-3xl text-letters-color">
      </div>
    </div>
    {/* Seasonal and Yearly chart container */}
    <div className="w-full h-full flex">
      {/* Seasonal chart container */}
      <div className="w-full h-full rounded-3xl pr-4 pt-4">
        <div className="w-full h-full rounded-3xl bg-custom-white"></div>
      </div>
      {/* Yearly chart container */}
      <div className="w-full h-full rounded-3xl pt-4">
        <div className="w-full h-full rounded-3xl bg-custom-white"></div>
      </div>
    </div>
  </div>;
}
