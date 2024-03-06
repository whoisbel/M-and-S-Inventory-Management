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
  [key: string]: string | number | boolean;
};

export type categoryFormData = {
  grade: number;
  quantity: number;
  isWashed: boolean;
  [key: string]: number | boolean;
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

export type customTableProps = {
  headers: string[];
  data: { [key: number]: string[] };
  isLoading?: boolean;
  handleUpdate?: (index: number) => void;
  handleDelete?: (index: number) => void;
  handleStockout?: (index: number) => void; //for the ungraded stockout
};

export type createAccountData = {
  firstName: string;
  middleName: string;
  lastName: string;
  password1: string;
  password2: string;
  companyRole: string;
  username: string;
  code?: string;
  isSetup?: boolean;
  [key: string]: string | boolean | undefined;
};

export type loginAccountData = {
  username: string;
  password: string;
  [key: string]: string;
};

export type inventoryDataType = {
  id: number;
  isWashed: boolean;
  harvestDate: Date;
  areaName: string;
  gradeName: string;

  [key: string]: number | boolean | Date | string;
};
export type forgotPasswordData = {
  firstName: string;
  lastName: string;
  username: string;
  securityQuestions: string[];
  securityQuestionsAnswers: string[];
  newPassword: string;
  confNewPassword: string;
  [key: string]: string | boolean | string[];
};

export type changePasswordType = {
  oldPassword: string;
  newPassword: string;
  confNewPassword: string;
  [key: string]: string;
};
export type customTableDataType = { [key: number]: string[] };
