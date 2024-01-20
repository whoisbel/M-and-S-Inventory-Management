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
