import { useEffect, useMemo, useState } from "react"
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

  // SEARCH
  const [search, setSearch] = useState("")

  useEffect(() => {

    const currentUser = getUserSession()

    if (!currentUser) {
      navigate("/login")
      return
    }

    setUser(currentUser)

    loadApplications(currentUser.user_id)

  }, [])

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

  const showToastMessage = (message) => {

    setToast(message)

    setTimeout(() => {
      setToast("")
    }, 2500)
  }

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

      showToastMessage("Application added")

    } catch (error) {

      console.log(error)
    }
  }

  const handleDelete = async (app_id) => {

    const confirmDelete = confirm(
      "Delete this application?"
    )

    if (!confirmDelete) return

    try {

      await deleteApplication(app_id)

      await loadApplications(user.user_id)

      showToastMessage("Application deleted")

    } catch (error) {

      console.log(error)
    }
  }

  const handleUpdateStatus = async (
    app_id,
    status
  ) => {

    try {

      await updateStatus(app_id, status)

      await loadApplications(user.user_id)

      showToastMessage("Status updated")

    } catch (error) {

      console.log(error)
    }
  }

  const handleLogout = () => {

    logout()

    navigate("/login")
  }

  // FILTER SEARCH
  const filteredApplications = useMemo(() => {

    return applications.filter((item) => {

      const keyword = search.toLowerCase()

      return (
        item.nama_pt
          ?.toLowerCase()
          .includes(keyword)

        ||

        item.posisi
          ?.toLowerCase()
          .includes(keyword)
      )
    })

  }, [applications, search])

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

    <div className="min-h-screen relative overflow-hidden bg-[#020617]">

      {/* BACKGROUND */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-500/10 blur-3xl rounded-full"></div>

      {/* CONTENT */}
      <div className="relative z-10 p-6 lg:p-10">

        {/* TOPBAR */}
        <div
          className="
            bg-[#111827]/80
            backdrop-blur-xl
            border border-slate-700/50
            rounded-[32px]
            p-6
            mb-8
            flex
            flex-col
            lg:flex-row
            lg:items-center
            justify-between
            gap-6
          "
        >

          {/* LEFT */}
          <div>

            <div className="flex items-center gap-4 mb-4">

              <div
                className="
                  w-14 h-14
                  rounded-2xl
                  bg-gradient-to-br
                  from-cyan-500
                  to-indigo-600
                  flex
                  items-center
                  justify-center
                  text-2xl
                  shadow-lg
                  shadow-cyan-500/20
                "
              >
                📊
              </div>

              <div>

                <h1
                  className="
                    text-3xl
                    font-black
                    text-white
                  "
                >
                  FWJobSeeker
                </h1>

                <p className="text-slate-400">
                  Job Application Tracker
                </p>

              </div>

            </div>

            <p className="text-slate-300">
              Welcome back,{" "}
              <span className="text-cyan-300 font-semibold">
                {user?.name}
              </span>
            </p>

          </div>

          {/* RIGHT */}
          <div className="flex gap-4 flex-wrap">

            <button
              onClick={() => setShowModal(true)}
              className="
                bg-gradient-to-r
                from-cyan-500
                via-blue-500
                to-indigo-600
                hover:scale-[1.02]
                active:scale-[0.98]
                transition-all
                px-6
                py-4
                rounded-2xl
                font-semibold
                text-white
                shadow-lg
                shadow-cyan-500/20
              "
            >
              Add Application
            </button>

            <button
              onClick={handleLogout}
              className="
                bg-slate-800
                hover:bg-red-500
                transition
                px-6
                py-4
                rounded-2xl
                text-white
              "
            >
              Logout
            </button>

          </div>

        </div>

        {/* SEARCH */}
        <div
          className="
            bg-[#111827]/80
            backdrop-blur-xl
            border border-slate-700/50
            rounded-[28px]
            p-5
            mb-8
          "
        >

          <div className="relative">

            {/* ICON */}
            <div
              className="
                absolute
                left-5
                top-1/2
                -translate-y-1/2
                text-slate-500
              "
            >
              🔍
            </div>

            {/* INPUT */}
            <input
              type="text"
              placeholder="Search company or position..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="
                w-full
                bg-slate-900/80
                border border-slate-700/50
                rounded-2xl
                py-4
                pl-14
                pr-5
                text-white
                placeholder:text-slate-500
                outline-none
                focus:border-cyan-400
                transition-all
              "
            />

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

          {/* CARD */}
          <div
            className="
              bg-[#111827]/80
              border border-slate-700/50
              rounded-3xl
              p-6
            "
          >

            <p className="text-slate-400 mb-3">
              Total Applications
            </p>

            <h2 className="text-4xl font-black text-white">
              {totalApply}
            </h2>

          </div>

          {/* CARD */}
          <div
            className="
              bg-[#111827]/80
              border border-slate-700/50
              rounded-3xl
              p-6
            "
          >

            <p className="text-slate-400 mb-3">
              Interview
            </p>

            <h2 className="text-4xl font-black text-cyan-300">
              {totalInterview}
            </h2>

          </div>

          {/* CARD */}
          <div
            className="
              bg-[#111827]/80
              border border-slate-700/50
              rounded-3xl
              p-6
            "
          >

            <p className="text-slate-400 mb-3">
              Accepted
            </p>

            <h2 className="text-4xl font-black text-emerald-300">
              {totalAccepted}
            </h2>

          </div>

          {/* CARD */}
          <div
            className="
              bg-[#111827]/80
              border border-slate-700/50
              rounded-3xl
              p-6
            "
          >

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
                bg-[#111827]/80
                border border-slate-700/50
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
              applications={filteredApplications}
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