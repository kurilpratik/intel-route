import Link from "next/link";

function Navbar() {
  return (
    <nav>
      <Link href="/">Home</Link> | <Link href="/pages/about">About</Link> |{" "}
      <Link href="/pages/contact">Contact</Link>
    </nav>
  );
}

export default Navbar;
