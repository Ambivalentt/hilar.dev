// UserDetails.jsx
import { format } from "date-fns";
import { useStateContext } from "../../context/authContext.jsx";


const AllUserDetails = () => {
    const { user, loading } = useStateContext();
    
  if (loading) {
        return <p className="text-white text-center mt-10">Loading user...</p>;
    }

    if (!user) {
        return <p className="text-white text-center mt-10">User not found</p>;
    }
    const { first_name, last_name, email, created_at, role, image_url, id } = user;
    const name = `${first_name} ${last_name}`;
    return (
        <section className="bg-slate-800 p-6 rounded-2xl shadow-lg text-white max-w-3xl mx-auto space-y-4">
            <h2 className="text-2xl font-bold mb-4">User Details</h2>

            <div className="flex items-center gap-4 flex-col sm:flex-row">
                <img
                    src={image_url || 'https://res.cloudinary.com/stackover/image/upload/v1748493790/defaultUser_a0mokq.jpg'}
                    alt="User Avatar"
                    className="w-20 h-20 rounded-full border-2 border-white object-cover"
                />
                <div className="">
                    <h3 className="text-xl font-semibold">{name}</h3>
                    <p className="text-gray-300">{email}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mt-6">
                <div>
                    <span className="text-gray-400">Role:</span>
                    <p className="text-white">{role}</p>
                </div>
                <div>
                    <span className="text-gray-400">id:</span>
                    <p className="text-white">#{id}</p>
                </div>
                <div>
                    <span className="text-gray-400">Member Since:</span>
                    <p className="text-white">{format(new Date(created_at), "dd/MM/yyyy")}</p>
                </div>
            </div>
        </section>
    );
};

export default AllUserDetails;
