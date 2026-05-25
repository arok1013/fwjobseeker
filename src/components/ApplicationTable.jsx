import StatusBadge from "./StatusBadge"

export default function ApplicationTable({
  applications,
  onDelete,
  onUpdateStatus,
}) {

  const formatDate = (dateString) => {

    if (!dateString) return "-"

    try {

      const date = new Date(dateString)

      return date.toLocaleString("id-ID", {
        timeZone: "Asia/Jakarta",
        day: "2-digit",
        month: "short",
        year: "numeric",
      })

    } catch {

      return dateString
    }
  }

  return (

    <div
      className="
        glass
        rounded-3xl
        overflow-hidden
        border border-white/10
        shadow-2xl
      "
    >

      <div className="overflow-x-auto">

        <table className="w-full min-w-[1000px]">

          <thead>

            <tr
              className="
                bg-white/5
                text-slate-300
                text-sm
              "
            >

              <th className="px-6 py-5 text-left">
                No
              </th>

              <th className="px-6 py-5 text-left">
                Perusahaan
              </th>

              <th className="px-6 py-5 text-left">
                Posisi
              </th>

              <th className="px-6 py-5 text-left">
                Link
              </th>

              <th className="px-6 py-5 text-left">
                Status
              </th>

              <th className="px-6 py-5 text-left">
                Tanggal
              </th>

              <th className="px-6 py-5 text-left">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {
              applications.length > 0 ? (

                applications.map((item, index) => (

                  <tr
                    key={item.app_id}
                    className="
                      border-t border-white/5
                      hover:bg-white/5
                      transition
                    "
                  >

                    <td className="px-6 py-5 text-slate-400">
                      {index + 1}
                    </td>

                    <td className="px-6 py-5 font-semibold text-white">
                      {item.nama_pt}
                    </td>

                    <td className="px-6 py-5 text-slate-300">
                      {item.posisi}
                    </td>

                    <td className="px-6 py-5">

                      {
                        item.link_apply ? (

                          <a
                            href={item.link_apply}
                            target="_blank"
                            rel="noreferrer"
                            className="
                              text-pink-300
                              hover:text-pink-200
                              transition
                              underline
                            "
                          >
                            Open
                          </a>

                        ) : (

                          <span className="text-slate-500">
                            -
                          </span>
                        )
                      }

                    </td>

                    <td className="px-6 py-5">
                      <StatusBadge status={item.status} />
                    </td>

                    <td className="px-6 py-5 text-slate-400">
                      {formatDate(item.tanggal_apply)}
                    </td>

                    <td className="px-6 py-5 flex gap-3">

                      <select
                        value={item.status}
                        onChange={(e) =>
                          onUpdateStatus(
                            item.app_id,
                            e.target.value
                          )
                        }
                        className="
                          bg-white/10
                          border border-white/10
                          rounded-xl
                          px-4 py-2
                          text-sm
                          outline-none
                        "
                      >

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

                      <button
                        onClick={() =>
                          onDelete(item.app_id)
                        }
                        className="
                          bg-red-500/20
                          hover:bg-red-500
                          text-red-300
                          hover:text-white
                          px-4 py-2
                          rounded-xl
                          transition
                        "
                      >
                        Delete
                      </button>

                    </td>

                  </tr>
                ))

              ) : (

                <tr>

                  <td
                    colSpan="7"
                    className="
                      text-center
                      py-16
                      text-slate-400
                    "
                  >
                    🚀 Belum ada riwayat lamaran
                  </td>

                </tr>
              )
            }

          </tbody>

        </table>

      </div>

    </div>
  )
}