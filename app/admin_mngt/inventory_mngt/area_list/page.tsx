"use client";
import { useEffect, useState } from "react";
import { AddNewButton, SearchBar } from "@/components";
import AdminTable from "../../../../components/AdminTable";
import { Area } from "@prisma/client";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { createPortal } from "react-dom";
import { AreaModal } from "@/components";
import { swalCustomClass } from "@/utils/swalConfig";

/**
 * Renders a list of areas with the ability to add new areas.
 * @returns The AreaList component.
 */

const AreaList = () => {
  const [areas, setAreas] = useState<Area[]>([]);
  const [isAddAlertShown, setIsAddAlertShown] = useState(false);
  const [isUpdateAlertShown, setIsUpdateAlertShown] = useState(false);
  const [areaToUpdate, setAreaToUpdate] = useState<Area | null>(null);

  const swal = withReactContent(Swal);
  function handleAddNewClick() {
    //open a sweet alert containing the add area form
    swal.fire({
      didClose: () => setIsAddAlertShown(false),
      didOpen: () => setIsAddAlertShown(true),
      showConfirmButton: false,
      customClass: {
        popup: "m-0 flex !w-auto !rounded !p-0",
        htmlContainer: "!m-0 !rounded p-0",
      },
    });
  }

  function handleUpdateClick(id: number) {
    const area = areas.find((area) => area.id === id);
    setAreaToUpdate(area);
    swal.fire({
      didClose: () => setIsUpdateAlertShown(false),
      didOpen: () => setIsUpdateAlertShown(true),
      showConfirmButton: false,
      customClass: {
        popup: "m-0 flex !w-auto !rounded !p-0",
        htmlContainer: "!m-0 !rounded p-0",
      },
    });
  }

  useEffect(() => {
    async function fetchAreas() {
      const response = await fetch("/api/admin_mngt/inventory_mngt/area_list");
      if (response.ok) {
        const data = await response.json();
        setAreas(data);
      }
    }
    fetchAreas();
  }, []);

  async function handleAddAreaSubmit(area: Area) {
    const res = await fetch("/api/admin_mngt/inventory_mngt/area_list", {
      method: "POST",
      body: JSON.stringify({ description: area.description }),
    });
    if (res.ok) {
      setIsAddAlertShown(false);
      swal
        .fire({
          title: "Area Added",
          icon: "success",
          customClass: swalCustomClass,
        })
        .then(() => {
          swal.close();
          location.reload();
        });
    }
  }

  return (
    <div className="ml-3 pt-4 px-4 max-h-[750px] overflow-y-scroll min-h-full w-full border border-add-minus rounded-lg">
      {isAddAlertShown &&
        createPortal(
          <AreaModal
            type="add"
            onSubmit={handleAddAreaSubmit}
            swal={swal}
            showModal={setIsAddAlertShown}
          />,
          swal.getHtmlContainer()!
        )}
      {isUpdateAlertShown &&
        createPortal(
          <AreaModal
            type="update"
            onSubmit={handleAddAreaSubmit}
            swal={swal}
            showModal={setIsUpdateAlertShown}
            area={areaToUpdate}
          />,
          swal.getHtmlContainer()!
        )}
      <div className="flex justify-between mb-2">
        <div>
          {" "}
          <SearchBar />{" "}
        </div>
        <div>
          {" "}
          <AddNewButton onClick={handleAddNewClick} />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-[20px] bold border-b-4  border-primary-color">
          Area List
        </span>
        <div className="overflow-auto max-h-[550px] w-full">
          <AdminTable areas={areas} onGreenButtonClick={handleUpdateClick} />
        </div>
      </div>
    </div>
  );
};

export default AreaList;
