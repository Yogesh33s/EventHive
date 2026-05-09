import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const handleLogout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        navigate("/login");

    };

    return (

        <div className="bg-gray-900 border-b border-cyan-500 px-10 py-5 flex justify-between items-center">

            <Link
                to="/"
                className="text-3xl font-bold text-cyan-400"
            >
                EventHive
            </Link>

            <div className="flex gap-5 items-center">

                <Link
                    to="/"
                    className="hover:text-cyan-400"
                >
                    Home
                </Link>

                <Link
                    to="/my-bookings"
                    className="hover:text-cyan-400"
                >
                    My Bookings
                </Link>

                {
                    user?.role === "organizer" && (

                        <Link
                            to="/create-event"
                            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-xl text-black font-bold"
                        >
                            Create Event
                        </Link>

                    )
                }

                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl font-bold"
                >
                    Logout
                </button>

            </div>

        </div>

    )

}

export default Navbar;