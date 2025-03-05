import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo.png';
import g from './g.png';
import github from './github.png';
import './Login.css';

export default function StudentLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch("http://localhost:8080/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
    
            if (response.ok) {
                const message = await response.text();
                alert(message);
                if (message.includes("Student")) {
                    navigate("/student-landing");
                } else if (message.includes("Reviewer")) {
                    navigate("/reviewer-landing");
                }
            } else {
                const error = await response.text();
                alert(error);
            }
        } catch (err) {
            alert("Error connecting to the server. Please try again later.");
        }
    };
    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleSignupForm = () => {
        setShowSignup(!showSignup);
    };

    return (
        <>
            <section className="container">
                <div className="form">
                    <div className="form-content">
                        <div className="logo-container">
                            <img src={Logo} alt="Logo" />
                        </div>
                        {/* <header>login</header> */}
                        <form onSubmit={handleLogin}>
                            <div className="field input-field">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input"
                                />
                            </div>
                            <div className="field input-field">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="password"
                                />
                                <i className={`bx ${showPassword ? "bx-show" : "bx-hide"} eye-icon`} onClick={togglePasswordVisibility}></i>
                            </div>
                            <div className="form-link">
                                <a href="/" className="forgot-pass">Forgot password?</a>
                            </div>
                            <div className="field button-field">
                                <button type="submit">login</button>
                            </div>
                        </form>
                        
                    </div>
                    <div className="line"></div>
                    <div className="media-options">
                        <a href="/" className="field google">
                            <img src={g} alt="" className="google-img" />
                            <span>Login with Google</span>
                        </a>
                    </div>
                    <div className="media-options">
                        <a href="/" className="field github">
                            <img src={github} alt="" className="github-img" />
                            <span>Login with GitHub</span>
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}

