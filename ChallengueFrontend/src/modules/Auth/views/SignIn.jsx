import { SignInForm } from "../components/SignInForm"

const SignIn = () => {
    return (
        <>
            <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-content">
                    Iniciar sesión
                </h2>
                <p className="mt-2 text-sm text-content">
                    Porfavor ingresa con tu cuenta
                </p>
            </div>
            <SignInForm />
        </>
    )
}
export default SignIn;