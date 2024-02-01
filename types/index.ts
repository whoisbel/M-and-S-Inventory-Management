export type DashboardData = {
  grade: {
    name: String;
    quantity: Number;
  }[];

  area: {
    name: String;
    quantity: Number;
  }[];

  currentYearHarvestData: {
    month: String;
    quantity: Number;
  }[];

  pastYearHarvestData: {
    year: String;
    quantity: Number;
  }[];

  [key: string]: Object[];
};

export type addFormData = {
  area: string;
  quantity: number;
  [key: string]: string | number;
};

export type categoryFormData = {
  grade: string;
  quantity: number;
  [key: string]: string | number;
};

export type inventoryInputData = addFormData | categoryFormData;

export type gradeCategoryDict = {
  [key: number]: {
    gradeId: number;
    gradeName: string;
    quantityOnHand: number;
    [key: string]: number | string;
  };
};

export type harvestLogCategoryData = {
  //used in api/inventory_input/category
  id: number;
  harvestDate: Date;
  quantity: number;
  areaName: string;
  areaId: number;
  grade: gradeCategoryDict;

  [key: string]: number | Date | string | gradeCategoryDict;
};
export type harvestLogsCategoryDict = {
  [key: number]: harvestLogCategoryData;
};
