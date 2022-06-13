import "./styles/Login.css"
import { UserAuth } from "./context/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";


function Login() {
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const { signIn } = UserAuth();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    try {
      await signIn(formValues.email, formValues.password)
      navigate('/home')
    } catch (e) {
      setIsSubmit(false);
    }
  };


  useEffect(() => {
    if (Object.keys(formErrors).length === 0) {
    }
  },[formErrors]);

  const validate = (values) => {
    const errors = {};
    const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regexPass =  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
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
      <div className="loginDiv">
        <h1>Sign in your account</h1>
        <p>Don't have an account?
          <Link className="link" to='/'> Sign up </Link></p>

        <form onSubmit={handleSubmit} className="loginForm">
          <div className="loginLabelDiv"><label>Email Address</label></div>
          <div className="loginTextDiv"><input
            type="text"
            name="email"
            placeholder="Enter Email"
            value={formValues.email}
            onChange={handleChange}
          /></div>
          <span className="errorMessage">{formErrors.email}</span>
          <div className="loginLabelDiv"><label>Password</label></div>
          <div className="loginTextDiv"><input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formValues.password}
            onChange={handleChange}
          /></div>
          <span className="errorMessage">{formErrors.password}</span>
          <button className="loginBtn">Log In</button>
        </form>
      </div>
  )
}

export default Login