"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-neutral-900 shadow-md p-4 sticky top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white">
          Factored Assessment
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-white hover:text-gray-500">
            Home
          </Link>
          <Link href="/content" className="text-white hover:text-gray-500">
            Content
          </Link>
          <Link href="#" className="text-white hover:text-gray-500">
            Services
          </Link>
          <Link href="#" className="text-white hover:text-gray-500">
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-600 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t mt-2 shadow-sm">
          <Link
            href="/"
            className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
          >
            Home
          </Link>
          <Link
            href="#"
            className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
          >
            About
          </Link>
          <Link
            href="#"
            className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
          >
            Services
          </Link>
          <Link
            href="#"
            className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
