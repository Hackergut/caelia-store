export default function Loading() {
  return (
    <div className="shell py-24">
      <div className="animate-pulse space-y-6">
        <div className="h-3 w-32 bg-mist/40 rounded" />
        <div className="h-12 w-3/4 bg-mist/40 rounded" />
        <div className="h-4 w-1/2 bg-mist/40 rounded" />
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i}>
              <div className="aspect-[4/5] bg-mist/40 rounded-md" />
              <div className="mt-4 h-5 w-2/3 bg-mist/40 rounded" />
              <div className="mt-2 h-3 w-1/3 bg-mist/40 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
