import "./styles/Signup.css"
import { auth } from "./firebaseAuth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";


const Signup = () => {
    const initialValues = { email: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [, setIsSubmit] = useState(false);
    const navigate = useNavigate()

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        try {
            await createUser(formValues.email, formValues.password);
            navigate('/home')
        }
        catch (e) {
            setIsSubmit(false);
        }
    };


    const validate = (values) => {
        const errors = {};
        const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const regexPass = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!regexMail.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }
        if (!values.password) {
            errors.password = "Password is required";
        } else if (!regexPass.test(values.password)) {
            errors.password = "This is not a valid email format!";
        }
        return errors;
    };


    return (
        <div>
            <div className="signupDiv">
                <h1>Create your account</h1>
                <p>Already have an account?
                    <Link className="link" to='login'> Sign in </Link></p>

                <form className="signupForm" onSubmit={handleSubmit}>

                    <div className="labelDiv"><label>Email Address</label></div>
                    <div className="textDiv"><input onChange={handleChange} value={formValues.email} type="email" name="email" placeholder="Enter Email"></input></div>
                    <span className="errorMessage">{formErrors.email}</span>
                    <div className="labelDiv"><label>Password</label></div>
                    <div className="textDiv"><input onChange={handleChange} value={formValues.password} type="password" name="password" placeholder="Enter Password"></input></div>
                    <span className="errorMessage">{formErrors.password}</span>

                    <button className="signupBtn">Sign up</button>
                </form>
            </div>

        </div>
    )
}


export default Signup