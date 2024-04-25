import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getUserAPI, registerUserAPI,
} from "../api/apiUrl";
import { QUERY_KEY } from "../constants/querryKey";
import { openNotificationWithIcon } from "../components/notification/Notification";

export const useGetClients = (params) => {
  return useQuery({
    queryKey: [
      QUERY_KEY.USER,
      params.page,
      params.take,
      params.searchByName,
      params.searchByEmail,
    ],
    queryFn: async () => {
      const { data } = await getUserAPI(params);
      return data;
    },
  });
};
export const useRegisterUser = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newUser) => registerUserAPI(newUser),
    onSuccess: (data) => {
      console.log(data, "data00");
      queryClient.refetchQueries([QUERY_KEY.USER]);
      openNotificationWithIcon("success", data.data.message);
    },
  });
  return mutation;
};

export const useGetOneUser = (id) => {
  return useQuery({
    queryKey: [QUERY_KEY.USER, id],
    queryFn: async () => {
      const { data } = await getUserAPI(id);
      return data;
    },
    cacheTime: 0,
  });
};