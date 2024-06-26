import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/querryKey";
import { addToCartAPI, decreaseProductQuantityAPI, getDetailCartAPI, increaseProductQuantityAPI, removeCartItemFromCartAPI } from "../api/apiUrl";
import { openNotificationWithIcon } from "../components/notification/Notification";


export const useAddToCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['add-to-cart'],
        mutationFn: (newCart) => addToCartAPI(newCart.cartId, { productId: newCart.productId }),
        onSuccess: () => {
            queryClient.invalidateQueries([QUERY_KEY.CART]);
            openNotificationWithIcon("success", "Product added to cart successfully.");
        },
        onError: (error) => {
            const message = error.response?.data?.message || "Failed to add product to cart.";
            console.error('Error adding product to cart:', error);
            openNotificationWithIcon("error", message);
        }
    });
};


export const useGetOneCart = (id) => {
  return useQuery({
      queryKey: [QUERY_KEY.CART, id],
      queryFn: async () => {
          const { data } = await getDetailCartAPI(id);
          return data;
      },
      cacheTime: 0,
  });
};


export const useGetCartData = (id) => {
  return useQuery({
    queryKey: [QUERY_KEY.CART, id],
    queryFn: async () => {
      const response = await getDetailCartAPI(id);
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    onError: (error) => {
      console.error('Error fetching cart data:', error);
    },
    onLoadingSlow: () => {
      console.log('Fetching cart data is taking longer than expected...');
    },
  });
};

  export const useRemoveCartItemFromCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['remove-cart-item'],
        mutationFn: (cartItemId) => removeCartItemFromCartAPI(cartItemId),
        onSuccess: () => {
            queryClient.invalidateQueries([QUERY_KEY.CART]);
            openNotificationWithIcon("success", "Cart item removed successfully.");
        },
        onError: (error) => {
            console.error('Failed to remove cart item:', error);
            openNotificationWithIcon("error", "Failed to remove cart item.");
        }
    });
};


export const useIncreaseProductQuantity = () => {
  const queryClient = useQueryClient();
  return useMutation({
      mutationKey: ['increase-quantity'],
      mutationFn: (params) => increaseProductQuantityAPI(params.cartId, params.productId),
      onSuccess: () => {
          queryClient.invalidateQueries([QUERY_KEY.CART]);
          openNotificationWithIcon("success", "Product quantity increased successfully.");
      },
      onError: (error) => {
          console.error('Failed to increase product quantity:', error);
          openNotificationWithIcon("error", "Failed to increase product quantity.");
      }
  });
};

export const useDecreaseProductQuantity = () => {
  const queryClient = useQueryClient();
  return useMutation({
      mutationKey: ['decrease-quantity'],
      mutationFn: (params) => decreaseProductQuantityAPI(params.cartId, params.productId),
      onSuccess: () => {
          queryClient.refetchQueries([QUERY_KEY.CART]);
          openNotificationWithIcon("success", "Product quantity decreased successfully.");
      },
      onError: (error) => {
          console.error('Failed to decrease product quantity:', error);
          openNotificationWithIcon("error", "Failed to decrease product quantity.");
      }
  });
};
