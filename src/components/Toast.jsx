export default function Toast({ message }) {

  return (

    <div
      className="
        fixed
        bottom-6
        right-6
        z-50
        bg-[#111827]/90
        backdrop-blur-xl
        border border-slate-700/50
        px-6
        py-4
        rounded-2xl
        shadow-2xl
        animate-[fadeIn_.3s_ease]
      "
    >

      <div className="flex items-center gap-3">

        <div
          className="
            w-10
            h-10
            rounded-xl
            bg-gradient-to-br
            from-cyan-500
            to-indigo-600
            flex
            items-center
            justify-center
            text-white
            shadow-lg
            shadow-cyan-500/20
          "
        >
          ✓
        </div>

        <div>

          <p className="text-white font-semibold">
            Success
          </p>

          <p className="text-slate-400 text-sm">
            {message}
          </p>

        </div>

      </div>

    </div>
  )
}