import { useQuery } from "@tanstack/react-query";
import {
  getEmployeeAPI,
} from "../api/apiUrl";
import { QUERY_KEY } from "../constants/query-key";

export const useGetClients = (params) =>
  useQuery(
    [
      QUERY_KEY.USER,
      params.page,
      params.take,
      params.searchByName,
      params.searchByEmail,
    ],
    async () => {
      const { data } = await getEmployeeAPI(params);
      return data;
    },
  );