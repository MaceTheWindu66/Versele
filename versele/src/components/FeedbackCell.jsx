

function FeedbackCell({ status, children }) {
  // status: 'correct' | 'higher' | 'lower' | 'earlier' | 'later' | 'wrong' | null
  const cls =
    status === "correct" ? "bg-green-600 text-white border-green-600" :
    status === "higher" || status === "later" ? "bg-yellow-600 text-white border-yellow-600" :
    status === "lower" || status === "earlier" ? "bg-yellow-600 text-white border-yellow-600" :
    status === "wrong" ? "bg-zinc-700 text-white border-zinc-700" :
    "bg-zinc-900 text-zinc-100 border-zinc-700";
  return (
    <div className={`px-3 py-2 rounded-xl border text-sm font-semibold text-center ${cls}`}>
      {children}
    </div>
  );
}

export default FeedbackCell;