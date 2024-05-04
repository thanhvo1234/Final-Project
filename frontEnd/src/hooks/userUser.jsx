import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getUserAPI, getUserDetailApi, registerUserAPI,
  updateUserAPI,
} from "../api/apiUrl";
import { QUERY_KEY } from "../constants/querryKey.js";
import { openNotificationWithIcon } from "../components/notification/Notification.jsx";

export const useGetClients = (params) => useQuery({
  queryKey: [QUERY_KEY.USER, params.page, params.take, params.searchByName, params.searchByEmail],
  queryFn: async () => {
    const { data } = await getUserAPI(params);
    return data;
  },
  staleTime: 300000, // Optionally configure stale time, e.g., 5 minutes
  cacheTime: 600000, // Optionally configure cache time, e.g., 10 minutes
});


export const useRegisterUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: 'register-user',
    mutationFn: registerUserAPI,
    onSuccess: (data) => {
      queryClient.invalidateQueries([QUERY_KEY.USER]);
      openNotificationWithIcon("success", data.data.message);
    },
  });
};


export const useGetOneUser = (id) => useQuery({
  queryKey: [QUERY_KEY.USER, id],
  queryFn: async () => {
    const { data } = await getUserAPI(id);
    return data;
  },
  cacheTime: 0, // Ensures no cache for this query
});


export const useGetDetailUser = (id) => useQuery({
  queryKey: [QUERY_KEY.USER, id],
  queryFn: async () => {
    const { data } = await getUserDetailApi(id);
    return data;
  },
  cacheTime: 0, // Ensures no cache for this query
});


export const useEditProfile = (userId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['edit-profile', userId],
    mutationFn: (updatedData) => updateUserAPI(userId, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.USER]);
      openNotificationWithIcon("success", "Profile updated successfully.");
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
      openNotificationWithIcon("error", "Failed to update profile.");
    }
  });
};
