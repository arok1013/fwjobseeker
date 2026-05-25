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

  // HANDLE CHANGE
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  // SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault()

    setLoading(true)

    try {

      const payload = {

        ...form,

        // FORMAT DATE AGAR SESUAI
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
        backdrop-blur-sm
        flex items-center justify-center
        z-50
        p-4
      "
    >

      <div
        className="
          w-full
          max-w-2xl
          bg-[#1A1D27]
          border border-[#2D3148]
          rounded-3xl
          p-8
          animate-in fade-in zoom-in duration-200
          max-h-[95vh]
          overflow-y-auto
        "
      >

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">

          <div>

            <h2 className="text-3xl font-bold text-white">
              Apply Job
            </h2>

            <p className="text-slate-400 mt-2 text-sm">
              Tambahkan riwayat lamaran kerja baru
            </p>

          </div>

          <button
            onClick={onClose}
            className="
              w-10 h-10
              rounded-xl
              bg-[#22263A]
              hover:bg-[#2D3148]
              text-slate-400
              hover:text-white
              transition
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

          {/* NAMA PT */}
          <div>

            <label className="block text-sm text-slate-300 mb-2">
              Nama Perusahaan
            </label>

            <input
              type="text"
              name="nama_pt"
              placeholder="Contoh: PT Wings Group"
              required
              value={form.nama_pt}
              onChange={handleChange}
              className="
                w-full
                bg-[#22263A]
                border border-[#2D3148]
                rounded-xl
                px-4 py-3
                text-white
                outline-none
                focus:border-blue-500
              "
            />

          </div>

          {/* POSISI */}
          <div>

            <label className="block text-sm text-slate-300 mb-2">
              Posisi
            </label>

            <input
              type="text"
              name="posisi"
              placeholder="Contoh: Frontend Developer"
              required
              value={form.posisi}
              onChange={handleChange}
              className="
                w-full
                bg-[#22263A]
                border border-[#2D3148]
                rounded-xl
                px-4 py-3
                text-white
                outline-none
                focus:border-blue-500
              "
            />

          </div>

          {/* JOB DESKRIPSI */}
          <div>

            <label className="block text-sm text-slate-300 mb-2">
              Job Deskripsi
            </label>

            <textarea
              name="job_deskripsi"
              placeholder="Masukkan deskripsi pekerjaan..."
              rows="4"
              value={form.job_deskripsi}
              onChange={handleChange}
              className="
                w-full
                bg-[#22263A]
                border border-[#2D3148]
                rounded-xl
                px-4 py-3
                text-white
                outline-none
                resize-none
                focus:border-blue-500
              "
            />

          </div>

          {/* TANGGAL APPLY */}
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
                bg-[#22263A]
                border border-[#2D3148]
                rounded-xl
                px-4 py-3
                text-white
                outline-none
                focus:border-blue-500
              "
            />

          </div>

          {/* LINK APPLY */}
          <div>

            <label className="block text-sm text-slate-300 mb-2">
              Link Apply
            </label>

            <input
              type="url"
              name="link_apply"
              placeholder="https://company.com/career"
              value={form.link_apply}
              onChange={handleChange}
              className="
                w-full
                bg-[#22263A]
                border border-[#2D3148]
                rounded-xl
                px-4 py-3
                text-white
                outline-none
                focus:border-blue-500
              "
            />

            <p className="text-xs text-slate-500 mt-2">
              Opsional — bisa diisi link lowongan kerja
            </p>

          </div>

          {/* CATATAN */}
          <div>

            <label className="block text-sm text-slate-300 mb-2">
              Catatan
            </label>

            <textarea
              name="catatan"
              placeholder="Tambahkan catatan..."
              rows="3"
              value={form.catatan}
              onChange={handleChange}
              className="
                w-full
                bg-[#22263A]
                border border-[#2D3148]
                rounded-xl
                px-4 py-3
                text-white
                outline-none
                resize-none
                focus:border-blue-500
              "
            />

          </div>

          {/* BUTTON */}
          <div className="flex gap-3 pt-3">

            <button
              type="submit"
              disabled={loading}
              className="
                bg-blue-500
                hover:bg-blue-600
                disabled:opacity-50
                px-6 py-3
                rounded-xl
                font-medium
                transition
              "
            >

              {
                loading
                  ? "Menyimpan..."
                  : "Simpan"
              }

            </button>

            <button
              type="button"
              onClick={onClose}
              className="
                bg-[#22263A]
                hover:bg-[#2D3148]
                px-6 py-3
                rounded-xl
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