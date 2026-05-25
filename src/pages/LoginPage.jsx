import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import CryptoJS from "crypto-js"

import { saveUserSession } from "../utils/auth"

const API_URL =
  "https://script.google.com/macros/s/AKfycbzh8uFUijj97C8gnLnW82NoxcnpQ4_CtFuC2j9J3JaRCz1B9F-1-pgppV1IDSUFwSqj/exec"

export default function LoginPage() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {

    e.preventDefault()

    if (loading) return

    setLoading(true)

    try {

      const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({
          action: "login",
          email: email.trim().toLowerCase(),
          password: CryptoJS
            .SHA256(password)
            .toString(),
        }),
      })

      const result = await response.json()

      if (!result.success) {

        alert(
          result.message ||
          "Email atau password salah"
        )

        return
      }

      saveUserSession(result.user)

      navigate("/dashboard")

    } catch (error) {

      console.log(error)

      alert(
        "Login gagal: " + error.message
      )

    } finally {

      setLoading(false)
    }
  }

  return (

    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#020617]
        flex items-center justify-center
        px-6
      "
    >

      {/* BACKGROUND */}
      <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-cyan-500/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-[-120px] right-[-100px] w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-3xl"></div>

      {/* CARD */}
      <div className="relative z-10 w-full max-w-md">

        {/* LOGO */}
        <div className="flex justify-center mb-6">

          <div
            className="
              w-16 h-16
              rounded-2xl
              bg-gradient-to-br
              from-cyan-500
              to-indigo-600
              flex items-center justify-center
              text-2xl
              shadow-2xl
              shadow-cyan-500/20
            "
          >
            📊
          </div>

        </div>

        {/* CARD */}
        <div
          className="
            bg-[#111827]/80
            backdrop-blur-2xl
            border border-slate-700/50
            rounded-[32px]
            p-8
            shadow-[0_10px_60px_rgba(0,0,0,0.6)]
          "
        >

          {/* HEADER */}
          <div className="text-center mb-8">

            <h1
              className="
                text-4xl
                font-black
                text-white
                mb-3
                tracking-tight
              "
            >
              Welcome Back
            </h1>

            <p className="text-slate-400 text-sm">
              Manage and monitor your job applications
            </p>

          </div>

          {/* FORM */}
          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

            {/* EMAIL */}
            <div>

              <label className="text-sm text-slate-300 mb-2 block">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                disabled={loading}
                required
                className="
                  w-full
                  bg-slate-900/80
                  border
                  border-slate-700/50
                  rounded-2xl
                  px-5
                  py-4
                  text-white
                  placeholder:text-slate-500
                  outline-none
                  focus:border-cyan-400
                  transition-all
                  duration-300
                "
              />

            </div>

            {/* PASSWORD */}
            <div>

              <label className="text-sm text-slate-300 mb-2 block">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                disabled={loading}
                required
                className="
                  w-full
                  bg-slate-900/80
                  border
                  border-slate-700/50
                  rounded-2xl
                  px-5
                  py-4
                  text-white
                  placeholder:text-slate-500
                  outline-none
                  focus:border-cyan-400
                  transition-all
                  duration-300
                "
              />

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-gradient-to-r
                from-cyan-500
                via-blue-500
                to-indigo-600
                hover:scale-[1.02]
                active:scale-[0.98]
                transition-all
                duration-300
                py-4
                rounded-2xl
                font-bold
                text-white
                shadow-lg
                shadow-cyan-500/20
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {
                loading
                  ? "Loading..."
                  : "Login"
              }
            </button>

          </form>

          {/* FOOTER */}
          <div className="mt-8 text-center">

            <p className="text-slate-400 text-sm">

              Belum punya akun?{" "}

              <Link
                to="/register"
                className="
                  text-cyan-300
                  hover:text-cyan-200
                  font-semibold
                  transition
                "
              >
                Register
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  )
}