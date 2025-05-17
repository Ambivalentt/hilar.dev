import { useState, useRef } from "react";
import { createUser } from "../api/users.jsx";
import Footer from "../components/Footer.jsx";
import { Link } from "react-router-dom";


const Register = () => {
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
      setUser({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        image_url: null,
      })
      setFileName("No avatar selected")
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


  const inputStyle = "w-full px-4 py-2 rounded-md bg-zinc-800 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
  return (
    <section className="min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-800 grid place-items-center px-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="w-full fixed top-0 left-0 drop-shadow-sm drop-shadow-indigo-500/50"

      >
        <path
          fill="#18181b"
          d="M0,320L15,288C30,256,60,192,90,176C120,160,150,192,180,224C210,256,240,288,270,266.7C300,245,330,171,360,144C390,117,420,139,450,165.3C480,192,510,224,540,245.3C570,267,600,277,630,266.7C660,256,690,224,720,192C750,160,780,128,810,117.3C840,107,870,117,900,128C930,139,960,149,990,170.7C1020,192,1050,224,1080,224C1110,224,1140,192,1170,197.3C1200,203,1230,245,1260,245.3C1290,245,1320,203,1350,202.7C1380,203,1410,245,1425,266.7L1440,288L1440,0L1425,0C1410,0,1380,0,1350,0C1320,0,1290,0,1260,0C1230,0,1200,0,1170,0C1140,0,1110,0,1080,0C1050,0,1020,0,990,0C960,0,930,0,900,0C870,0,840,0,810,0C780,0,750,0,720,0C690,0,660,0,630,0C600,0,570,0,540,0C510,0,480,0,450,0C420,0,390,0,360,0C330,0,300,0,270,0C240,0,210,0,180,0C150,0,120,0,90,0C60,0,30,0,15,0L0,0Z"
        />
      </svg>
      <div className="z-10 w-full max-w-md bg-zinc-900 border border-zinc-700 p-8 rounded-2xl shadow-2xl">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 font-semibold">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">First Name</label>
              <input  autoComplete="off" name="first_name" value={user.first_name} onChange={handleChange} placeholder="First name" type="text" className={inputStyle} />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Last Name</label>
              <input  autoComplete="off" name="last_name" value={user.last_name} onChange={handleChange} placeholder="Last name" type="text" className={inputStyle} />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Email</label>
              <input  autoComplete="off" name="email" value={user.email} onChange={handleChange} placeholder="Email" type="email" className={`${inputStyle}`} />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Password</label>
              <input  name="password" value={user.password} onChange={handleChange} placeholder="Password" type="password" className={inputStyle} />
            </div>
            <input  name="image_url" type="file" ref={fileInputRef} className={` hidden`} onChange={handleFileChange} />
            <button type="button" onClick={handleClick} className={`${inputStyle} text-start overflow-hidden text-nowrap`}>
              <p className="inline bg-indigo-600 py-1 px-5 rounded-lg cursor-pointer hover:bg-indigo-700">Upload Avatar</p> <span className=""> {fileName}</span>
            </button>
            <button type="submit" className="w-full bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white py-2 rounded-md font-medium transition-colors">{` ${loading ? 'Loading' : 'Register'}`}</button>
          </div>
           <p className="mt-6 text-center text-sm text-zinc-400">
          You have an account? <Link to='/login' className="text-indigo-400 hover:underline">Login here</Link>
        </p>
        </form>
      </div>
      <footer className=" fixed bottom-0 left-0 w-full bg-zinc-900 border-t border-zinc-700 py-4">
        <Footer />
      </footer>
    </section>
  );
}

export default Register;