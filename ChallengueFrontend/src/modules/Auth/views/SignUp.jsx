import { SignUpForm } from "../components/SignUpForm"

const SignUp = () => {
    return (
        <>
            <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-content">
                    Crea tu cuenta
                </h2>
                <p className="mt-2 text-sm text-content">
                    Únete para empezar
                </p>
            </div>
            <SignUpForm />
        </>
    )
}

export default SignUp