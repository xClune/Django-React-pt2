
import Header from "../components/Header"
import LoginForm from "../components/LoginForm"

function Register() {

    return (
        <>
            <Header />
            <LoginForm route="/api/user/register/" method="register" />
        </>
    
    )
}

export default Register