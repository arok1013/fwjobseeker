import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import CryptoJS from "crypto-js"

const API_URL =
  "https://script.google.com/macros/s/AKfycbzh8uFUijj97C8gnLnW82NoxcnpQ4_CtFuC2j9J3JaRCz1B9F-1-pgppV1IDSUFwSqj/exec"

export default function RegisterPage() {

  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e) => {

    e.preventDefault()

    if (loading) return

    setLoading(true)

    try {

      const trimmedName = name.trim()

      const trimmedEmail = email
        .trim()
        .toLowerCase()

      // HASH PASSWORD
      const hashedPassword = CryptoJS
        .SHA256(password)
        .toString()

      console.log("📝 Register Data:", {
        name: trimmedName,
        email: trimmedEmail,
      })

      // PENTING:
      // jangan pakai headers Content-Type
      // agar tidak kena CORS preflight

      const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({
          action: "register",
          name: trimmedName,
          email: trimmedEmail,
          password: hashedPassword,
        }),
      })

      const result = await response.json()

      console.log("📦 Register Response:", result)

      if (!result.success) {

        alert(result.message || "Register gagal")

        return
      }

      alert("✅ Register berhasil!")

      navigate("/login")

    } catch (error) {

      console.error("❌ Register Error:", error)

      alert("Register gagal: " + error.message)

    } finally {

      setLoading(false)

    }
  }

  return (

    <div className="min-h-screen bg-[#0F1117] flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-[#1A1D27] border border-[#2D3148] rounded-3xl p-8">

        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Register
        </h1>

        <form
          onSubmit={handleRegister}
          className="space-y-5"
        >

          <input
            type="text"
            placeholder="Nama Lengkap"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-[#22263A] border border-[#2D3148] rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 transition"
            disabled={loading}
            required
          />

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
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed py-3 rounded-xl font-medium transition text-white"
          >
            {loading ? "Loading..." : "Register"}
          </button>

        </form>

        <p className="text-center text-slate-400 mt-5">

          Sudah punya akun?{" "}

          <Link
            to="/login"
            className="text-blue-400 hover:text-blue-300 transition"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  )
}