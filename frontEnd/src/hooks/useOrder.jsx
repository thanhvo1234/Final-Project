import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createOrderAPI, getDetailOrderAPI, getOrderAPI, payOrderAPI, paymentAPI } from "../api/apiUrl";
import { QUERY_KEY } from "../constants/querryKey";
import { openNotificationWithIcon } from "../components/notification/Notification";


export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['create-order'],
    mutationFn: createOrderAPI,
    onSuccess: (data) => {
      console.log('Create order success data:', data); // Add this line
      queryClient.invalidateQueries([QUERY_KEY.ORDER]);
      openNotificationWithIcon("success", data.data.message);
    },
    onError: (error) => {
      console.error('Error creating order:', error);
      openNotificationWithIcon("error", "Failed to create order");
    }
  });
  
};
export const useGetFullOrder = (params) =>
useQuery({
  queryKey: [QUERY_KEY.ORDER, params.page, params.take],
  queryFn: async () => {
    const { data } = await getOrderAPI(params);
    return data;
  },
  keepPreviousData: true, // Keeps previous data until new data is fetched when navigating pages
  staleTime: 5 * 60 * 1000, // 5 minutes of data being considered fresh
  cacheTime: 30 * 60 * 1000, // 30 minutes until the cache data is garbage collected
  onError: (error) => {
    console.error('Error fetching orders:', error);
    openNotificationWithIcon("error", "Failed to fetch orders");
  }
});

export const useMakeMomoPayment = () => {
  return useMutation({
    mutationKey: ['make-momo-payment'],
    mutationFn: paymentAPI,
    onError: (error) => {
      console.error('Error making MoMo payment:', error);
    },
    onSuccess: (data) => {
      console.log('MoMo payment success data:', data);
      const payUrl = data?.data.payUrl;
      if (payUrl) {
        console.log(payUrl,"aaaa");
        window.location.href = payUrl;
      } else {
        console.error('PayUrl not found in response data');
      }
    },
  });
};


export const useGetOneOrder = (id) =>
  useQuery({
    queryKey: [QUERY_KEY.ORDER, id],
    queryFn: async () => {
      const { data } = await getDetailOrderAPI(id);
      return data;
    },
    cacheTime: 0,
  });

  export const usePaysuccessData = (orderId) => {
    const queryClient = useQueryClient();
    const editOrderDetails = async (updatedData) => {
      await payOrderAPI(orderId, updatedData);
    };
  
    return useMutation({
      mutationFn: editOrderDetails,
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEY.ORDER);
        openNotificationWithIcon("success", "Edit Category Details Successfully");
      },
      onError: (error) => {
        console.error("Error updating product:", error);
        openNotificationWithIcon("error", "Failed to update category.");
      }
    });
  };
