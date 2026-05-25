import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import {
  getUserSession,
  logoutSession,
} from "../utils/auth"

import {
  getApplications,
  deleteApplication,
  updateStatus,
  autoReject,
  addApplication,
} from "../utils/api"

import ApplicationTable from "../components/ApplicationTable"
import ApplyJobModal from "../components/ApplyJobModal"
import Toast from "../components/Toast"

export default function DashboardPage() {

  const navigate = useNavigate()

  // =========================
  // USER SESSION
  // =========================
  const user = getUserSession()

  console.log("USER SESSION:", user)

  // =========================
  // STATES
  // =========================
  const [applications, setApplications] = useState([])

  const [time, setTime] = useState("")

  const [showModal, setShowModal] = useState(false)

  const [search, setSearch] = useState("")

  const [filter, setFilter] = useState("Semua")

  const [toast, setToast] = useState("")

  // =========================
  // REALTIME CLOCK
  // =========================
  useEffect(() => {

    const updateClock = () => {

      const now = new Date()

      const formatted = now.toLocaleString("id-ID", {
        timeZone: "Asia/Jakarta",
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })

      setTime(formatted + " WIB")
    }

    updateClock()

    const interval = setInterval(updateClock, 1000)

    return () => clearInterval(interval)

  }, [])

  // =========================
  // FETCH DATA
  // =========================
  const fetchData = async () => {

    try {

      if (!user) {
        console.log("USER TIDAK ADA")
        return
      }

      // AMBIL USER ID DARI SESSION
      const currentUserId =
        user.user_id ||
        user.id ||
        user.email

      console.log("CURRENT USER ID:", currentUserId)

      if (!currentUserId) {
        console.log("USER ID TIDAK DITEMUKAN")
        return
      }

      // GET DATA DARI API
      const res = await getApplications(currentUserId)

      console.log("GET APPLICATION RESPONSE:", res)

      if (res.success) {

        console.log("APPLICATION DATA:", res.data)

        setApplications(res.data || [])

      } else {

        console.log("GAGAL GET DATA")
        setApplications([])
      }

    } catch (error) {

      console.log("FETCH DATA ERROR:", error)

      setApplications([])
    }
  }

  // =========================
  // FIRST LOAD
  // =========================
  useEffect(() => {

    if (!user) {

      navigate("/login")

      return
    }

    fetchData()

    const currentUserId =
      user.user_id ||
      user.id ||
      user.email

    autoReject(currentUserId)

  }, [])

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {

    logoutSession()

    navigate("/login")
  }

  // =========================
  // DELETE APPLICATION
  // =========================
  const handleDelete = async (app_id) => {

    try {

      const res = await deleteApplication(app_id)

      console.log("DELETE RESPONSE:", res)

      if (res.success) {

        setToast("Lamaran berhasil dihapus")

        fetchData()

      } else {

        setToast("Gagal menghapus data")
      }

      setTimeout(() => {
        setToast("")
      }, 3000)

    } catch (error) {

      console.log("DELETE ERROR:", error)

      setToast("Terjadi error saat delete")
    }
  }

  // =========================
  // UPDATE STATUS
  // =========================
  const handleUpdateStatus = async (
    app_id,
    status
  ) => {

    try {

      const res = await updateStatus(
        app_id,
        status
      )

      console.log("UPDATE STATUS:", res)

      if (res.success) {

        setToast(
          `Status berhasil diubah menjadi ${status}`
        )

        fetchData()

      } else {

        setToast("Gagal update status")
      }

      setTimeout(() => {
        setToast("")
      }, 3000)

    } catch (error) {

      console.log(error)

      setToast("Terjadi error update status")
    }
  }

  // =========================
  // ADD JOB
  // =========================
  const handleAddJob = async (form) => {

    try {

      // USER ID WAJIB SAMA DENGAN SESSION
      const currentUserId =
        user.user_id ||
        user.id ||
        user.email

      const payload = {

        app_id: "app_" + Date.now(),

        user_id: currentUserId,

        nama_pt: form.nama_pt || "",

        posisi: form.posisi || "",

        job_deskripsi:
          form.job_deskripsi || "",

        tanggal_apply:
          form.tanggal_apply || "",

        link_job:
          form.link_job || "",

        status:
          form.status || "Melamar",

        notes:
          form.notes || "",
      }

      console.log("PAYLOAD ADD:", payload)

      const res = await addApplication(payload)

      console.log("ADD APPLICATION RESPONSE:", res)

      if (res.success) {

        setShowModal(false)

        setToast(
          "Lamaran berhasil ditambahkan 🚀"
        )

        // REFRESH DATA
        await fetchData()

      } else {

        setToast("Gagal menambahkan lamaran")
      }

      setTimeout(() => {
        setToast("")
      }, 3000)

    } catch (error) {

      console.log("ADD JOB ERROR:", error)

      setToast("Terjadi error saat submit")
    }
  }

  // =========================
  // FILTER DATA
  // =========================
  const filteredApplications =
    applications.filter((item) => {

      const company =
        item.nama_pt?.toLowerCase() || ""

      const position =
        item.posisi?.toLowerCase() || ""

      const matchSearch =
        company.includes(
          search.toLowerCase()
        ) ||
        position.includes(
          search.toLowerCase()
        )

      const matchFilter =
        filter === "Semua"
          ? true
          : item.status === filter

      return matchSearch && matchFilter
    })

  // =========================
  // SUMMARY
  // =========================
  const total = applications.length

  const processCount =
    applications.filter(
      (a) =>
        a.status === "Melamar" ||
        a.status === "Interview"
    ).length

  const accepted =
    applications.filter(
      (a) => a.status === "Diterima"
    ).length

  const rejected =
    applications.filter(
      (a) =>
        a.status === "Ditolak" ||
        a.status === "Ditolak (Auto)"
    ).length

  return (

    <div className="min-h-screen bg-[#0F1117] text-white">

      {/* NAVBAR */}
      <div className="border-b border-[#2D3148] px-4 md:px-8 py-5 flex items-center justify-between">

        <div>

          <h1 className="text-2xl font-bold">
            FW JOBSEEKER
          </h1>

          <p className="text-slate-400 text-sm mt-1">
            {time}
          </p>

        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-xl transition"
        >
          Logout
        </button>

      </div>

      {/* CONTENT */}
      <div className="p-4 md:p-8 space-y-6">

        {/* USER CARD */}
        <div className="bg-[#1A1D27] border border-[#2D3148] rounded-3xl p-4 md:p-8">

          <h2 className="text-3xl font-bold mb-3">
            Welcome 👋
          </h2>

          <p className="text-slate-400">
            {user?.name}
          </p>

          <p className="text-slate-500 mt-2">
  {user?.email}
</p>

<p className="text-slate-500 mt-2">
  ID Akun : {
    user?.user_id ||
    user?.id
  }
</p>

        </div>

        {/* SUMMARY */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          <div className="bg-[#1A1D27] p-6 rounded-2xl border border-[#2D3148]">

            <p className="text-slate-400">
              Total Lamaran
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {total}
            </h2>

          </div>

          <div className="bg-[#1A1D27] p-6 rounded-2xl border border-[#2D3148]">

            <p className="text-slate-400">
              Sedang Proses
            </p>

            <h2 className="text-3xl font-bold mt-2 text-blue-400">
              {processCount}
            </h2>

          </div>

          <div className="bg-[#1A1D27] p-6 rounded-2xl border border-[#2D3148]">

            <p className="text-slate-400">
              Diterima
            </p>

            <h2 className="text-3xl font-bold mt-2 text-green-400">
              {accepted}
            </h2>

          </div>

          <div className="bg-[#1A1D27] p-6 rounded-2xl border border-[#2D3148]">

            <p className="text-slate-400">
              Ditolak
            </p>

            <h2 className="text-3xl font-bold mt-2 text-red-400">
              {rejected}
            </h2>

          </div>

        </div>

        {/* TABLE */}
        <div className="bg-[#1A1D27] border border-[#2D3148] rounded-3xl p-6">

          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-6">

            <h2 className="text-2xl font-bold">
              Riwayat Lamaran
            </h2>

            <div className="flex flex-col md:flex-row gap-3">

              {/* SEARCH */}
              <input
                type="text"
                placeholder="Cari perusahaan / posisi..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="bg-[#22263A] border border-[#2D3148] rounded-xl px-4 py-3 text-white outline-none"
              />

              {/* FILTER */}
              <select
                value={filter}
                onChange={(e) =>
                  setFilter(e.target.value)
                }
                className="bg-[#22263A] border border-[#2D3148] rounded-xl px-4 py-3 text-white outline-none"
              >

                <option value="Semua">
                  Semua
                </option>

                <option value="Melamar">
                  Melamar
                </option>

                <option value="Interview">
                  Interview
                </option>

                <option value="Diterima">
                  Diterima
                </option>

                <option value="Ditolak">
                  Ditolak
                </option>

              </select>

              {/* BUTTON */}
              <button
                onClick={() =>
                  setShowModal(true)
                }
                className="bg-blue-500 hover:bg-blue-600 px-5 py-3 rounded-xl transition"
              >
                + Apply Job
              </button>

            </div>

          </div>

          <ApplicationTable
            applications={filteredApplications}
            onDelete={handleDelete}
            onUpdateStatus={
              handleUpdateStatus
            }
          />

        </div>

      </div>

      {/* MODAL */}
      {showModal && (
        <ApplyJobModal
          onClose={() =>
            setShowModal(false)
          }
          onSave={handleAddJob}
        />
      )}

      {/* TOAST */}
      {toast && (
        <Toast message={toast} />
      )}

    </div>
  )
}