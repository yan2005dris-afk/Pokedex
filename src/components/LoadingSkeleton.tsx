export default function LoadingSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="rounded-3xl p-5 bg-slate-900/50 border border-slate-800/80 shadow-lg animate-pulse flex flex-col justify-between h-72"
        >
          <div className="flex justify-between items-center">
            <div className="w-12 h-5 bg-slate-800 rounded-lg" />
            <div className="w-8 h-8 bg-slate-800 rounded-xl" />
          </div>

          <div className="flex justify-center my-auto">
            <div className="w-32 h-32 bg-slate-800/80 rounded-full" />
          </div>

          <div className="space-y-2 mt-2">
            <div className="w-24 h-5 bg-slate-800 rounded-md" />
            <div className="flex gap-2">
              <div className="w-14 h-4 bg-slate-800 rounded-md" />
              <div className="w-14 h-4 bg-slate-800 rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
