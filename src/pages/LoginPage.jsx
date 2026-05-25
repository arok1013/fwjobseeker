import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import CryptoJS from "crypto-js"
import { saveUserSession } from "../utils/auth"

export default function LoginPage() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()

    try {

      const hashedPassword = CryptoJS.SHA256(password).toString()

      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzh8uFUijj97C8gnLnW82NoxcnpQ4_CtFuC2j9J3JaRCz1B9F-1-pgppV1IDSUFwSqj/exec"
      )

      const users = await response.json()

      const user = users.find(
        (item) =>
          item.email === email &&
          item.password === hashedPassword
      )

      if (!user) {
        alert("Email atau password salah")
        return
      }

      saveUserSession(user)

      navigate("/dashboard")

    } catch (error) {
      console.log(error)
      alert("Login gagal")
    }
  }

  return (
    <div className="min-h-screen bg-[#0F1117] flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-[#1A1D27] border border-[#2D3148] rounded-3xl p-8">

        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Login
        </h1>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#22263A] border border-[#2D3148] rounded-xl px-4 py-3 text-white"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#22263A] border border-[#2D3148] rounded-xl px-4 py-3 text-white"
          />

          <button
            className="w-full bg-blue-500 hover:bg-blue-600 py-3 rounded-xl"
          >
            Login
          </button>

        </form>

        <p className="text-center text-slate-400 mt-5">
          Belum punya akun?{" "}

          <Link
            to="/register"
            className="text-blue-400"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  )
}