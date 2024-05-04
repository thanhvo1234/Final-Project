import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCategoryAPI,
  deleteCategoryAPI,
  editCategoryAPI,
  getCategoryAPI,
  getDetailCategoryAPI
} from "../api/apiUrl";
import { QUERY_KEY } from "../constants/querryKey";
import { openNotificationWithIcon } from "../components/notification/Notification";

export const useGetCategory = (params) =>
  useQuery({
    queryKey: [QUERY_KEY.CATEGORY],
    queryFn: async () => {
      const { data } = await getCategoryAPI(params);
      return data;
    }
  });

export const useGetFullCategory = (params) =>
  useQuery({
    queryKey: [QUERY_KEY.CATEGORY, params.page, params.take, params.searchByName],
    queryFn: async () => {
      const { data } = await getCategoryAPI(params);
      return data;
    }
  });

export const useGetOneCategory = (id) => {
  return useQuery({
    queryKey: [QUERY_KEY.CATEGORY, id],
    queryFn: async () => {
      const { data } = await getDetailCategoryAPI(id);
      return data;
    },
    options: { cacheTime: 0 }
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCategoryAPI,
    onSuccess: (data) => {
      queryClient.invalidateQueries([QUERY_KEY.CATEGORY]);
      openNotificationWithIcon("success", data.data.message);
    },
    onError: (error) => {
      openNotificationWithIcon("error", "Failed to create category.");
      console.error("Error creating category:", error);
    }
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCategoryAPI,
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.CATEGORY]);
      openNotificationWithIcon("success", "Delete Category Successfully");
    }
  });
};

export const useGetCategoryData = (id) =>
  useQuery({
    queryKey: [QUERY_KEY.CATEGORY, id],
    queryFn: async () => {
      const { data } = await getDetailCategoryAPI(id);
      return data;
    }
  });

export const useEditCategoryData = (categoryId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatedData) => editCategoryAPI(categoryId, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.CATEGORY]);
      openNotificationWithIcon("success", "Edit Category Details Successfully");
    },
    onError: (error) => {
      console.error("Error updating product:", error);
      openNotificationWithIcon("error", "Failed to update category.");
    }
  });
};
