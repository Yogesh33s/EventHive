import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const [events, setEvents] = useState([]);

    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {

        fetchEvents();

    }, []);

    const fetchEvents = async () => {

        try {

            const response = await API.get("/events");

            setEvents(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const handleBooking = async (event) => {

        try {

            const participants = prompt("Enter number of participants");

            if (!participants) return;

            const totalAmount = event.ticketPrice * participants;

            const confirmBooking = window.confirm(
                `Total Amount: ₹${totalAmount}\nConfirm Booking?`
            );

            if (!confirmBooking) return;

            const response = await API.post(
                "/bookings/create",
                {
                    user: user._id,
                    event: event._id,
                    participants,
                    totalAmount
                }
            );

            setSuccessMessage(response.data.message);

            setTimeout(() => {

                setSuccessMessage("");

                navigate("/my-bookings");

            }, 2000);

        } catch (error) {

            console.log(error);

        }

    };

    const handleDelete = async (eventId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this event?"
        );

        if (!confirmDelete) return;

        try {

            await API.delete(`/events/${eventId}`);

            fetchEvents();

        } catch (error) {

            console.log(error);

        }

    };

    const handleEdit = async (event) => {

        const title = prompt(
            "Edit Event Title",
            event.title
        );

        if (!title) return;

        const description = prompt(
            "Edit Description",
            event.description
        );

        const location = prompt(
            "Edit Location",
            event.location
        );

        const ticketPrice = prompt(
            "Edit Ticket Price",
            event.ticketPrice
        );

        try {

            await API.put(`/events/${event._id}`, {
                title,
                description,
                location,
                ticketPrice
            });

            fetchEvents();

        } catch (error) {

            console.log(error);

        }

    };

    const handleLogout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        navigate("/login");

    };

    return (

        <div className="min-h-screen bg-black text-white p-10">

            {
                successMessage && (

                    <div className="fixed top-5 right-5 bg-green-500 text-black px-6 py-3 rounded-xl font-bold shadow-lg z-50">

                        {successMessage}

                    </div>

                )
            }

            <div className="flex justify-between items-center mb-10">

                <div>

                    <h1 className="text-5xl font-bold text-cyan-400">
                        EventHive
                    </h1>

                    <p className="text-gray-400 mt-3 text-xl">
                        Welcome, {user?.name}
                    </p>

                </div>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 px-5 py-3 rounded-xl text-white font-bold"
                >
                    Logout
                </button>

            </div>

            {
                user?.role === "organizer" && (

                    <div className="flex justify-center mb-10">

                        <a
                            href="/create-event"
                            className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl text-black font-bold"
                        >
                            + Create Event
                        </a>

                    </div>

                )
            }

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                {
                    events.map((event) => (

                        <div
                            key={event._id}
                            className="relative bg-gray-900 border border-cyan-500 rounded-2xl p-6 shadow-lg hover:scale-105 transition"
                        >

                            {
                                user?.role === "organizer" && (

                                    <div className="absolute top-4 right-4 flex gap-3">

                                        <button
                                            onClick={() => handleEdit(event)}
                                            className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded-lg font-bold"
                                        >
                                            ✏
                                        </button>

                                        <button
                                            onClick={() => handleDelete(event._id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg font-bold"
                                        >
                                            🗑
                                        </button>

                                    </div>

                                )
                            }

                            <h2 className="text-3xl font-bold text-cyan-300 mb-4">
                                {event.title}
                            </h2>

                            <p className="text-gray-300 mb-2">
                                {event.description}
                            </p>

                            <p className="text-gray-400">
                                📍 {event.location}
                            </p>

                            <p className="text-green-400 text-2xl font-bold mt-4">
                                ₹ {event.ticketPrice}
                            </p>

                            <button
                                onClick={() => handleBooking(event)}
                                className="mt-6 bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-xl text-black font-bold"
                            >
                                Book Ticket
                            </button>

                        </div>

                    ))
                }

            </div>

        </div>

    )

}

export default Home;