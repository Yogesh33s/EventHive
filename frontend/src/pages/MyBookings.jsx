import { useEffect, useState } from "react";
import API from "../services/api";

function MyBookings() {

    const [bookings, setBookings] = useState([]);

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    useEffect(() => {

        fetchBookings();

    }, []);

    const fetchBookings = async () => {

        try {

            const response = await API.get(
                `/bookings/user/${user._id}`
            );

            setBookings(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="min-h-screen bg-black text-white p-10">

            <h1 className="text-5xl font-bold text-cyan-400 text-center mb-10">
                My Bookings
            </h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                {
                    bookings.map((booking) => (

                        <div
                            key={booking._id}
                            className="bg-gray-900 border border-cyan-500 rounded-2xl p-6"
                        >

                            <h2 className="text-3xl font-bold text-cyan-300 mb-4">
                                {booking.event?.title}
                            </h2>

                            <p className="text-gray-300 mb-3">
                                {booking.event?.location}
                            </p>

                            <img
                                src={booking.qrCode}
                                alt="QR Code"
                                className="rounded-xl"
                            />

                        </div>

                    ))
                }

            </div>

        </div>

    )

}

export default MyBookings;