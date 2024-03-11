"use client";
import { DownloadButton, NewCustomTable, CustomTable } from "@/components";
import { useEffect, useState } from "react";
import { ActionLog, Venue, Event } from "@prisma/client";
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
      setActionLogs(actionLogs);
      setIsLoading(false);
      console.log(actionLogs);
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
      tableData[actionLog.id] = [
        new Date(actionLog.actionDate).toLocaleDateString(),
        actionLog.venue.toUpperCase(),
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

  return (
    <div className="h-full w-full bg-white text-black">
      <div className="flex justify-end">
        <DownloadButton onClick={() => {}} />
      </div>
      <div className="overflow-auto max-h-[550px] mr-5 ml-5 mb-5">
        <CustomTable headers={headers} data={tableData} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default History;
