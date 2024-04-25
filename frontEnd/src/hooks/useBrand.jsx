import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBrandAPI, deleteBrandAPI, editBrandAPI, getBrandAPI, getDetailBrandAPI } from "../api/apiUrl";
import { QUERY_KEY } from "../constants/querryKey";
import { openNotificationWithIcon } from "../components/notification/Notification";

export const useGetBrand = (params) =>
  useQuery([QUERY_KEY.BRAND], async () => {
    const { data } = await getBrandAPI(params);
    return data;
  });

  export const useGetFullBrand = (params) =>
  useQuery(
    [
      QUERY_KEY.BRAND,
      params.page,
      params.take,
      params.searchByName,
    ],
    async () => {
      const { data } = await getBrandAPI(params);
      return data;
    },
  );

  export const useGetOneBrand = (id) => {
    return useQuery(
      [QUERY_KEY.BRAND, id],
      async () => {
        const { data } = await getDetailBrandAPI(id);
        return data;
      },
      { cacheTime: 0 },
    );
  };

  export const useCreateBrand = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation((newBrand) => createBrandAPI(newBrand), {
      onSuccess: (data) => {
        queryClient.refetchQueries([QUERY_KEY.BRAND]);
        openNotificationWithIcon("success", data.data.message);
      },
    });
    return mutation;
  };

  export const useDeleteBrand = () => {
    const queryClient = useQueryClient();

    const deleteBrand = async (brandId) => {
      await deleteBrandAPI(brandId);
    };

    return useMutation(deleteBrand, {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEY.BRAND);
        openNotificationWithIcon("success", "Delete Brand Successfully");
      },
    });
  };

  export const useGetBrandData = (id) =>
  useQuery([QUERY_KEY.BRAND, id], async () => {
    const { data } = await getDetailBrandAPI(id);
    return data;
  });

  export const useEditBrandData = (brandId) => {
    const queryClient = useQueryClient();
    const editBrandDetails = async (updatedData) => {
      await editBrandAPI(brandId, updatedData);
    };
    return useMutation(editBrandDetails, {
      onSuccess: () => {
        queryClient.invalidateQueries([QUERY_KEY.BRAND]);
        openNotificationWithIcon("success", "Edit Brand Details Successfully");
      },
      onError: (error) => {
        console.error("Error updating product:", error);
        openNotificationWithIcon("error", "Failed to update category.");
      }
    });
};