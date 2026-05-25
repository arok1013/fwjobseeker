import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import CryptoJS from "crypto-js"

export default function RegisterPage() {

  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = async (e) => {
    e.preventDefault()

    try {

      const hashedPassword = CryptoJS.SHA256(password).toString()

      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzh8uFUijj97C8gnLnW82NoxcnpQ4_CtFuC2j9J3JaRCz1B9F-1-pgppV1IDSUFwSqj/exec",
        {
          method: "POST",
          body: JSON.stringify({
            name,
            email,
            password: hashedPassword,
          }),
        }
      )

      const result = await response.json()

      alert(result.message)

      if (result.success) {
        navigate("/login")
      }

    } catch (error) {
      console.log(error)
      alert("Register gagal")
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
            placeholder="Nama"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-[#22263A] border border-[#2D3148] rounded-xl px-4 py-3 text-white"
          />

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
            Register
          </button>

        </form>

        <p className="text-center text-slate-400 mt-5">
          Sudah punya akun?{" "}

          <Link
            to="/login"
            className="text-blue-400"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  )
}