import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import CryptoJS from "crypto-js"
import { saveUserSession } from "../utils/auth"

const API_URL =
  "https://script.google.com/macros/s/AKfycbzh8uFUijj97C8gnLnW82NoxcnpQ4_CtFuC2j9J3JaRCz1B9F-1-pgppV1IDSUFwSqj/exec"

export default function LoginPage() {

  const navigate = useNavigate()

  const [email,    setEmail]    = useState("")
  const [password, setPassword] = useState("")
  const [loading,  setLoading]  = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {

      const emailTrimmed    = email.trim().toLowerCase()
      const hashedPassword  = CryptoJS.SHA256(password).toString()

      console.log("🔐 Email:", emailTrimmed)
      console.log("🔐 Hashed Password:", hashedPassword)

      const body = JSON.stringify({
        action:   "login",
        email:    emailTrimmed,
        password: hashedPassword,
      })

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      })

      const result = await response.json()

      console.log("📦 Response:", result)

      if (!result.success) {
        alert("❌ " + (result.message || "Email atau password salah"))
        setLoading(false)
        return
      }

      console.log("✅ Login berhasil:", result.user)
      saveUserSession(result.user)
      navigate("/dashboard")

    } catch (error) {
      console.error("❌ Login Error:", error)
      alert("Login gagal: " + error.message)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0F1117] flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-[#1A1D27] border border-[#2D3148] rounded-3xl p-8">

        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-5">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#22263A] border border-[#2D3148] rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 transition"
            disabled={loading}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#22263A] border border-[#2D3148] rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 transition"
            disabled={loading}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed py-3 rounded-xl font-medium transition"
          >
            {loading ? "Loading..." : "Login"}
          </button>

        </form>

        <p className="text-center text-slate-400 mt-5">
          Belum punya akun?{" "}
          <Link to="/register" className="text-blue-400 hover:text-blue-300 transition">
            Register
          </Link>
        </p>

      </div>
    </div>
  )
}