import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCategoryAPI, deleteCategoryAPI, editCategoryAPI, getCategoryAPI, getDetailCategoryAPI } from "../api/apiUrl";
import { QUERY_KEY } from "../constants/querry-key";
import { openNotificationWithIcon } from "../components/notification/Notification";

export const useGetCategory = (params) =>
  useQuery([QUERY_KEY.CATEGORY], async () => {
    const { data } = await getCategoryAPI(params);
    return data;
  });

  export const useGetFullCategory = (params) =>
  useQuery(
    [
      QUERY_KEY.CATEGORY,
      params.page,
      params.take,
      params.searchByName,
    ],
    async () => {
      const { data } = await getCategoryAPI(params);
      return data;
    },
  );

  export const useGetOneCategory = (id) => {
    return useQuery(
      [QUERY_KEY.CATEGORY, id],
      async () => {
        const { data } = await getDetailCategoryAPI(id);
        return data;
      },
      { cacheTime: 0 },
    );
  };

  export const useCreateCategory = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation((newCategory) => createCategoryAPI(newCategory), {
      onSuccess: (data) => {
        queryClient.refetchQueries([QUERY_KEY.CATEGORY]);
        openNotificationWithIcon("success", data.data.message);
      },
    });
    return mutation;
  };

  export const useDeleteCategory = () => {
    const queryClient = useQueryClient();
  
    const deleteCategory = async (categoryId) => {
      await deleteCategoryAPI(categoryId);
    };

    return useMutation(deleteCategory, {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEY.CATEGORY);
        openNotificationWithIcon("success", "Delete Category Successfully");
      },
    });
  };

  export const useGetCategoryData = (id) =>
  useQuery([QUERY_KEY.CATEGORY, id], async () => {
    const { data } = await getDetailCategoryAPI(id);
    return data;
  });

  export const useEditCategoryData = (categoryId) => {
    const queryClient = useQueryClient();
    const editProductDetails = async (updatedData) => {
      await editCategoryAPI(categoryId, updatedData);
    };
    return useMutation(editProductDetails, {
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