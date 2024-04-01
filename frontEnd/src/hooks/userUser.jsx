import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getEmployeeAPI, registerUserAPI,
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
      const { data } = await getUserAPI(params);
      return data;
    },
  );

  export const useRegisterUser = ()=>{
    const queryClient = useQueryClient();
    const mutation = useMutation((newUser) => registerUserAPI(newUser),{
      onSuccess: (data) => {
        console.log(data, "data00");
        queryClient.refetchQueries([QUERY_KEY.USER]);
        openNotificationWithIcon("success", data.data.message);
      },
    });
    return mutation;
  }