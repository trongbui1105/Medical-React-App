class Config {
  static loginUrl = "http://127.0.0.1:8000/api/gettoken/";
  static refreshApiUrl = "http://127.0.0.1:8000/api/refresh_token/";
  static companyApiUrl = "http://127.0.0.1:8000/api/company/";
  static homeApiUrl = "http://127.0.0.1:8000/api/home_api/";
  static customerRequestApiUrl = "http://127.0.0.1:8000/api/customer_request/";
  static medicineNameApiUrl = "http://127.0.0.1:8000/api/medicinebyname/";
  static companyBankApiUrl = "http://127.0.0.1:8000/api/companybank/";
  static generateBillApiUrl = "http://127.0.0.1:8000/api/generate_bill_api/";
  static companyAccountApiUrl = "http://127.0.0.1:8000/api/companyaccount/";
  static employeeApiUrl = "http://127.0.0.1:8000/api/employee/";
  static companyOnly = "http://127.0.0.1:8000/api/companyonly/";
  static medicineApiUrl = "http://127.0.0.1:8000/api/medicine/";
  static employeeSalaryApiUrl =
    "http://127.0.0.1:8000/api/employee_all_salary/";
  static employeeBankApiUrl = "http://127.0.0.1:8000/api/employee_all_bank/";
  static employeeSalaryByIDApiUrl =
    "http://127.0.0.1:8000/api/employee_salary_by_id/";
  static employeeBankByIDApiUrl =
    "http://127.0.0.1:8000/api/employee_bank_by_id/";
  static homeUrl = "/home";
  static logoutPageUrl = "/logout";

  static sidebarItem = [
    {
      index: "0",
      title: "Home",
      url: "/home",
      icons: "home",
    },
    {
      index: "1",
      title: "Company",
      url: "/company",
      icons: "assessment",
    },
    {
      index: "2",
      title: "Add Medicine",
      url: "/addMedicine",
      icons: "assessment",
    },
    {
      index: "3",
      title: "Manage Medicine",
      url: "/manageMedicine",
      icons: "assessment",
    },
    {
      index: "4",
      title: "Manage Company Account",
      url: "/manageCompanyAccount",
      icons: "assessment",
    },
    {
      index: "5",
      title: "Manage Employee",
      url: "/employeeManage",
      icons: "assessment",
    },
    {
      index: "6",
      title: "Generate Bill",
      url: "/generateBill",
      icons: "assessment",
    },
    {
      index: "7",
      title: "Customer Request",
      url: "/customerRequest",
      icons: "assessment",
    },
  ];
}

export default Config;
