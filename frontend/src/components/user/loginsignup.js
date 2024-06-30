import React, { Fragment, useRef, useState, useEffect } from "react";
import "./loginsignup.css";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import { CiMail } from "react-icons/ci";
import { CiUnlock } from "react-icons/ci";
import { CiFaceSmile } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/useractions";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginSignUp = ({ location }) => {
    const dispatch = useDispatch();
    
    const navigate = useNavigate();

    const { error, loading, isAuthenticated } = useSelector(
        (state) => state.user
    ) || {};

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const { name, email, password } = user;

    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword));
    };

    const registerSubmit = (e) => {
        e.preventDefault();
        dispatch(register(name , email , password ));
    };

    const registerDataChange = (e) => {
        
        setUser({ ...user, [e.target.name]: e.target.value });
        
    };

    
    const redirect = location?.search ? location.search.split("=")[1] : "/account";

    useEffect(() => {
        if (error) {
            toast(error);
            dispatch(clearErrors());
        }

        if (isAuthenticated) {
            navigate("/shipping");
        }
    }, [dispatch, error, navigate, isAuthenticated, redirect]);

    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current?.classList.add("shiftToNeutral");
            switcherTab.current?.classList.remove("shiftToRight");

            registerTab.current?.classList.remove("shiftToNeutralForm");
            loginTab.current?.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
            switcherTab.current?.classList.add("shiftToRight");
            switcherTab.current?.classList.remove("shiftToNeutral");

            registerTab.current?.classList.add("shiftToNeutralForm");
            loginTab.current?.classList.add("shiftToLeft");
        }
    };
    

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <div className="LoginSignUpContainer">
                        <div className="LoginSignUpBox">
                            <div>
                                <div className="login_signUp_toggle">
                                    <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                                    <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                                </div>
                                <button ref={switcherTab}></button>
                            </div>
                            <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                                <div className="loginEmail">
                                    <CiMail />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                    />
                                </div>
                                <div className="loginPassword">
                                    <CiUnlock />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        required
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                    />
                                </div>
                                <Link to="/password/forgot">Forget Password ?</Link>
                                <input type="submit" value="Login" className="loginBtn" />
                            </form>
                            <form
                                className="signUpForm"
                                ref={registerTab}
                                onSubmit={registerSubmit}
                            >
                                <div className="signUpName">
                                    <CiFaceSmile />
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        required
                                        name="name"
                                        value={name}
                                        onChange={registerDataChange}
                                    />
                                </div>
                                <div className="signUpEmail">
                                    <CiMail />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        name="email"
                                        value={email}
                                        onChange={registerDataChange}
                                    />
                                </div>
                                <div className="signUpPassword">
                                    <CiUnlock />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        required
                                        name="password"
                                        value={password}
                                        onChange={registerDataChange}
                                    />
                                </div>
                                <input type="submit" value="Register" className="signUpBtn" />
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default LoginSignUp;