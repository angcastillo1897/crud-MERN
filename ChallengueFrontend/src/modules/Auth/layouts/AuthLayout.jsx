import { Outlet } from "react-router"
const AuthLayout = () => {
    return (
        <div className="min-h-screen flex">
            <div className="hidden lg:block lg:w-1/2 relative">
                <img
                src={"https://images.unsplash.com/photo-1554200876-56c2f25224fa?auto=format&fit=crop&q=80"}
                alt="Office worspace"
                className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/20" />
            </div>
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-16 bg-bkg">
                <div className="w-full max-w-md space-y-8">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AuthLayout

