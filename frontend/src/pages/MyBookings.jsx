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

            {
                user?.role === "organizer"
                ?
                (

                    <table className="w-full border border-cyan-500 rounded-2xl overflow-hidden">

                        <thead className="bg-cyan-500 text-black">

                            <tr>

                                <th className="p-4">
                                    User Email
                                </th>

                                <th className="p-4">
                                    Event
                                </th>

                                <th className="p-4">
                                    Participants
                                </th>

                                <th className="p-4">
                                    Payment
                                </th>

                                <th className="p-4">
                                    Ticket
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                bookings.map((booking) => (

                                    <tr
                                        key={booking._id}
                                        className="text-center border-t border-cyan-500 bg-gray-900"
                                    >

                                        <td className="p-4">
                                            {booking.user?.email}
                                        </td>

                                        <td className="p-4">
                                            {booking.event?.title}
                                        </td>

                                        <td className="p-4">
                                            {booking.participants}
                                        </td>

                                        <td className="p-4 text-green-400 font-bold">
                                            ₹ {booking.totalAmount}
                                        </td>

                                        <td className="p-4 text-green-400 font-bold">
                                            ✅ Confirmed
                                        </td>

                                    </tr>

                                ))
                            }

                        </tbody>

                    </table>

                )
                :
                (

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
                                        📍 {booking.event?.location}
                                    </p>

                                    <p className="text-green-400 font-bold mb-2">
                                        Participants: {booking.participants}
                                    </p>

                                    <p className="text-green-400 font-bold mb-5">
                                        Amount Paid: ₹ {booking.totalAmount}
                                    </p>

                                    <img
                                        src={booking.qrCode}
                                        alt="QR Code"
                                        className="rounded-xl"
                                    />

                                    <p className="text-green-400 font-bold text-center mt-4 text-xl">
                                        ✅ Ticket Confirmed
                                    </p>

                                </div>

                            ))
                        }

                    </div>

                )
            }

        </div>

    )

}

export default MyBookings;