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
        fixed inset-0
        bg-black/70
        backdrop-blur-md
        flex items-center justify-center
        z-50
        p-4
      "
    >

      {/* BACKDROP BLUR */}
      <div className="absolute w-96 h-96 bg-pink-500/20 blur-3xl rounded-full"></div>

      <div
        className="
          relative
          w-full
          max-w-2xl
          glass
          rounded-[32px]
          p-8
          border border-white/10
          shadow-[0_10px_60px_rgba(0,0,0,0.5)]
          max-h-[95vh]
          overflow-y-auto
          fade-in
        "
      >

        {/* HEADER */}
        <div className="flex items-start justify-between mb-8">

          <div>

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
                mb-4
              "
            >
              💼
            </div>

            <h2 className="text-3xl font-black text-white">
              Apply New Job
            </h2>

            <p className="text-slate-400 mt-2">
              Simpan riwayat lamaran kerja kamu 🚀
            </p>

          </div>

          <button
            onClick={onClose}
            className="
              w-11 h-11
              rounded-2xl
              bg-white/10
              hover:bg-red-500
              transition
              text-slate-300
              hover:text-white
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
              Nama Perusahaan
            </label>

            <input
              type="text"
              name="nama_pt"
              required
              placeholder="Contoh: PT Google Indonesia"
              value={form.nama_pt}
              onChange={handleChange}
              className="
                w-full
                bg-white/10
                border border-white/10
                rounded-2xl
                px-5 py-4
                text-white
                placeholder:text-slate-500
                outline-none
                focus:border-pink-400
                transition
              "
            />

          </div>

          {/* POSITION */}
          <div>

            <label className="block text-sm text-slate-300 mb-2">
              Posisi
            </label>

            <input
              type="text"
              name="posisi"
              required
              placeholder="Contoh: Frontend Developer"
              value={form.posisi}
              onChange={handleChange}
              className="
                w-full
                bg-white/10
                border border-white/10
                rounded-2xl
                px-5 py-4
                text-white
                placeholder:text-slate-500
                outline-none
                focus:border-pink-400
                transition
              "
            />

          </div>

          {/* DESCRIPTION */}
          <div>

            <label className="block text-sm text-slate-300 mb-2">
              Job Deskripsi
            </label>

            <textarea
              rows="4"
              name="job_deskripsi"
              placeholder="Masukkan detail pekerjaan..."
              value={form.job_deskripsi}
              onChange={handleChange}
              className="
                w-full
                bg-white/10
                border border-white/10
                rounded-2xl
                px-5 py-4
                text-white
                placeholder:text-slate-500
                outline-none
                resize-none
                focus:border-pink-400
                transition
              "
            />

          </div>

          {/* DATE */}
          <div>

            <label className="block text-sm text-slate-300 mb-2">
              Tanggal Apply
            </label>

            <input
              type="date"
              name="tanggal_apply"
              required
              value={form.tanggal_apply}
              onChange={handleChange}
              className="
                w-full
                bg-white/10
                border border-white/10
                rounded-2xl
                px-5 py-4
                text-white
                outline-none
                focus:border-pink-400
                transition
              "
            />

          </div>

          {/* LINK */}
          <div>

            <label className="block text-sm text-slate-300 mb-2">
              Link Apply
            </label>

            <input
              type="url"
              name="link_apply"
              placeholder="https://company.com/jobs"
              value={form.link_apply}
              onChange={handleChange}
              className="
                w-full
                bg-white/10
                border border-white/10
                rounded-2xl
                px-5 py-4
                text-white
                placeholder:text-slate-500
                outline-none
                focus:border-pink-400
                transition
              "
            />

          </div>

          {/* NOTES */}
          <div>

            <label className="block text-sm text-slate-300 mb-2">
              Catatan
            </label>

            <textarea
              rows="3"
              name="catatan"
              placeholder="Tambahkan catatan..."
              value={form.catatan}
              onChange={handleChange}
              className="
                w-full
                bg-white/10
                border border-white/10
                rounded-2xl
                px-5 py-4
                text-white
                placeholder:text-slate-500
                outline-none
                resize-none
                focus:border-pink-400
                transition
              "
            />

          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 pt-4">

            <button
              type="submit"
              disabled={loading}
              className="
                flex-1
                bg-gradient-to-r
                from-pink-500
                via-purple-500
                to-indigo-500
                hover:scale-[1.02]
                active:scale-[0.98]
                transition-all
                py-4
                rounded-2xl
                font-bold
                text-white
                shadow-lg
                shadow-pink-500/30
                disabled:opacity-50
              "
            >

              {
                loading
                  ? "Saving..."
                  : "✨ Simpan Lamaran"
              }

            </button>

            <button
              type="button"
              onClick={onClose}
              className="
                px-6
                bg-white/10
                hover:bg-white/20
                rounded-2xl
                transition
              "
            >
              Batal
            </button>

          </div>

        </form>

      </div>

    </div>
  )
}