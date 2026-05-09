import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        newPassword: ""
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

            const response = await API.put(
                "/auth/forgot-password",
                formData
            );

            alert(response.data.message);

            navigate("/login");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Something went wrong"
            );

        }

    };

    return (

        <div className="min-h-screen bg-black flex items-center justify-center text-white">

            <form
                onSubmit={handleSubmit}
                className="bg-gray-900 border border-cyan-500 p-10 rounded-2xl w-[550px]"
            >

                <h1 className="text-4xl font-bold text-cyan-400 text-center mb-10">
                    Reset Password
                </h1>

                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    onChange={handleChange}
                    className="w-full p-4 rounded-xl bg-gray-200 text-black mb-6 outline-none"
                />

                <input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    onChange={handleChange}
                    className="w-full p-4 rounded-xl bg-black border border-gray-700 mb-8 outline-none"
                />

                <button
                    type="submit"
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-4 rounded-2xl text-2xl"
                >
                    Change Password
                </button>

            </form>

        </div>

    )

}

export default ForgotPassword;