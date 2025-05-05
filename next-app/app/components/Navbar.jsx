import Link from "next/link";

function Navbar() {
  return (
    <nav className="sticky top-0 flex items-center py-4 pr-4 justify-between bg-white">
      <Link href="/" className="mr-4">
        <h1 className="text-xl font-bold">🔮IntelRoute</h1>
      </Link>
      <ul className="flex space-x-8 font-medium text-gray-700">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </ul>
    </nav>
  );
}

export default Navbar;
