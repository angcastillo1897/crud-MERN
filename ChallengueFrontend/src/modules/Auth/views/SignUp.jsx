import { SignUpForm } from "../components/SignUpForm"

export const SignUp = () => {
    return (
        <>
            <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                    Crea tu cuenta
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                    Únete para empezar
                </p>
            </div>
            <SignUpForm />
        </>
    )
}
