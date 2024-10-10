import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-slate-800 text-white py-4 text-center">
        <h1 className="text-2xl font-bold">
          SeqNuc Nucleotide Sequence Database
        </h1>
      </header>

      <nav className="bg-slate-700 py-3">
        <div className="container mx-auto flex justify-around">
          <Link
            href="/"
            className="text-white hover:bg-teal-500 px-3 py-2 rounded transition duration-300"
          >
            Home
          </Link>
          <Link
            href="/browse"
            className="text-white hover:bg-teal-500 px-3 py-2 rounded transition duration-300"
          >
            Browse Sequences
          </Link>
          <Link
            href="/help"
            className="text-white hover:bg-teal-500 px-3 py-2 rounded transition duration-300"
          >
            Help
          </Link>
          <Link
            href="/about"
            className="text-white hover:bg-teal-500 px-3 py-2 rounded transition duration-300"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-white hover:bg-teal-500 px-3 py-2 rounded transition duration-300"
          >
            Contact
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8 flex-grow">{children}</main>

      <footer className="bg-slate-800 text-white py-4 text-center">
        <p>&copy; 2024 SeqNuc. All rights reserved.</p>
      </footer>
    </div>
  );
}
