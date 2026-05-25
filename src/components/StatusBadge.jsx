export default function StatusBadge({ status }) {

  const styles = {

    Melamar:
      "bg-cyan-500/10 text-cyan-300 border border-cyan-500/20",

    Interview:
      "bg-yellow-500/10 text-yellow-300 border border-yellow-500/20",

    Diterima:
      "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20",

    Ditolak:
      "bg-red-500/10 text-red-300 border border-red-500/20",

    "Ditolak (Auto)":
      "bg-slate-500/10 text-slate-300 border border-slate-500/20",
  }

  return (

    <span
      className={`
        inline-flex
        items-center
        px-4
        py-2
        rounded-full
        text-xs
        font-semibold
        whitespace-nowrap
        ${styles[status]}
      `}
    >

      <span className="w-2 h-2 rounded-full bg-current mr-2"></span>

      {status}

    </span>
  )
}