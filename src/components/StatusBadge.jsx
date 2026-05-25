export default function StatusBadge({ status }) {

  const colors = {

    Melamar:
      "bg-blue-500/20 text-blue-300 border border-blue-400/20",

    Interview:
      "bg-yellow-500/20 text-yellow-300 border border-yellow-400/20",

    Diterima:
      "bg-green-500/20 text-green-300 border border-green-400/20",

    Ditolak:
      "bg-red-500/20 text-red-300 border border-red-400/20",

    "Ditolak (Auto)":
      "bg-gray-500/20 text-gray-300 border border-gray-400/20",
  }

  return (

    <span
      className={`
        px-4
        py-2
        rounded-full
        text-xs
        font-semibold
        whitespace-nowrap
        ${colors[status]}
      `}
    >
      {status}
    </span>
  )
}