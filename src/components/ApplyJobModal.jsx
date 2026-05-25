import { useState } from "react"

export default function ApplyJobModal({
  onClose,
  onSave,
}) {

  const [form, setForm] = useState({
    nama_pt: "",
    posisi: "",
    job_deskripsi: "",
    tanggal_apply: new Date()
      .toISOString()
      .split("T")[0],
    link_apply: "",
    catatan: "",
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    setLoading(true)

    try {

      const payload = {
        ...form,
        tanggal_apply: new Date(
          form.tanggal_apply
        ).toISOString(),
      }

      await onSave(payload)

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)
    }
  }

  return (

    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/70
        backdrop-blur-md
        p-4
      "
    >

      {/* BACKGROUND EFFECT */}
      <div className="absolute w-[400px] h-[400px] bg-cyan-500/10 blur-3xl rounded-full"></div>

      {/* MODAL */}
      <div
        className="
          relative
          w-full
          max-w-2xl
          bg-[#111827]/90
          backdrop-blur-2xl
          border border-slate-700/50
          rounded-[32px]
          p-8
          shadow-[0_10px_60px_rgba(0,0,0,0.7)]
          max-h-[95vh]
          overflow-y-auto
        "
      >

        {/* HEADER */}
        <div
          className="
            flex
            items-start
            justify-between
            mb-8
          "
        >

          <div>

            <div
              className="
                w-14
                h-14
                rounded-2xl
                bg-gradient-to-br
                from-cyan-500
                to-indigo-600
                flex
                items-center
                justify-center
                text-2xl
                text-white
                shadow-lg
                shadow-cyan-500/20
                mb-4
              "
            >
              💼
            </div>

            <h2
              className="
                text-3xl
                font-black
                text-white
                mb-2
              "
            >
              Add Application
            </h2>

            <p className="text-slate-400">
              Save and organize your job applications
            </p>

          </div>

          {/* CLOSE */}
          <button
            onClick={onClose}
            className="
              w-11
              h-11
              rounded-2xl
              bg-slate-800
              hover:bg-red-500
              transition-all
              text-white
            "
          >
            ✕
          </button>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* COMPANY */}
          <div>

            <label className="block text-sm text-slate-300 mb-2">
              Company Name
            </label>

            <input
              type="text"
              name="nama_pt"
              required
              placeholder="e.g. Google Indonesia"
              value={form.nama_pt}
              onChange={handleChange}
              className="
                w-full
                bg-slate-900/80
                border border-slate-700/50
                rounded-2xl
                px-5
                py-4
                text-white
                placeholder:text-slate-500
                outline-none
                focus:border-cyan-400
                transition-all
              "
            />

          </div>

          {/* POSITION */}
          <div>

            <label className="block text-sm text-slate-300 mb-2">
              Position
            </label>

            <input
              type="text"
              name="posisi"
              required
              placeholder="e.g. Frontend Developer"
              value={form.posisi}
              onChange={handleChange}
              className="
                w-full
                bg-slate-900/80
                border border-slate-700/50
                rounded-2xl
                px-5
                py-4
                text-white
                placeholder:text-slate-500
                outline-none
                focus:border-cyan-400
                transition-all
              "
            />

          </div>

          {/* DESCRIPTION */}
          <div>

            <label className="block text-sm text-slate-300 mb-2">
              Job Description
            </label>

            <textarea
              rows="4"
              name="job_deskripsi"
              placeholder="Write job details..."
              value={form.job_deskripsi}
              onChange={handleChange}
              className="
                w-full
                bg-slate-900/80
                border border-slate-700/50
                rounded-2xl
                px-5
                py-4
                text-white
                placeholder:text-slate-500
                outline-none
                resize-none
                focus:border-cyan-400
                transition-all
              "
            />

          </div>

          {/* DATE */}
          <div>

            <label className="block text-sm text-slate-300 mb-2">
              Apply Date
            </label>

            <input
              type="date"
              name="tanggal_apply"
              required
              value={form.tanggal_apply}
              onChange={handleChange}
              className="
                w-full
                bg-slate-900/80
                border border-slate-700/50
                rounded-2xl
                px-5
                py-4
                text-white
                outline-none
                focus:border-cyan-400
                transition-all
              "
            />

          </div>

          {/* LINK */}
          <div>

            <label className="block text-sm text-slate-300 mb-2">
              Application Link
            </label>

            <input
              type="url"
              name="link_apply"
              placeholder="https://company.com/jobs"
              value={form.link_apply}
              onChange={handleChange}
              className="
                w-full
                bg-slate-900/80
                border border-slate-700/50
                rounded-2xl
                px-5
                py-4
                text-white
                placeholder:text-slate-500
                outline-none
                focus:border-cyan-400
                transition-all
              "
            />

          </div>

          {/* NOTES */}
          <div>

            <label className="block text-sm text-slate-300 mb-2">
              Notes
            </label>

            <textarea
              rows="3"
              name="catatan"
              placeholder="Additional notes..."
              value={form.catatan}
              onChange={handleChange}
              className="
                w-full
                bg-slate-900/80
                border border-slate-700/50
                rounded-2xl
                px-5
                py-4
                text-white
                placeholder:text-slate-500
                outline-none
                resize-none
                focus:border-cyan-400
                transition-all
              "
            />

          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 pt-4">

            {/* SAVE */}
            <button
              type="submit"
              disabled={loading}
              className="
                flex-1
                bg-gradient-to-r
                from-cyan-500
                via-blue-500
                to-indigo-600
                hover:scale-[1.01]
                active:scale-[0.99]
                transition-all
                py-4
                rounded-2xl
                font-semibold
                text-white
                shadow-lg
                shadow-cyan-500/20
                disabled:opacity-50
              "
            >
              {
                loading
                  ? "Saving..."
                  : "Save Application"
              }
            </button>

            {/* CANCEL */}
            <button
              type="button"
              onClick={onClose}
              className="
                px-6
                bg-slate-800
                hover:bg-slate-700
                rounded-2xl
                transition-all
                text-white
              "
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  )
}