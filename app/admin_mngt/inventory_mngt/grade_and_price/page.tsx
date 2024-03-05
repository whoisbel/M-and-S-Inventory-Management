"use client";
import { AddNewButton, AdminTable, SearchBar } from "@/components";
import { Grade } from "@prisma/client";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { GradeModal } from "@/components";
import { createPortal } from "react-dom";
import { swalCustomClass } from "@/utils/swalConfig";
const GradeAndPrice = () => {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [isAddAlertShown, setIsAddAlertShown] = useState(false);
  const [isUpdateAlertShown, setIsUpdateAlertShown] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState<Grade>();
  useEffect(() => {
    async function fetchGrades() {
      const response = await fetch(
        "/api/admin_mngt/inventory_mngt/grade_and_price"
      );
      if (response.ok) {
        const data = await response.json();
        setGrades(data);
      }
    }
    fetchGrades();
  }, []);

  const swal = withReactContent(Swal);

  function addNewButtonClick() {
    swal.fire({
      didOpen: () => setIsAddAlertShown(true),
      didClose: () => setIsAddAlertShown(false),
      showConfirmButton: false,
    });
  }

  function updateButtonClick(id: Number) {
    const grade = grades.find((grade) => grade.id === id);
    setSelectedGrade(grade);

    swal.fire({
      didOpen: () => setIsUpdateAlertShown(true),
      didClose: () => setIsUpdateAlertShown(false),
      showConfirmButton: false,
    });
  }

  async function handleAddSubmit(grade: Grade) {
    const res = await fetch("/api/admin_mngt/inventory_mngt/grade_and_price", {
      method: "POST",
      body: JSON.stringify(grade),
    });

    if (res.ok) {
      swal
        .fire({
          title: "Grade added successfuly",
          icon: "success",
          customClass: swalCustomClass,
        })
        .then(() => {
          location.reload();
        });
    } else {
      const { error } = await res.json();
      swal
        .fire({
          title: "Error",
          icon: "error",
          text: error,
          customClass: swalCustomClass,
        })
        .then(() => {
          setIsAddAlertShown(false);
        });
    }
  }
  async function handleUpdateSubmit(grade: Grade) {
    const res = await fetch("/api/admin_mngt/inventory_mngt/grade_and_price", {
      method: "UPDATE",
      body: JSON.stringify(grade),
    });
    if (res.ok) {
      swal
        .fire({
          title: "Grade updated successfuly",
          icon: "success",
          customClass: swalCustomClass,
        })
        .then(() => {
          location.reload();
        });
    }
  }
  async function handleDelete(id: number) {
    const res = await fetch("/api/admin_mngt/inventory_mngt/grade_and_price", {
      method: "DELETE",
      body: JSON.stringify(id),
    });
    if (res.ok) {
      swal
        .fire({
          title: "Grade deleted successfuly",
          icon: "success",
          customClass: swalCustomClass,
        })
        .then(() => {
          location.reload();
        });
    } else {
      swal.fire({
        title: "Grade is in use",
        icon: "error",
        customClass: swalCustomClass,
      });
    }
  }

  return (
    <div className="ml-3 pt-4 px-4 max-h-[750px] h-full w-full border border-add-minus rounded-lg">
      {isAddAlertShown &&
        createPortal(
          <GradeModal
            showModal={setIsAddAlertShown}
            swal={swal}
            onSubmit={handleAddSubmit}
            type="add"
          />,
          swal.getHtmlContainer()!
        )}

      {isUpdateAlertShown &&
        createPortal(
          <GradeModal
            showModal={setIsUpdateAlertShown}
            swal={swal}
            onSubmit={handleUpdateSubmit}
            type="update"
            grade={selectedGrade}
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
          <AddNewButton onClick={addNewButtonClick} />
        </div>
      </div>
      <div className=" flex flex-col">
        <span className="text-[20px] bold border-b-4  border-primary-color">
          Grade and Price List
        </span>
        <div className="overflow-auto max-h-[550px] w-full">
          <AdminTable
            grades={grades}
            onGreenButtonClick={updateButtonClick}
            onRedButtonClick={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default GradeAndPrice;
