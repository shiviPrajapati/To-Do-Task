// import react from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { UserAuth } from "./context/AuthContext";
import "./styles/Login.css"

function Login () {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()
    const{signIn} = UserAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('')
        try{
            await signIn(email, password)
            navigate('/home')
        }catch (e) {
            setError(e.message)
            console.log(e.message)
        }
    }

    return (
        <div>
            <div className="loginDiv">
                <h1>Sign in your account</h1>
                <p>Don't have an account?
                    <Link className="link" to='/'> Sign up </Link></p>

                <form onSubmit={handleSubmit} className="loginForm">
                    <div className="loginLabelDiv"><label>Email Address</label></div>
                    <div className="loginTextDiv"><input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email"></input></div>
                    <div className="loginLabelDiv"><label>Password</label></div>
                    <div className="loginTextDiv"><input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password"></input></div>
                    <button className="loginBtn">Login in</button>
                </form>
            </div>            
        </div>
    )
}

export default Login