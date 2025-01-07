import { useDispatch } from "react-redux";
import { useLazyGetUserQuery } from "../usersApiSlice";
import { useEffect, useState } from "react";
import { setUser } from "../../Auth/authSlice";

export const useFetchUser = () => {
    const [fetchUser] = useLazyGetUserQuery();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            setIsLoading(true);
            try {
                const user = await fetchUser().unwrap();
                console.log('userData', user);
                dispatch(setUser({ user }));
            } catch (error) {
                console.log('error', error);
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };
        getUser();
    }, [dispatch, fetchUser]);

    return { isLoading, error };
};