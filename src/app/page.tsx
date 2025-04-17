import TreeMap from "../components/tree-map"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-green-50 to-white">
      <header className="w-full bg-green-800 text-white py-4 px-4 md:px-6 shadow-md">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tight">Hyderabad Tree Map</h1>
          <p className="text-green-100 mt-1">Explore and discover the urban forest of Hyderabad</p>
        </div>
      </header>
      <div className="w-full max-w-7xl mx-auto flex-1 p-4 md:p-6">
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6">
          <div className="flex items-center gap-2 mb-4 text-green-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-tree-deciduous"
            >
              <path d="M8 19h8a4 4 0 0 0 3.8-2.8 4 4 0 0 0-1.6-4.5c1-1.1 1-2.7.4-4-.7-1.2-2.2-2-3.6-1.7a3 3 0 0 0-3-3 3 3 0 0 0-3 3c-1.4-.2-2.9.5-3.6 1.7-.7 1.3-.5 2.9.4 4a4 4 0 0 0-1.6 4.5A4 4 0 0 0 8 19Z" />
              <path d="M12 19v3" />
            </svg>
            <h2 className="text-xl font-semibold">Interactive Tree Explorer</h2>
          </div>
          <p className="text-slate-600 mb-6">
            Click on any tree marker to view detailed information about the tree species, health, and maintenance
            history. Discover the diverse urban forest that makes Hyderabad green.
          </p>
          <TreeMap />
        </div>
      </div>
      <footer className="w-full bg-green-900 text-green-100 py-4 px-6 text-center text-sm">
        <p>© {new Date().getFullYear()} Hyderabad Urban Forest Initiative | Data updated monthly</p>
      </footer>
    </main>
  )
}
