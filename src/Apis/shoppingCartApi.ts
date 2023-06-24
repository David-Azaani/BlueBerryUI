import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const shoppingCartApi = createApi({
  reducerPath: "shoppingCartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5276/api/",
    prepareHeaders: (headers: Headers, api) => {
      const token = localStorage.getItem("token");
      token && headers.append("Authorization", "Bearer " + token);
    },
  }),
  tagTypes: ["ShoppingCarts"],
  endpoints: (builder) => ({
    getShoppingCart: builder.query({
      query: (userId) => ({
        url: `shoppingcart`,
        params: {
          userId: userId,
        },
      }),
      providesTags: ["ShoppingCarts"],
    }),
    updateShoppingCart: builder.mutation({
      query: ({ menuItemId, updatedQuantity, userId }) => ({
        url: `shoppingcart`,
        method: "POST",
        params: {
          menuItemId, //we dont assing entries to these because the name of these are compeletely the same as api,othwerwise we have to assign th xxx:xxcsd
          updatedQuantity,
          userId,
        },
      }),
      invalidatesTags: ["ShoppingCarts"],
    }),
  }),
});

export const { useGetShoppingCartQuery,useUpdateShoppingCartMutation } = shoppingCartApi;
export default shoppingCartApi;
