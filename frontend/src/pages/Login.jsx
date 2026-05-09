import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await API.post(
                "/auth/login",
                formData
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            alert("Login Successful");

            navigate("/");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Login Failed"
            );

        }

    };

    return (

        <div className="min-h-screen bg-black flex items-center justify-center text-white">

            <form
                onSubmit={handleSubmit}
                className="bg-gray-900 border border-cyan-500 p-10 rounded-2xl w-[550px]"
            >

                <h1 className="text-5xl font-bold text-cyan-400 text-center mb-10">
                    Login
                </h1>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="w-full p-4 rounded-xl bg-gray-200 text-black mb-6 outline-none"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="w-full p-4 rounded-xl bg-black border border-gray-700 mb-3 outline-none"
                />

                <div className="flex justify-end mb-6">

                    <Link
                        to="/forgot-password"
                        className="text-cyan-400 hover:text-cyan-300 text-sm"
                    >
                        Forgot Password?
                    </Link>

                </div>

                <button
                    type="submit"
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-4 rounded-2xl text-2xl"
                >
                    Login
                </button>

                <p className="text-center text-gray-400 mt-6">

                    Don’t have an account?

                    <Link
                        to="/signup"
                        className="text-cyan-400 ml-2 hover:text-cyan-300"
                    >
                        Sign Up
                    </Link>

                </p>

            </form>

        </div>

    )

}

export default Login;