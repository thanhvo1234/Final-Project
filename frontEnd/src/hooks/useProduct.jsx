import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/querryKey.js";
import { getProductAPI, createProductAPI, editProductAPI, deleteProductAPI, getDetailProductAPI } from "../api/apiUrl.js";
import { openNotificationWithIcon } from "../components/notification/Notification";

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

  export const useCreateProduct = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
      mutationFn: (newProduct) => createProductAPI(newProduct),
      onSuccess: (data) => {
        queryClient.invalidateQueries([QUERY_KEY.PRODUCT]);
        openNotificationWithIcon("success", data.data.message);
      },
      onError: (error) => {
        openNotificationWithIcon("error", "Failed to create product.");
        console.error("Error creating product:", error);
      }
    });
    return mutation;
  };
  


  export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
  
    const deleteProduct = async (productId) => {
      await deleteProductAPI(productId);
    };

    return useMutation(deleteProduct, {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEY.PRODUCT);
        openNotificationWithIcon("success", "Delete Product Successfully");
      },
    });
  };

  export const useGetProductData = (id) =>
  useQuery([QUERY_KEY.PRODUCT, id], async () => {
    const { data } = await getDetailProductAPI(id);
    return data;
  });

  export const useEditProductData = (productId) => {
    const queryClient = useQueryClient();
    const editProductDetails = async (updatedData) => {
      await editProductAPI(productId, updatedData);
    };
    return useMutation(editProductDetails, {
      onSuccess: () => {
        queryClient.invalidateQueries([QUERY_KEY.PRODUCT]);
        openNotificationWithIcon("success", "Edit Product Details Successfully");
      },
      onError: (error) => {
        console.error("Error updating product:", error);
        openNotificationWithIcon("error", "Failed to update product.");
      }
    });
};