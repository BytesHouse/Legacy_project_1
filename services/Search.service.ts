import axios from "axios";

const instance = axios.create({
  baseURL: process.env.API
    ? `${process.env.API}/search`
    : "${process.env.API}/search",
});

const qCheckInstance = axios.create({
  baseURL: process.env.API ? `${process.env.API}` : "http://dev.qoobus.com/api",
});

const instanseTest = axios.create({
  baseURL: "https://qoobus.com/api/qcheq",
});

const qcheckInstance = axios.create({
  baseURL: "https://api.qorporates.com/search",
});

export interface CompaniesQuery {
  countryCode?: string;
  year?: string;

  companyNumber?: string;
  name?: string;
  searchQuery?: string;
  address?: string;
  founder?: string;
  activity?: string;

  page?: number;
  limit?: number;
  isWriteIndex?: boolean;
}

export class SearchService {
  static searchCompanies(query: string, limit?: number, page?: number) {
    return instance.post("companies/fuzzy", {
      searchStr: query,
      pageSize: limit || 3,
      page: page || 0,
    });
  }
  static searchPeoples(query: string, limit?: number, page?: number) {
    return instance.post("users/fuzzy", {
      searchStr: query,
      pageSize: limit || 3,
      page: page || 0,
    });
  }

  static searchCustomsFuzzy(query: string) {
    return instance.post("customs/fuzzy", {
      searchStr: query,
      pageSize: 5,
    });
  }
  static random(query: string, limit?: number) {
    return instance.post(`/users/random?pageSize=${limit || 3}`, {});
  }

  static getUserProfile(userId: number) {
    return qCheckInstance.get(`/public/users/${userId}`);
  }

  static ArchiveActivities(countryCode: string) {
    return qcheckInstance.get(`/activities/${countryCode}`);
  }
  static getActivity(activityId: string, countryCode: string, page?: number) {
    return qcheckInstance.get(
      `/companies?activity=${activityId}&page=${
        (page! -= 1) || 1
      }&countryCode=${countryCode}`
    );
  }
  static companiesCount() {
    return qcheckInstance.get("/countries");
  }
  static companies(query: CompaniesQuery) {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    return qcheckInstance.get("/companies", {
      params: {
        ...query,
        countryCode: query?.countryCode || "*",
        skip,
        isWriteIndex: process.env.IS_WRITE_INDEX,
      },
    });
  }
  static resultCompanies(query: CompaniesQuery) {
    return qcheckInstance.get("/companies", {
      params: {
        ...query,
        countryCode: "*",
        limit: 10,
        isWriteIndex: false,
      },
    });
  }

  static getCompanyProfileQorp(countryCode: string, id: string) {
    return qcheckInstance.get(`/companies/${countryCode}/${id}/private`);
  }
  static getCompanyProfileQoobId(countryCode: string, id: string) {
    return qCheckInstance.get(`/public/companies/${countryCode}/${id}`);
  }
  static getCompanyProfileQoob(countryCode: string, id: string) {
    return qCheckInstance.get(`/v2/qcheq/${countryCode}/${id}`);
  }

  static getRoutes(id: number) {
    return qCheckInstance.post(`/companies/${id}/routes`, []);
  }

  static getUser(countryCode: string, id: string) {
    return qCheckInstance.get(`/public/companies/${countryCode}/${id}`);
  }

  static getUsers(ids: string[]) {
    return qCheckInstance.post("/users", ids);
  }

  static getUsersByCompanyId(companyId: string) {
    return qCheckInstance.get(`/public/companies/${companyId}/users`);
  }

  static getFeedback(type: string, companyId: string, countryCode: string) {
    return qCheckInstance.get(
      `/feedbacks/${
        type || "to"
      }/${companyId}/${countryCode}?type=company&page=0&pageSize=20`
    );
  }

  static similiar(params: any, pageSize: number) {
    return qCheckInstance.post(
      `/search/companies/random?pageSize=${pageSize}`,
      {
        params: {
          ...params,
        },
        clientState: "COMPLETED",
      }
    );
  }
  static test() {
    return instanseTest.get("/archive");
  }
}
