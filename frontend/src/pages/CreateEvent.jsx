import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function CreateEvent() {

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        location: "",
        ticketPrice: ""
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
                "/events/create",
                {
                    ...formData,
                    organizer: user._id
                }
            );

            alert(response.data.message);

            navigate("/");

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="min-h-screen bg-black flex items-center justify-center text-white">

            <form
                onSubmit={handleSubmit}
                className="bg-gray-900 border border-cyan-500 p-10 rounded-2xl w-[500px]"
            >

                <h1 className="text-4xl font-bold text-cyan-400 text-center mb-8">
                    Create Event
                </h1>

                <input
                    type="text"
                    name="title"
                    placeholder="Event Title"
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-black border border-gray-700 mb-5"
                />

                <textarea
                    name="description"
                    placeholder="Event Description"
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-black border border-gray-700 mb-5"
                />

                <input
                    type="text"
                    name="date"
                    placeholder="Event Date"
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-black border border-gray-700 mb-5"
                />

                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-black border border-gray-700 mb-5"
                />

                <input
                    type="number"
                    name="ticketPrice"
                    placeholder="Ticket Price"
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-black border border-gray-700 mb-5"
                />

                <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 rounded-xl"
                >
                    Create Event
                </button>

            </form>

        </div>

    )

}

export default CreateEvent;