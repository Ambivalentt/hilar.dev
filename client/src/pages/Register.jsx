import { useState, useRef } from "react";
import { createUser, loginUser, refreshToken } from "../api/users.jsx";
import Footer from "../components/Footer.jsx";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from 'react-spinners';;  //react loader spinner library
import { useStateContext } from "../context/authContext.jsx";
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
    <section className="min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-800 flex flex-col justify-center ">
      {/* Wave Top */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="w-full absolute top-0 left-0 drop-shadow-sm drop-shadow-indigo-500/50"
      >
        <path
          fill="#18181b"
          d="M0,320L15,288C30,256,60,192,90,176C120,160,150,192,180,224C210,256,240,288,270,266.7C300,245,330,171,360,144C390,117,420,139,450,165.3C480,192,510,224,540,245.3C570,267,600,277,630,266.7C660,256,690,224,720,192C750,160,780,128,810,117.3C840,107,870,117,900,128C930,139,960,149,990,170.7C1020,192,1050,224,1080,224C1110,224,1140,192,1170,197.3C1200,203,1230,245,1260,245.3C1290,245,1320,203,1350,202.7C1380,203,1410,245,1425,266.7L1440,288L1440,0L0,0Z"
        />
      </svg>
      <main className="max-w-6xl mx-auto px-4 lg:my-2 md:gap-y-20 py-8 w-full my-20 flex flex-grow flex-col-reverse md:flex-col  md:mt-40  lg:grid lg:grid-cols-2 items-center gap-10 z-20">
        {/* Left Text Content */}
        
        <section className="text-zinc-300 px-2 lg:px-0">
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

        {/* Form */}
        <section className={`bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl w-full max-w-md mx-auto px-4 py-6 ${loading ? "opacity-90 pointer-events-none" : ""}`}>
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
      </main>

      <footer className="w-full  bg-zinc-900 border-t border-zinc-700 py-4 z-10">
        <Footer />
      </footer>
    </section>

  );
}

export default Register;