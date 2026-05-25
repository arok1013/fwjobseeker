export default function Toast({ message }) {

  return (

    <div
      className="
        fixed
        bottom-6
        right-6
        z-50
        glass
        px-6
        py-4
        rounded-2xl
        shadow-2xl
        border border-white/10
        animate-bounce
      "
    >

      <p className="text-white font-medium">
        ✨ {message}
      </p>

    </div>
  )
}