"use client";
import {CustomTable, InventoryInputForm} from "@/components";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {categoryFormData, customTableDataType, customTableProps, inventoryDataType} from "@/types";
import {Area, Grade} from "@prisma/client";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {createPortal} from "react-dom";
import {CgAdd} from "react-icons/cg";
import {BiSearch} from "react-icons/bi";
const Inventory = () => {
    const [inventoryData,
        setInventoryData] = useState < inventoryDataType[] > ([]);
    const [tableData,
        setTableData] = useState < customTableDataType > ({});
    const [isLoading,
        setIsLoading] = useState(true);
    const [swalShown,
        setSwalShown] = useState(false);
    const [selectedUpdateData,
        setSelectedUpdateData] = useState < string[] > ([]);
    const [filter,
        setFilter] = useState({dateFilter: "", areaFilter: "", gradeFilter: ""});
    const [area,
        setArea] = useState < Area[] > ([]);
    const [grade,
        setGrade] = useState < Grade[] > ([]);
    const [dates,
        setDates] = useState < {
        harvestDate: string
    }[] > ([]);
    //get data from api
    useEffect(() => {
        const fetchData = async() => {
            const response = await fetch("/api/inventory/inventory");
            const {data, area, date, grade} = await response.json();
            setInventoryData(data);
            setIsLoading(false);
            setArea(area);
            setGrade(grade);
            setDates(date);
            console.log(date);
        };
        fetchData();
    }, []);

    //trigger after inventory data is set
    useEffect(() => {
        setTableData(getDefaultData());
        console.log(tableData);
    }, [inventoryData]);
    useEffect(() => {
        filterTable();
    }, [filter]);
    const headers = [
        "Harvest Date",
        "Area",
        "Grade",
        "Quantity",
        "Washed",
        "Actions"
    ];
    const data = {
        0: [
            "06/02/2024",
            "Charles",
            "grade a",
            "quantity",
            "unit price",
            "Update"
        ]
    };

    //turn json data to table json
    function getDefaultData() {
        const defaultTableData : customTableDataType = {};

        inventoryData.map((data) => {
            defaultTableData[data.id] = [
                String(data.harvestDate),
                data.areaName,
                data.gradeName,
                String(data.quantity),
                data.isWashed
                    ? "True"
                    : "False",
                "update delete"
            ];
        });
        return defaultTableData;
    }

    const filterTable = () => {
        const defaultTableData = getDefaultData();

        let newTableData = Object
            .keys(defaultTableData)
            .filter((data) => {
                if (filter.areaFilter == "") {
                    return true;
                } else {
                    return defaultTableData[Number(data)][1] == filter.areaFilter;
                }
            });
        newTableData = newTableData.filter((data) => {
            if (filter.gradeFilter == "") {
                return true;
            } else {
                return defaultTableData[Number(data)][2] == filter.gradeFilter;
            }
        });
        newTableData = newTableData.filter((data) => {
            if (filter.dateFilter == "") {
                return true;
            } else {
                return defaultTableData[Number(data)][0] == filter.dateFilter;
            }
        });

        const filteredData : typeof defaultTableData = {};
        newTableData.map((key) => {
            filteredData[Number(key)] = defaultTableData[Number(key)];
        });
        setTableData(filteredData);
    };

    const swal = withReactContent(Swal);
    const handleUpdate = (index : number) => {
        swal.fire({
            didOpen: () => setSwalShown(true),
            didClose: () => setSwalShown(false),
            showConfirmButton: false,
            customClass: {
                popup: "m-0 flex !w-auto !rounded !p-0",
                htmlContainer: "!m-0 !rounded p-0"
            }
        });
        setSelectedUpdateData(tableData[index]);
        console.log(swal.getHtmlContainer());
    };
    return (
        <div className="h-full w-full bg-white text-black">
            {swalShown && createPortal(
                <InventoryModal inventoryData={selectedUpdateData} swal={swal} grade={grade}/>, swal.getHtmlContainer()!)}
            <div className="bg-accent-gray py-2  px-3 flex gap-2">
                <div className="flex gap-3">
                    <label>Sort by:</label>
                    <select name="sort-select" id="">
                        <option value="select sort" disabled>
                            Select Sort
                        </option>
                    </select>
                </div>
                <div className="flex gap-3">
                    <label>Filters:</label>
                    <select
                        className="w min-w-[150px]"
                        defaultValue=""
                        onChange={(e) => {
                        setFilter({
                            ...filter,
                            dateFilter: e.target.value
                        });
                    }}>
                        <option value="">Date</option>

                        {dates.map((date, ind) => (
                            <option key={ind} value={date.harvestDate}>
                                {date.harvestDate}
                            </option>
                        ))}
                    </select>
                    <select
                        className="w min-w-[150px]"
                        defaultValue=""
                        onChange={(e) => {
                        setFilter({
                            ...filter,
                            gradeFilter: e.target.value
                        });
                    }}>
                        <option value="">Grade</option>
                        {grade.map((g, ind) => (
                            <option key={ind} value={g.description}>
                                {g.description}
                            </option>
                        ))}
                    </select>
                    <select
                        className="w min-w-[150px]"
                        onChange={(e) => {
                        setFilter({
                            ...filter,
                            areaFilter: e.target.value
                        });
                    }}>
                        <option value="">Area</option>
                        {area.map((area, ind) => (
                            <option key={ind} value={area.description}>
                                {area.description}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex-1 flex justify-end items-center ">
                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Search"
                        className="rounded-lg placeholder:pl-2"/>
                    <BiSearch className="-ml-[1.25em] text-primary-color"/>
                </div>
            </div>
            <div className="flex flex-col p-3 bg-white">
                <CustomTable
                    headers={headers}
                    data={tableData}
                    isLoading={isLoading}
                    handleUpdate={handleUpdate}/>
            </div>
        </div>
    );
};

export default Inventory;

const InventoryModal = ({inventoryData, swal, grade} : {
    inventoryData: string[];
    swal: typeof Swal;
    grade: string[];
}) => {
    const [categoryFormData,
        setCategoryFormData] = useState < categoryFormData[] > ([]);
    const [ungradedQuantity,
        setUngradedQuantity] = useState(Number(inventoryData[3]));
    const createInventoryForm = () => {
        const newData : categoryFormData = {
            grade: "",
            quantity: 0
        };
        setCategoryFormData([
            ...categoryFormData,
            newData
        ]);
    };
    useEffect(() => {
        computeUngradedQuantity();
    }, [categoryFormData]);
    const handleInventoryFormChange = (e : ChangeEvent < HTMLInputElement > | ChangeEvent < HTMLSelectElement >, index : number) => {
        const field = e.target.name;
        const newCategoryFormData = [...categoryFormData];
        newCategoryFormData[index][field] = e.target.value;
        setCategoryFormData(newCategoryFormData);
    };

    const handleRemoveForm = (index : number) => {
        const newCategoryFormData = [...categoryFormData];
        newCategoryFormData.splice(index, 1);
        setCategoryFormData(newCategoryFormData);
    };

    const computeUngradedQuantity = () => {
        let sortedQuantity = 0;
        categoryFormData.map((data) => {
            sortedQuantity += Number(data.quantity);
        });
        console.log(sortedQuantity);
        setUngradedQuantity(Number(inventoryData[3]) - sortedQuantity);
    };
    return (
        <div
            className="flex bg-white min-w-[900px] min-h-[400px] flex-col text-black rounded">
            <div className=" bg-accent-gray flex items-center p-3">
                <b>Inventory</b>
            </div>
            <div className="px-3 flex flex-col gap-3">
                <div className="flex gap-3 items-center  py-1 text-[20px]">
                    <label>Date:</label>
                    <input
                        type="text"
                        name="date"
                        className="h-[20px] py-3 px-1 border-2 border-add-minus"
                        value={inventoryData[0]}
                        readOnly/>
                    <label>Area</label>
                    <input
                        type="text"
                        name="area"
                        className="h-[20px] py-3 px-1 border-2 border-add-minus"
                        value={inventoryData[1]}
                        readOnly/>
                    <label>Quantity</label>
                    <input
                        type="text"
                        name="quantity"
                        className="h-[20px] py-3 px-1 border-2 border-add-minus"
                        value={ungradedQuantity}
                        readOnly/>
                    <button
                        className="px-3 py-2 shadow-neutral-600 border-add-minus shadow  hover:bg-neutral-500 bg-accent-gray border-[1px] rounded flex"
                        onClick={() => {
                        createInventoryForm();
                    }}>
                        Add New
                        <CgAdd/>
                    </button>
                </div>
                <div className="py-2 h-[500px] overflow-y-auto flex h-full flex-col gap-3">
                    {categoryFormData.map((data, index) => (<InventoryInputForm
                        handleChange={handleInventoryFormChange}
                        handleDelete={handleRemoveForm}
                        inventoryFormData={data}
                        grade={grade}
                        index={index}
                        key={index}/>))}
                </div>
                <div className="py-4 flex gap-3 justify-center">
                    <button
                        className="bg-red-500 text-white float-right min-w-[100px] rounded-full px-4 py-2"
                        onClick={() => {
                        swal.close();
                    }}>
                        Cancel
                    </button>
                    <button
                        className="bg-primary-color text-white float-right min-w-[100px] rounded-full px-4 py-2"
                        onClick={() => {
                        swal.fire({title: "Success", icon: "success", text: "The inventory is saved ahahaha"});
                    }}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};
