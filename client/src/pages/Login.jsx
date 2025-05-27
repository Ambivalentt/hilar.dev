import React from "react";
import Footer from "../components/Footer.jsx";
import { loginUser, refreshToken } from "../api/users.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useStateContext } from '../context/authContext.jsx'
import { Home } from "lucide-react";
import { Link } from "react-router-dom";
const Login = () => {

  const { getUser } = useStateContext()
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    setUser({
      ...user, [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      setLoading(true)
      const success = await loginUser(user)
      if (success) {
        await refreshToken()
        await getUser()
      }

      navigate("/")
    } catch (error) {
      setError(error.message)
      setUser({
        email: "",
        password: "",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen  flex justify-center flex-col items-center  bg-gradient-to-br from-indigo-950  via-black to-indigo-950 ">


      <main className="relative  md:max-w-xl lg:max-w-6xl flex-col-reverse flex-grow  gap-10 px-4 lg:gap-16 lg:px-10 w-full flex lg:flex-col justify-center  lg:grid lg:grid-cols-2 lg:place-items-center">
        <motion.section
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
        >
          <section className="text-center md:text-left ">
            <h1 className="text-4xl font-extrabold text-indigo-500 mb-6">
              Welcome Back!
            </h1>
            <p className="text-lg text-zinc-300 mb-6">
              Access your projects and enjoy building amazing features. Sign in to continue your journey with us.
            </p>
            <ul className="list-disc list-inside text-zinc-400 space-y-2">
              <li>Manage your projects effortlessly</li>
              <li>Collaborate with your team</li>
              <li>Track progress and tasks</li>
              <li>Stay organized and productive</li>
            </ul>
          </section>
        </motion.section>
        <motion.section
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className="w-full"
        >
          <section className={`bg-zinc-900 relative w-full rounded-lg shadow-lg p-8 ${loading ? "opacity-50 pointer-events-none" : ""}`}>
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Sign in</h2>
            <Link
              to="/"
              className="inline-flex items-center  absolute top-4 left-2 hover:bg-zinc-700 text-white/90 px-3 py-1.5 rounded-md transition-colors text-sm font-medium"
            >
              <Home size={25} strokeWidth={3} />
            </Link>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Email</label>
                <input
                  onChange={handleChange}
                  value={user.email}
                  name="email"
                  type="email"
                  className="w-full px-4 py-2 rounded-md bg-zinc-800 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Password</label>
                <input
                  onChange={handleChange}
                  value={user.password}
                  name="password"
                  type="password"
                  className="w-full px-4 py-2 rounded-md bg-zinc-800 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="••••••••"
                />
              </div>
              {error && <p className="text-red-500 font-semibold text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full h-10 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-medium transition-colors"
              >
                {loading ? "Loading..." : "Login"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-zinc-400">
              Don't have an account?{' '}
              <a href="/register" className="text-indigo-400 hover:underline">
                Register here
              </a>
            </p>
          </section>
        </motion.section>
      </main>

      <footer className="w-full bg-zinc-900 border-t lg:fixed lg:bottom-0 border-zinc-700 py-4">
        <Footer />
      </footer>
    </main>

  );
};

export default Login;
