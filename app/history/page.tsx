"use client";
import { DownloadButton, NewCustomTable, CustomTable, SearchBar } from "@/components";
import { useEffect, useState } from "react";
import { ActionLog, Venue, Event } from "@prisma/client";
import * as XLSX from "xlsx";
const History = () => {
  const [actionLogs, setActionLogs] = useState<ActionLog[]>([]);
  const [tableData, setTableData] = useState<{
    [key: number]: string[];
  }>({});
  const [isLoading, setIsLoading] = useState(true);

  //get data
  useEffect(() => {
    async function fetchActionLogs() {
      const response = await fetch("/api/history/");
      const { actionLogs } = await response.json();
      console.log("action Logs", actionLogs);
      setActionLogs(actionLogs);
      setIsLoading(false);
    }
    fetchActionLogs();
  }, []);

  const headers = ["Date", "Venue", "Event", "User"];

  useEffect(() => {
    makeTableData();
  }, [actionLogs]);
  function makeTableData() {
    const tableData: { [key: number]: string[] } = {};

    actionLogs.map((actionLog) => {
      console.log(actionLog.venue);
      let venue = "";
      switch (actionLog.venue) {
        case Venue.actionLogs:
          venue = "Action Logs";
          break;

        case Venue.areaList:
          venue = "Area List";
          break;
        case Venue.availableProducts:
          venue = "Available Products";
          break;
        case Venue.gradeAndPriceList:
          venue = "Grade and Price List";
          break;
        case Venue.inventoryInput:
          venue = "Inventory Input";
          break;
        case Venue.orderDetails:
          venue = "Order Details";
          break;
        case Venue.requestForApproval:
          venue = "Request for Approval";
          break;
        case Venue.manageUsers:
          venue = "Manage Users";
          break;
        default:
          venue = actionLog.venue;
      }

      tableData[actionLog.id] = [
        new Date(actionLog.actionDate).toLocaleDateString(),
        venue.toUpperCase(),
        actionLog.event.toUpperCase(),
        actionLog.user
          ? (
              actionLog.user.firstName +
              " " +
              actionLog.user.lastName
            ).toUpperCase()
          : "User Deleted",
      ];
    });
    console.log(tableData);
    setTableData(tableData);
  }
  function downloadTableAsExcel() {
    // Convert tableData into an array of objects
    const data = Object.values(tableData).map(([date, venue, event, user]) => ({
      Date: date,
      Venue: venue,
      Event: event,
      User: user,
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "tableData.xlsx");
  }
  return (
    <div className="h-full w-full bg-white text-black">
      <div className="bg-accent-gray py-2 px-3 flex justify-end">
          <SearchBar onSearch={function (searchTerm: string): void {
          throw new Error("Function not implemented.");
        } }  />
      </div>
      <div className="flex justify-end">
        <DownloadButton onClick={downloadTableAsExcel} />
      </div>
      <div className="overflow-auto max-h-[550px] mr-5 ml-5 mb-5">
        <CustomTable headers={headers} data={tableData} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default History;
