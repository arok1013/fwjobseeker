export default function Toast({
  message,
}) {

  return (
    <div className="fixed bottom-5 right-5 bg-[#1A1D27] border border-[#2D3148] px-5 py-4 rounded-2xl shadow-2xl z-50 animate-bounce">

      <p className="text-white">
        {message}
      </p>

    </div>
  )
}