import { BrowserRouter, Routes, Route , Navigate } from "react-router";
import AuthProtectedRoute from './AuthProtectedRoute';
import { SignIn } from "../modules/Auth/views/SignIn";
import { SignUp } from "../modules/Auth/views/SignUp";
import { DashboardLayout } from "../modules/Users/layouts/DashboardLayout";
import { Dashboard1 } from "../modules/Users/views/Dashboard1";
import { Dashboard2 } from "../modules/Users/views/Dashboard2";
import { AuthLayout } from "../modules/Auth/layouts/AuthLayout";

import { useSelector } from "react-redux";
import { selectCurrentToken,selectCurrentUser } from "../modules/Auth/authSlice";
import AdminProtectedRoute from "./AdminProtectedRoute";

export const AppRouter = () => {
    const isAuthenticated = useSelector(selectCurrentToken);
    const user = useSelector(selectCurrentUser);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AuthLayout />}>
                    <Route index element={<SignIn/>} />
                    <Route path="register" element={<SignUp />} />
                </Route>
                <Route path="/users" element={<AuthProtectedRoute element={<DashboardLayout />} isAuthenticated={isAuthenticated ? true : false} />} >
                    <Route index path="dashboard_1" element={<Dashboard1 />} />
                    <Route path="dashboard_2" element={<AdminProtectedRoute isAuthenticated={isAuthenticated ? true : false} isAdmin={user?.userType === 'ADMIN' ? true : false} element={<Dashboard2 />}
                    />  } />
                </Route>
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    )
}