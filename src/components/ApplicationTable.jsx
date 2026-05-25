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

      return date.toLocaleDateString(
        "id-ID",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      )

    } catch {

      return dateString
    }
  }

  return (

    <div
      className="
        bg-[#111827]/80
        backdrop-blur-xl
        border border-slate-700/50
        rounded-[32px]
        overflow-hidden
      "
    >

      {/* HEADER */}
      <div
        className="
          flex
          items-center
          justify-between
          px-8
          py-6
          border-b border-slate-700/50
        "
      >

        <div>

          <h2
            className="
              text-2xl
              font-black
              text-white
              mb-1
            "
          >
            Applications
          </h2>

          <p className="text-slate-400 text-sm">
            Track and manage all applications
          </p>

        </div>

      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">

        <table className="w-full min-w-[1000px]">

          <thead>

            <tr
              className="
                border-b
                border-slate-700/50
                bg-slate-900/40
              "
            >

              <th className="px-6 py-5 text-left text-sm text-slate-400 font-semibold">
                Company
              </th>

              <th className="px-6 py-5 text-left text-sm text-slate-400 font-semibold">
                Position
              </th>

              <th className="px-6 py-5 text-left text-sm text-slate-400 font-semibold">
                Status
              </th>

              <th className="px-6 py-5 text-left text-sm text-slate-400 font-semibold">
                Date
              </th>

              <th className="px-6 py-5 text-left text-sm text-slate-400 font-semibold">
                Link
              </th>

              <th className="px-6 py-5 text-left text-sm text-slate-400 font-semibold">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {
              applications.length > 0 ? (

                applications.map((item) => (

                  <tr
                    key={item.app_id}
                    className="
                      border-b
                      border-slate-800
                      hover:bg-slate-800/40
                      transition-all
                    "
                  >

                    {/* COMPANY */}
                    <td className="px-6 py-5">

                      <div>

                        <h3 className="font-semibold text-white">
                          {item.nama_pt}
                        </h3>

                        <p className="text-sm text-slate-500 mt-1">
                          {item.job_deskripsi
                            ? item.job_deskripsi.slice(0, 40) + "..."
                            : "No description"}
                        </p>

                      </div>

                    </td>

                    {/* POSITION */}
                    <td className="px-6 py-5 text-slate-300">
                      {item.posisi}
                    </td>

                    {/* STATUS */}
                    <td className="px-6 py-5">
                      <StatusBadge
                        status={item.status}
                      />
                    </td>

                    {/* DATE */}
                    <td className="px-6 py-5 text-slate-400">
                      {formatDate(
                        item.tanggal_apply
                      )}
                    </td>

                    {/* LINK */}
                    <td className="px-6 py-5">

                      {
                        item.link_apply ? (

                          <a
                            href={item.link_apply}
                            target="_blank"
                            rel="noreferrer"
                            className="
                              text-cyan-300
                              hover:text-cyan-200
                              transition
                              font-medium
                            "
                          >
                            Open Link
                          </a>

                        ) : (

                          <span className="text-slate-600">
                            -
                          </span>
                        )
                      }

                    </td>

                    {/* ACTIONS */}
                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        {/* STATUS */}
                        <select
                          value={item.status}
                          onChange={(e) =>
                            onUpdateStatus(
                              item.app_id,
                              e.target.value
                            )
                          }
                          className="
                            bg-slate-900
                            border border-slate-700
                            rounded-xl
                            px-4 py-2
                            text-sm
                            text-white
                            outline-none
                            focus:border-cyan-400
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

                        {/* DELETE */}
                        <button
                          onClick={() =>
                            onDelete(item.app_id)
                          }
                          className="
                            bg-red-500/10
                            hover:bg-red-500
                            border border-red-500/20
                            text-red-300
                            hover:text-white
                            px-4 py-2
                            rounded-xl
                            transition-all
                          "
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>
                ))

              ) : (

                <tr>

                  <td
                    colSpan="6"
                    className="
                      text-center
                      py-20
                    "
                  >

                    <div className="mb-4 text-5xl">
                      📭
                    </div>

                    <h3
                      className="
                        text-xl
                        font-bold
                        text-white
                        mb-2
                      "
                    >
                      No applications yet
                    </h3>

                    <p className="text-slate-400">
                      Start adding your job applications
                    </p>

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