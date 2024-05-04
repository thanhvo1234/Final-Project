import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBrandAPI, deleteBrandAPI, editBrandAPI, getBrandAPI, getDetailBrandAPI } from "../api/apiUrl";
import { QUERY_KEY } from "../constants/querryKey";
import { openNotificationWithIcon } from "../components/notification/Notification";

export const useGetBrand = (params) =>
  useQuery({
    queryKey: [QUERY_KEY.BRAND],
    queryFn: async () => {
      const { data } = await getBrandAPI(params);
      return data;
    }
  });

export const useGetFullBrand = (params) =>
  useQuery({
    queryKey: [QUERY_KEY.BRAND, params.page, params.take, params.searchByName],
    queryFn: async () => {
      const { data } = await getBrandAPI(params);
      return data;
    }
  });

export const useGetOneBrand = (id) =>
  useQuery({
    queryKey: [QUERY_KEY.BRAND, id],
    queryFn: async () => {
      const { data } = await getDetailBrandAPI(id);
      return data;
    },
    options: { cacheTime: 0 }
  });

export const useCreateBrand = () =>
  useMutation({
    mutationFn: createBrandAPI,
    onSuccess: (data) => {
      const queryClient = useQueryClient();
      queryClient.refetchQueries([QUERY_KEY.BRAND]);
      openNotificationWithIcon("success", data.data.message);
    }
  });

export const useDeleteBrand = () =>
  useMutation({
    mutationFn: deleteBrandAPI,
    onSuccess: () => {
      const queryClient = useQueryClient();
      queryClient.invalidateQueries([QUERY_KEY.BRAND]);
      openNotificationWithIcon("success", "Delete Brand Successfully");
    }
  });

export const useGetBrandData = (id) =>
  useQuery({
    queryKey: [QUERY_KEY.BRAND, id],
    queryFn: async () => {
      const { data } = await getDetailBrandAPI(id);
      return data;
    }
  });

export const useEditBrandData = (brandId) =>
  useMutation({
    mutationFn: async (updatedData) => editBrandAPI(brandId, updatedData),
    onSuccess: () => {
      const queryClient = useQueryClient();
      queryClient.invalidateQueries([QUERY_KEY.BRAND]);
      openNotificationWithIcon("success", "Edit Brand Details Successfully");
    },
    onError: (error) => {
      console.error("Error updating product:", error);
      openNotificationWithIcon("error", "Failed to update brand.");
    }
  });
