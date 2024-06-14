import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/layout/Header";
import Input from "../../components/common/MUI-themed/Input";
import "./Entry.css";

const Entry = () => {
    let navigate = useNavigate();

    const [loginTab, setLoginTab] = useState(true);
    const [loading, setLoading] = useState(false);

    const [usernames, setUsernames] = useState("");
    const [passwords, setPasswords] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const loginUser = async () => {
        try {
            const response = await axios.post("http://localhost:4000/api/auth/login", {
                username: usernames,
                password: passwords,
            });
            localStorage.setItem("token", response.data.token);
            navigate("/home");
        } catch (error) {
            setError(error.response.data.error);
        }
        setLoading(false);
    };

    const registerUser = async () => {
        try {
            await axios.post("http://localhost:4000/api/auth/register", {
                username: usernames,
                password: passwords,
                email: email,
            });
            setLoginTab(true); // Switch to login tab after successful registration
        } catch (error) {
            setError(error.response.data.error);
        }
        setLoading(false);
    };

    useEffect(() => {
        setError(""); // Clear error message on tab switch
        const form = document.getElementById("form");
        form.reset();
        setLoading(false);
    }, [loginTab]);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/home"); // Redirect to home if token exists
        }
    }, [navigate]);

    return (
        <>
            <Header loggedIn={false} loginTab={loginTab} setLoginTab={setLoginTab} />
            <div className="flex justify-center items-center page-template entry">
                <form
                    id="form"
                    className="card"
                    onSubmit={async (e) => {
                        e.preventDefault();
                        setLoading(true);
                        if (loginTab) {
                            loginUser();
                        } else {
                            registerUser();
                        }
                    }}
                    autoComplete="off"
                >
                    <h2 className="text-center mt-8 card-title">
                        {loginTab ? "Log In" : "Sign Up"}
                    </h2>
                    <div className="card-body">
                        <div className="mb-6">
                            <Input
                                label="Username"
                                type="text"
                                val={usernames}
                                setVal={setUsernames}
                                className="w-full"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <Input
                                label="Password"
                                type="password"
                                val={passwords}
                                setVal={setPasswords}
                                className="w-full"
                                required
                            />
                        </div>
                        {!loginTab && (
                            <div className="mb-6">
                                <Input
                                    label="Email"
                                    type="email"
                                    val={email}
                                    setVal={setEmail}
                                    className="w-full"
                                    required
                                />
                            </div>
                        )}
                        {error && (
                            <div className="text-red-500 text-end text-sm err-msg">
                                {error}
                            </div>
                        )}
                        <div>
                            <button className="w-full btn-primary" disabled={loading}>
                                {loginTab ? "Enter" : "Join"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

Entry.defaultProps = {
    loginTab: true,
};

export default Entry;
