"use client";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { swalCustomClass } from "@/utils/swalConfig";
import { Area, Grade } from "@prisma/client";

const GradeModal = ({
  showModal,
  swal,
  onSubmit,
  type,
  grade,
}: {
  showModal: (val: boolean) => void;
  swal: typeof Swal;
  onSubmit: (val: Grade) => void;
  type: string;
  grade?: Grade;
}) => {
  const [inputGrade, setInputGrade] = useState<Grade>({
    description: "",
    price: 0,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (grade) {
      setInputGrade(grade);
    }
  }, []);

  function handleSubmit() {
    if (inputGrade.description.trim() == "") {
      setError("Please type the grade.");
      return;
    }
    onSubmit(inputGrade);
  }

  return (
    <div className="flex flex-col gap-10 p-10">
      <h1 className="text-[40px]">{type == "add" ? "Add" : "Update"} Grade</h1>
      <div className="grid grid-cols-2 justify-start items-start gap-y-2">
        <label>Description:</label>
        <input
          value={inputGrade.description}
          onChange={(e) =>
            setInputGrade({ ...inputGrade, description: e.target.value })
          }
          type="text"
          className="border-add-minus border-2 p-2 rounded outline-add-minus"
        />

        <label>Price: </label>
        <input
          type="number"
          value={inputGrade.price == 0 ? "" : inputGrade.price}
          onChange={(e) => {
            setInputGrade({
              ...inputGrade,
              price: +e.target.value != 0 ? parseFloat(e.target.value) : 0,
            });
          }}
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
          Submit
        </button>
      </div>
    </div>
  );
};

export default GradeModal;
