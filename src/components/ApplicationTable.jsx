export default function ApplicationTable({
  applications,
  onDelete,
  onUpdateStatus,
}) {

  // FORMAT TANGGAL
  const formatDate = (dateString) => {

    if (!dateString) return "-"

    try {

      const date = new Date(dateString)

      return date.toLocaleString("id-ID", {
        timeZone: "Asia/Jakarta",
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }) + " WIB"

    } catch {

      return dateString
    }
  }

  return (

    <div className="overflow-x-auto">

      <table className="w-full text-left min-w-[1000px]">

        <thead>

          <tr className="border-b border-[#2D3148] text-slate-400">

            <th className="py-4">No</th>

            <th>ID App</th>

            <th>Perusahaan</th>

            <th>Posisi</th>

            <th>Link Apply</th>

            <th>Status</th>

            <th>Tanggal</th>

            <th>Aksi</th>

          </tr>

        </thead>

        <tbody>

          {
            applications.length > 0 ? (

              applications.map((item, index) => (

                <tr
                  key={item.app_id}
                  className="border-b border-[#2D3148]"
                >

                  {/* NO */}
                  <td className="py-4">
                    {index + 1}
                  </td>

                  {/* APP ID */}
                  <td className="text-slate-400 text-sm">
                    {item.app_id}
                  </td>

                  {/* COMPANY */}
                  <td className="font-medium">
                    {item.nama_pt}
                  </td>

                  {/* POSITION */}
                  <td>
                    {item.posisi}
                  </td>

                  {/* LINK APPLY */}
                  <td>

                    {
                      item.link_apply ? (

                        <a
                          href={item.link_apply}
                          target="_blank"
                          rel="noreferrer"
                          className="
                            text-blue-400
                            hover:text-blue-300
                            underline
                            text-sm
                            break-all
                          "
                        >
                          Buka Link
                        </a>

                      ) : (

                        <span className="text-slate-500">
                          -
                        </span>
                      )
                    }

                  </td>

                  {/* STATUS */}
                  <td>

                    <span
                      className={`
                        px-3 py-1 rounded-lg text-sm font-medium

                        ${item.status === "Melamar"
                          && "bg-blue-500/20 text-blue-400"}

                        ${item.status === "Interview"
                          && "bg-yellow-500/20 text-yellow-400"}

                        ${item.status === "Diterima"
                          && "bg-green-500/20 text-green-400"}

                        ${item.status?.includes("Ditolak")
                          && "bg-red-500/20 text-red-400"}
                      `}
                    >
                      {item.status}
                    </span>

                  </td>

                  {/* DATE */}
                  <td className="text-sm text-slate-300">
                    {formatDate(item.tanggal_apply)}
                  </td>

                  {/* ACTION */}
                  <td className="flex gap-2 py-4">

                    <select
                      value={item.status}
                      onChange={(e) =>
                        onUpdateStatus(
                          item.app_id,
                          e.target.value
                        )
                      }
                      className="
                        bg-[#22263A]
                        border
                        border-[#2D3148]
                        rounded-lg
                        px-3
                        py-2
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
                        bg-red-500
                        hover:bg-red-600
                        px-3
                        py-2
                        rounded-lg
                        text-sm
                        transition
                      "
                    >
                      Hapus
                    </button>

                  </td>

                </tr>
              ))

            ) : (

              <tr>

                <td
                  colSpan="8"
                  className="
                    text-center
                    py-10
                    text-slate-500
                  "
                >
                  Belum ada riwayat lamaran
                </td>

              </tr>
            )
          }

        </tbody>

      </table>

    </div>
  )
}
