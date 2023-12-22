import React, {useState} from 'react';
import { signin, authenticate} from '../../Backend';
import { Navigate } from 'react-router-dom'; 

// Signin component for the login form
export function Signin(){

    // Initializing states for form fields, error, loading, and success messages
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        success: false,
    });

    // Destructuring values from the state
    const { email, password, error, loading, success } = values;
    
    // Handles changes in the input fields
    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    }

    // Submits the form data to the backend for user authentication
    const onSubmit = async event => {
        event.preventDefault();
        setValues({ ...values, success: false, loading: true });
        signin({ email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false, success: false });
                } else {
                    authenticate(data, () => {
                        setValues({ ...values, success: true });
                    })
                }
            })
            .catch();
    }

    // Displays error message if there's any
    const errorMessage = () => {
        return (<div className='error-message' style={{ display: error ? "" : "none", color: "red" }}>
            {error}
        </div>);
    }

    // Displays loading message during form submission
    const loadingMessage = () => {
        return (
            loading && (
                <div className="loading-message" style={{ display: error ? "" : "none", color: "red" }}>
                    <div className="loading-spinner"></div>
                    <p>Loading...</p>
                </div>
            )
        );
    }


    return (
        success ? <Navigate to="/" /> :
            <div className='form-container'>
                <div className='form-box'>
                    <h2>Signin</h2>
                    {loadingMessage()}
                    {errorMessage()}
                    <div className='form-group'>
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" name="email" value={email} onChange={handleChange("email")} required />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" value={password} onChange={handleChange("password")} required />
                    </div>
                    <div className="form-group-button">
                        <button onClick={onSubmit}>Log in</button>
                    </div>
                    <div className='login-message'>
                        <center><p className='login_redirect mt-2'>Don't have an account?<b><a href='/signup'> Signup here</a></b></p></center>
                    </div>
                </div>
            </div>
    )
}

export default Signin;
