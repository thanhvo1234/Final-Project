import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/querryKey.js";
import { getProductAPI } from "../api/apiUrl.js";

export const useGetProduct = (params) =>
  useQuery({
    queryKey: [
      QUERY_KEY.PRODUCT,
      params.page,
      params.take,
      params.searchByName,
      params.searchByEmail,
    ],
    queryFn: async () => {
      const { data } = await getProductAPI(params);
      return data;
    },
  });


  export const useGetOneProduct = (id) =>
  useQuery({
    queryKey: [QUERY_KEY.PRODUCT, id],
    queryFn: async () => {
      const { data } = await getProductAPI(id);
      return data;
    },
    config: { cacheTime: 0 },
  });