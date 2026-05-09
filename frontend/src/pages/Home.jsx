import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const [events, setEvents] = useState([]);

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

    const handleBooking = async (eventId) => {

        try {

            const userId = prompt("Enter User ID");

            const response = await API.post(
                "/bookings/create",
                {
                    user: userId,
                    event: eventId
                }
            );

            alert(response.data.message);

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
                            className="bg-gray-900 border border-cyan-500 rounded-2xl p-6 shadow-lg hover:scale-105 transition"
                        >

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
                                onClick={() => handleBooking(event._id)}
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