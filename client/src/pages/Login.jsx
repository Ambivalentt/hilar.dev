import React from "react";
import Footer from "../components/Footer.jsx";
import { loginUser, refreshToken } from "../api/users.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useStateContext } from '../context/authContext.jsx'

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

      setUser({
        email: "",
        password: "",
      })
      navigate("/")
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-800 px-6 py-10 grid place-items-center">
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

      <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        <section className="text-center md:text-left px-4">
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
        <section className={`bg-zinc-800 rounded-lg shadow-lg p-8 ${loading ? "opacity-50 pointer-events-none" : ""}`}>
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Sign in</h2>

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
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-medium transition-colors"
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
      </div>

      <footer className="fixed bottom-0 left-0 w-full bg-zinc-900 border-t border-zinc-700 py-4">
        <Footer />
      </footer>
    </main>

  );
};

export default Login;
