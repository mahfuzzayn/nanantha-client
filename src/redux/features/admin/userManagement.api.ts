import { IUser } from "../../../types";
import { TQueryParam, TResponseRedux } from "../../../types/global";
import { baseApi } from "../../api/baseApi";


const userManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: "/users",
                    method: "GET",
                    params,
                };
            },
            transformResponse: (response: TResponseRedux<IUser[]>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
            providesTags: ["users"],
        }),
        deactivateUser: builder.mutation({
            query: (args) => {
                return {
                    url: `/users/change-status/${args.userId}`,
                    method: "POST",
                    body: args.data,
                };
            },
            invalidatesTags: ["users"],
        }),
    }),
});

export const { useGetAllUsersQuery, useDeactivateUserMutation } =
    userManagementApi;
