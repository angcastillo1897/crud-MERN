import { useSelector } from "react-redux"
import { NavigationUsersDashboard } from "../components/NavigationUsersDashboard"
import { Outlet } from "react-router"
import { useFetchUser } from "../hooks/useFetchUser"
import { Spin , Button } from "antd"
import { logOut } from "../../Auth/authSlice"
import { useDispatch } from "react-redux"
import { LogOut } from "lucide-react"

const DashboardLayout = () => {
    const { isLoading, error } = useFetchUser();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const onLogOut = () => {
        dispatch(logOut());
    }
    
    if (isLoading) {
        return <Spin fullscreen />;
    }

    if (error) {
        return <p className="text-red-500">Error loading user data</p>;
    }

    return (
        <div className="min-h-screen bg-bkg p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-content">Dashboard</h1>
                    <div className="flex items-center gap-2">
                        <p className="text-content"> <span className="font-bold">Bienvenido,</span> {user.name}</p>
                        <Button type="primary" onClick={() => {onLogOut()}} shape="circle">
                            <LogOut className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
                <NavigationUsersDashboard userType={user.userType} />
                {
                    user.userType && (
                        <div className="bg-bkgCard rounded-lg shadow p-6" >
                            <Outlet />
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default DashboardLayout