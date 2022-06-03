// import react from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { UserAuth } from "./context/AuthContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./styles/Signup.css"
import { auth } from "./firebaseAuth";
import { useNavigate } from "react-router-dom";


const Signup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await createUser(email, password);
            navigate('/home')
        }
        catch (e) {
            setError(e.message)
            console.log(e.message)
        }
    };

    return (
        <div>
            <div className="signupDiv">
                <h1>Create your account</h1>
                <p>Already have an account?
                    <Link className="link" to='login'> Sign in </Link></p>

                <form className="signupForm" onSubmit={handleSubmit}>

                    <div className="labelDiv"><label>Email Address</label></div>
                    <div className="textDiv"><input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter Email"></input></div>
                    <div className="labelDiv"><label>Password</label></div>
                    <div className="textDiv"><input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter Password"></input></div>

                    <button className="signupBtn">Sign up</button>
                </form>
            </div>

        </div>
    )
}


export default Signup