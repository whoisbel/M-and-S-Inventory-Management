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
  date: string;
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
