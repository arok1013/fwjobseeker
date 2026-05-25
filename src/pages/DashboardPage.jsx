import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import ApplyJobModal from "../components/ApplyJobModal"
import ApplicationTable from "../components/ApplicationTable"
import Toast from "../components/Toast"

import {
  getUserSession,
  logout,
} from "../utils/auth"

import {
  addApplication,
  deleteApplication,
  getApplications,
  updateStatus,
} from "../utils/api"

export default function DashboardPage() {

  const navigate = useNavigate()

  const [user, setUser] = useState(null)

  const [applications, setApplications] = useState([])

  const [loading, setLoading] = useState(true)

  const [showModal, setShowModal] = useState(false)

  const [toast, setToast] = useState("")

  // LOAD USER
  useEffect(() => {

    const currentUser = getUserSession()

    if (!currentUser) {
      navigate("/login")
      return
    }

    setUser(currentUser)

    loadApplications(currentUser.user_id)

  }, [])

  // LOAD DATA
  const loadApplications = async (userId) => {

    try {

      setLoading(true)

      const result = await getApplications(userId)

      if (result.success) {
        setApplications(result.data || [])
      }

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)
    }
  }

  // TOAST
  const showToast = (message) => {

    setToast(message)

    setTimeout(() => {
      setToast("")
    }, 2500)
  }

  // ADD APPLICATION
  const handleAddApplication = async (payload) => {

    try {

      const app = {
        ...payload,
        app_id: "APP-" + Date.now(),
        user_id: user.user_id,
        status: "Melamar",
      }

      const result = await addApplication(app)

      if (!result.success) {
        alert(result.message)
        return
      }

      await loadApplications(user.user_id)

      setShowModal(false)

      showToast("Lamaran berhasil ditambahkan ✨")

    } catch (error) {

      console.log(error)
    }
  }

  // DELETE
  const handleDelete = async (app_id) => {

    const confirmDelete = confirm(
      "Yakin ingin menghapus lamaran ini?"
    )

    if (!confirmDelete) return

    try {

      await deleteApplication(app_id)

      await loadApplications(user.user_id)

      showToast("Lamaran berhasil dihapus 🗑️")

    } catch (error) {

      console.log(error)
    }
  }

  // UPDATE STATUS
  const handleUpdateStatus = async (
    app_id,
    status
  ) => {

    try {

      await updateStatus(app_id, status)

      await loadApplications(user.user_id)

      showToast("Status berhasil diupdate 🚀")

    } catch (error) {

      console.log(error)
    }
  }

  // LOGOUT
  const handleLogout = () => {

    logout()

    navigate("/login")
  }

  // STATS
  const totalApply = applications.length

  const totalInterview =
    applications.filter(
      (item) => item.status === "Interview"
    ).length

  const totalAccepted =
    applications.filter(
      (item) => item.status === "Diterima"
    ).length

  const totalRejected =
    applications.filter(
      (item) =>
        item.status?.includes("Ditolak")
    ).length

  return (

    <div className="min-h-screen relative overflow-hidden px-6 py-8">

      {/* BACKGROUND */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-pink-500/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 blur-3xl rounded-full"></div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto">

        {/* HEADER */}
        <div
          className="
            glass
            rounded-[32px]
            p-6
            flex flex-col lg:flex-row
            lg:items-center
            justify-between
            gap-6
            mb-8
          "
        >

          <div>

            <div
              className="
                inline-flex
                items-center
                gap-3
                mb-4
              "
            >

              <div
                className="
                  w-14 h-14
                  rounded-2xl
                  bg-gradient-to-br
                  from-pink-500
                  to-purple-600
                  flex items-center justify-center
                  text-2xl
                  shadow-lg
                  shadow-pink-500/30
                "
              >
                💼
              </div>

              <div>

                <h1 className="text-3xl font-black text-white">
                  FWJobSeeker
                </h1>

                <p className="text-slate-400">
                  Track your job journey 🚀
                </p>

              </div>

            </div>

            <p className="text-slate-300">
              Welcome back,{" "}
              <span className="font-bold text-pink-300">
                {user?.name}
              </span>
            </p>

          </div>

          {/* ACTIONS */}
          <div className="flex flex-wrap gap-4">

            <button
              onClick={() => setShowModal(true)}
              className="
                bg-gradient-to-r
                from-pink-500
                via-purple-500
                to-indigo-500
                hover:scale-[1.02]
                active:scale-[0.98]
                transition-all
                px-6 py-4
                rounded-2xl
                font-semibold
                shadow-lg
                shadow-pink-500/30
              "
            >
              ✨ Add Application
            </button>

            <button
              onClick={handleLogout}
              className="
                bg-white/10
                hover:bg-red-500
                transition
                px-6 py-4
                rounded-2xl
              "
            >
              Logout
            </button>

          </div>

        </div>

        {/* STATS */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-4
            gap-5
            mb-8
          "
        >

          <div className="glass rounded-3xl p-6">

            <p className="text-slate-400 mb-3">
              Total Apply
            </p>

            <h2 className="text-4xl font-black">
              {totalApply}
            </h2>

          </div>

          <div className="glass rounded-3xl p-6">

            <p className="text-slate-400 mb-3">
              Interview
            </p>

            <h2 className="text-4xl font-black text-yellow-300">
              {totalInterview}
            </h2>

          </div>

          <div className="glass rounded-3xl p-6">

            <p className="text-slate-400 mb-3">
              Accepted
            </p>

            <h2 className="text-4xl font-black text-green-300">
              {totalAccepted}
            </h2>

          </div>

          <div className="glass rounded-3xl p-6">

            <p className="text-slate-400 mb-3">
              Rejected
            </p>

            <h2 className="text-4xl font-black text-red-300">
              {totalRejected}
            </h2>

          </div>

        </div>

        {/* TABLE */}
        {

          loading ? (

            <div
              className="
                glass
                rounded-3xl
                p-16
                text-center
                text-slate-400
              "
            >
              Loading...
            </div>

          ) : (

            <ApplicationTable
              applications={applications}
              onDelete={handleDelete}
              onUpdateStatus={handleUpdateStatus}
            />
          )
        }

      </div>

      {/* MODAL */}
      {
        showModal && (

          <ApplyJobModal
            onClose={() => setShowModal(false)}
            onSave={handleAddApplication}
          />
        )
      }

      {/* TOAST */}
      {
        toast && (
          <Toast message={toast} />
        )
      }

    </div>
  )
}