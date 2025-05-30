import { useState, useRef } from "react";
import { createUser, loginUser, refreshToken } from "../api/users.jsx";
import Footer from "../components/Footer.jsx";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from 'react-spinners';;  //react loader spinner library
import { useStateContext } from "../context/authContext.jsx";
import { motion } from "framer-motion";
import { Home } from "lucide-react"; // Icon library for Home icon
const Register = () => {
  const { getUser } = useStateContext()
  const [fileName, setFileName] = useState("No avatar selected");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    image_url: null,
  });



  const handleChange = (event) => {
    setUser({
      ...user, [event.target.name]: event.target.value
    })
  }

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      setLoading(true)
      const formData = new FormData();
      formData.append("first_name", user.first_name);
      formData.append("last_name", user.last_name);
      formData.append("email", user.email);
      formData.append("password", user.password);
      if (user.image_url) {
        formData.append("image_url", user.image_url);
      }

      await createUser(formData)
      await loginUser({ email: user.email, password: user.password })
      await refreshToken()
      await getUser()
      navigate("/")
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const fileInputRef = useRef();

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setFileName(file.name)
      setUser({ ...user, image_url: file });
    } else {
      setFileName("No avatrar selected");
      setUser({ ...user, image_url: null });
    }
  };


  const inputStyle = "w-full px-4 py-2 rounded-md bg-zinc-800 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex flex-col"
  return (
    <section className="min-h-screen  bg-gradient-to-br from-indigo-950  via-black to-indigo-950 flex flex-col justify-center ">

      <main className="max-w-6xl  justify-center mx-auto lg:px-10 lg:my-2 md:gap-y-20 py-8 w-full  flex flex-grow flex-col-reverse md:flex-col  md:mt-10  lg:grid lg:grid-cols-2 items-center gap-10 z-20">
        {/* Left Text Content */}
        <motion.section
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-zinc-300 px-2 lg:px-0"
        >
          <section className="text-zinc-300 px-2 mx-auto lg:px-0 max">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-indigo-500">
              Welcome to Our Community!
            </h1>
            <p className="mb-6 leading-relaxed text-sm sm:text-base">
              Join us and enjoy exclusive benefits:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm sm:text-base">
              <li>Access personalized content tailored for you.</li>
              <li>Connect with like-minded people.</li>
              <li>Enjoy a seamless and secure experience.</li>
              <li>Get updates and special offers regularly.</li>
            </ul>
            <p className="mt-6 italic text-zinc-400 text-sm">
              We’re excited to have you on board. Let’s build something amazing together!
            </p>
          </section>
        </motion.section>
        {/* Form */}
        <motion.section
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          >
          <section className={`bg-zinc-900 xl:max-w-1xl relative border border-zinc-700 rounded-2xl shadow-2xl w-[310px] sm:w-sm md:w-xl max-w-lg mx-auto px-5 pb-7 pt-18 ${loading ? "opacity-90 pointer-events-none" : ""}`}>
             <Link
              to="/"
              className="inline-flex items-center absolute top-4 left-2 hover:bg-zinc-700 text-white/90 px-3 py-1.5 rounded-md transition-colors text-sm font-medium"
            >
              <Home size={25} strokeWidth={3} />
            </Link>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-semibold">
              <div>
                <label className="block text-sm text-zinc-300 mb-1">First Name</label>
                <input name="first_name" value={user.first_name} onChange={handleChange} placeholder="First name" type="text" className={inputStyle} />
              </div>
              <div>
                <label className="block text-sm text-zinc-300 mb-1">Last Name</label>
                <input name="last_name" value={user.last_name} onChange={handleChange} placeholder="Last name" type="text" className={inputStyle} />
              </div>
              <div>
                <label className="block text-sm text-zinc-300 mb-1">Email</label>
                <input name="email" value={user.email} onChange={handleChange} placeholder="Email" type="email" className={inputStyle} />
              </div>
              <div>
                <label className="block text-sm text-zinc-300 mb-1">Password</label>
                <input name="password" value={user.password} onChange={handleChange} placeholder="Password" type="password" className={inputStyle} />
              </div>
              <input name="image_url" type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
              <button type="button" onClick={handleClick} className={`${inputStyle} flex flex-start flex-row items-center text-sm`}>
                <span className="bg-indigo-600  text-nowrap py-1 px-3 rounded-lg text-white hover:bg-indigo-700">Upload Avatar</span>
                <span className="ml-2 truncate text-start text-xs lg:text-[1rem] font-light text-zinc-400 w-full">{fileName}</span>
              </button>
              {error && <p className="text-red-500 font-semibold text-sm">{error}</p>}
              <button type="submit" className="w-full h-10 flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md text-sm font-medium transition-colors">
                {loading ? <PulseLoader size={10} color="#fff" /> : "Register"}
              </button>
            </form>
            <p className="mt-6 text-center text-xs sm:text-sm text-zinc-400">
              You have an account? <Link to="/login" className="text-indigo-400 hover:underline">Login here</Link>
            </p>
          </section>
        </motion.section>
      </main>

      <footer className="w-full  py-4 z-10">
        <Footer />
      </footer>
    </section>

  );
}

export default Register;