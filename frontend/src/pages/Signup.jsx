import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Signup() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "user"
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
                "/auth/signup",
                formData
            );

            alert(response.data.message);

            navigate("/login");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Signup Failed"
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
                    Signup
                </h1>

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    className="w-full p-4 rounded-xl bg-gray-200 text-black mb-6 outline-none"
                />

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
                    className="w-full p-4 rounded-xl bg-black border border-gray-700 mb-6 outline-none"
                />

                <select
                    name="role"
                    onChange={handleChange}
                    className="w-full p-4 rounded-xl bg-black border border-gray-700 mb-8 outline-none"
                >

                    <option value="user">
                        User
                    </option>

                    <option value="organizer">
                        Organizer
                    </option>

                </select>

                <button
                    type="submit"
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-4 rounded-2xl text-2xl"
                >
                    Signup
                </button>

                <p className="text-center text-gray-400 mt-6">

                    Already have an account?

                    <Link
                        to="/login"
                        className="text-cyan-400 ml-2 hover:text-cyan-300"
                    >
                        Login
                    </Link>

                </p>

            </form>

        </div>

    )

}

export default Signup;