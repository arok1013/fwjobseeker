export default function StatusBadge({ status }) {

  const colors = {
    Melamar: "bg-blue-500/20 text-blue-400",
    Interview: "bg-yellow-500/20 text-yellow-400",
    Diterima: "bg-green-500/20 text-green-400",
    Ditolak: "bg-red-500/20 text-red-400",
    "Ditolak (Auto)": "bg-gray-500/20 text-gray-300",
  }

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${colors[status]}`}
    >
      {status}
    </span>
  )
}