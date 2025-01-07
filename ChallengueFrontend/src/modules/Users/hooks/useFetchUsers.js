import { useDispatch, useSelector } from "react-redux";
import { useLazyGetUsersQuery } from "../usersApiSlice";
import { useEffect, useCallback } from "react";
import { setUsersResponseInfo, setUsersLoading, setPagination } from "../usersSlice";

export const useFetchUsers = () => {
    const [fetchUsers] = useLazyGetUsersQuery();
    const dispatch = useDispatch();
    const usersResponse = useSelector(state => state.users.usersResponse);
    const { page, limit, fullNameFilter } = usersResponse;

    const getUsers = useCallback(async (page, limit, fullNameFilter) => {
        dispatch(setUsersLoading(true));
        try {
            const queryObj = { page, limit, fullNameFilter }

            const response = await fetchUsers(queryObj).unwrap();
            // console.log("response", response);

            dispatch(setUsersResponseInfo(response));
        } catch (error) {
            console.error('Error fetching users:', error);
            if (error?.status === 404) {
                dispatch(setUsersResponseInfo({ users: [], total: 0 }));
            }
        } finally {
            dispatch(setUsersLoading(false));
        }
    }, [dispatch, fetchUsers]);

    useEffect(() => {
        getUsers(page, limit, fullNameFilter);
    }, [page, limit, fullNameFilter, getUsers]);

    const refetchUsersByQueryParams = (newPage, newLimit, newfullNameFilter) => {
        // console.log('refetchUsers', newPage, newLimit, newfullNameFilter);
        dispatch(setPagination({ page: newPage, limit: newLimit, fullNameFilter: newfullNameFilter }));
        // getUsers();
    };

    return { ...usersResponse, refetchUsersByQueryParams, getUsers };
};