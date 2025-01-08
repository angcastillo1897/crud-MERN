import { BrowserRouter, Routes, Route , Navigate } from "react-router";
import { useSelector } from "react-redux";
import { lazy, Suspense } from "react";
import { selectCurrentToken,selectCurrentUser } from "../modules/Auth/authSlice";
import AuthProtectedRoute from './AuthProtectedRoute';
import AdminProtectedRoute from "./AdminProtectedRoute";

// added lazy loading to components routes
const Dashboard2 = lazy(() => import("../modules/Users/views/Dashboard2"));
const AuthLayout = lazy(() => import("../modules/Auth/layouts/AuthLayout"));
const SignIn = lazy(() => import("../modules/Auth/views/SignIn"));
const SignUp = lazy(() => import("../modules/Auth/views/SignUp"));
const DashboardLayout = lazy(() => import("../modules/Users/layouts/DashboardLayout"));
const Dashboard1 = lazy(() => import("../modules/Users/views/Dashboard1"));

export const AppRouter = () => {
    const isAuthenticated = useSelector(selectCurrentToken);
    const user = useSelector(selectCurrentUser);
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Cargando...</div>}>
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
            </Suspense>
        </BrowserRouter>
    )
}