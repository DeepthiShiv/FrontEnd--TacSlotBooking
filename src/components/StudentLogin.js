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

    const handleLogin = (e) => {
        e.preventDefault();
        if (email.includes('@bitsathy.ac.in')) {
            if (email.match(/\.[a-z]{2}[0-9]{2}@bitsathy\.ac\.in$/)) {
                navigate('/student-landing');
            } else {
                navigate('/reviewer-landing');
            }
        } else {
            alert('Invalid email address');
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

