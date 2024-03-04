"use client";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { swalCustomClass } from "@/utils/swalConfig";
import { Area } from "@prisma/client";

const AreaModal = ({
  showModal,
  swal,
  onSubmit,
  type,
  area,
}: {
  showModal: (val: boolean) => void;
  swal: typeof Swal;
  onSubmit: (areaDescription: string) => {};
  type: string;
  area?: Area;
}) => {
  const [inputArea, setInputArea] = useState<Area>({ description: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (area) {
      setInputArea(area);
    }
  }, []);
  async function handleSubmit() {
    if (inputArea.description.trim() == "") {
      setError("Please type the area description.");
      return;
    }
    onSubmit(inputArea);
  }

  return (
    <div className="flex flex-col gap-10 p-10">
      <h1 className="text-[40px]">{type == "add" ? "Add" : "Update"} Area</h1>
      <div className="flex gap-10 items-baseline">
        <label>Area Description:</label>
        <input
          value={inputArea.description}
          onChange={(e) =>
            setInputArea({ ...inputArea, description: e.target.value })
          }
          type="text"
          className="border-add-minus border-2 p-2 rounded outline-add-minus"
        />
      </div>
      {error != "" && <p className="text-red-500">{error}</p>}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => {
            showModal(false);
            swal.close();
          }}
          className="bg-add-minus rounded shadow  p-2 text-white w-[150px]"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="bg-primary-color rounded shadow p-2 text-white w-[150px]"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AreaModal;
