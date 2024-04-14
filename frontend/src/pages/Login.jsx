import LoginForm from "../components/LoginForm.jsx"
import Header from "../components/Header"

function Login() {
    return (
    <>
        <Header />
        <LoginForm route="/api/token/" method="login" />
    </>
    )
}

export default Login