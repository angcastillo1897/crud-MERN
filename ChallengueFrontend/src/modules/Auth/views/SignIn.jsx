import { SignInForm } from "../components/SignInForm"

export const SignIn = () => {
    return (
        <>
            <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                    Iniciar sesión
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                    Porfavor ingresa con tu cuenta
                </p>
            </div>
            <SignInForm />
        </>
    )
}