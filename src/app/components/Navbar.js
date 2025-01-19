"use client";

import { useState } from "react";
import GoogleSignIn from "./GoogleSignIn";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoginModal } from "../redux/e-commerce/authSlice";
import Image from "next/image";

export default function Navbar() {
  const dispatch = useDispatch();
  const { profile, isLoginModalOpen } = useSelector((state) => state.auth);
  const { cartItemCount } = useSelector((state) => state.AddToCart);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  // const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  // const [profile, setProfile] = useState(null);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const toggleModal = () => setModalOpen(!isModalOpen);
  const handleToggleLoginModal = () => dispatch(toggleLoginModal(!isLoginModalOpen));
  // const toggleLoginModal = () => setLoginModalOpen(!isLoginModalOpen);

  return (
    <>
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-4">
              {/* Logo */}
              {/* Mobile button goes here */}
              <div className="lg:hidden flex items-center">
                <button onClick={toggleSidebar} className="mobile-menu-button">
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
              <div>
                <Link href="/" className="flex items-center py-5 px-2 text-gray-700">
                  <svg className="h-6 w-6 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4V16M8 8h8M6 12h12" />
                  </svg>
                  <span className="font-bold">Logo</span>
                </Link>
              </div>
            </div>

            {/* Primary Navbar items */}
            <div className="hidden lg:flex items-center space-x-1">
              <Link href="/" className="py-5 px-3 text-gray-700">
                Menu Item 1
              </Link>
              <Link href="/" className="py-5 px-3 text-gray-700">
                Menu Item 2
              </Link>
              <Link href="/" className="py-5 px-3 text-gray-700">
                Menu Item 3
              </Link>
              <Link href="/" className="py-5 px-3 text-gray-700">
                Menu Item 4
              </Link>
            </div>

            {/* Secondary Navbar items */}
            <div className="flex items-center space-x-1">
              {/* hidden md:flex */}
              <button onClick={toggleModal} className="py-5 px-3">
                <svg className="h-6 w-6 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 21h4M6 18l1.4-1.4A9 9 0 0112 3m0 0a9 9 0 014.6 13.6L18 18M9 9h.01M15 9h.01M12 15h.01"
                  />
                </svg>
              </button>
              <Link href="/cart" className="py-5 px-3 relative">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" width="20" height="20">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                </svg>
                {cartItemCount > 0 && (
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{cartItemCount}</span>
                )}
              </Link>
              {profile !== null && profile?.picture ? (
                <div>
                  <Image src={`${profile?.picture}`} className="rounded-full w-10" alt="profile" width={40} height={40} />
                </div>
              ) : (
                <button onClick={handleToggleLoginModal} className="py-2 px-3 bg-[#057C80] text-white rounded hover:bg-opacity-90 transition duration-300">
                  Log In
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${isSidebarOpen ? "block" : "hidden"} lg:hidden`}>
          <div className="bg-white w-screen h-screen fixed inset-0 z-50 flex flex-col  items-center">
            {/* justify-center */}
            <div className="flex justify-end  w-full p-4">
              {/* <span className="font-bold mx-auto">Menu</span> */}
              <button onClick={toggleSidebar}>
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex justify-between  w-full p-4">
              <span className="font-bold mx-auto">Menu</span>
              {/* <button onClick={toggleSidebar}>
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button> */}
            </div>
            <div className="flex flex-col items-center">
              <Link href="/" className="py-2 text-gray-700">
                Menu Item 1
              </Link>
              <Link href="/" className="py-2 text-gray-700">
                Menu Item 2
              </Link>
              <Link href="/" className="py-2 text-gray-700">
                Menu Item 3
              </Link>
              <Link href="/" className="py-2 text-gray-700">
                Menu Item 4
              </Link>
            </div>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-start justify-center z-50">
            <div className="bg-white w-full max-w-md mt-20 p-4 rounded">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl">Search</h2>
                <button onClick={toggleModal}>
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <input type="text" className="w-full border border-gray-300 p-2 rounded" placeholder="Search..." />
            </div>
          </div>
        )}
        {/* Login Modal */}
        {isLoginModalOpen && (
          <div className="px-4 fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            {/* max-w-6xl mx-auto */}
            <div className="bg-white w-full max-w-md p-6 rounded shadow-lg transform transition-all duration-300 ease-in-out">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Login</h2>
                <button onClick={handleToggleLoginModal}>
                  <svg
                    className="w-6 h-6 hover:text-red-500 transition duration-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <GoogleSignIn toggleLoginModal={handleToggleLoginModal} />
                {/* <button className="bg-[#057C80] text-white px-6 py-3 rounded shadow-md hover:bg-opacity-90 transition duration-300">Sign in with Google</button> */}
                <span className="text-center text-sm">
                  Admin?{" "}
                  <Link
                    href="/login"
                    className="relative text-[#057C80] after:content-['']  after:absolute after:left-0 after:bottom-0 after:w-full after:h-[0.5px] after:bg-[#057C80] after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
                  >
                    Login here
                  </Link>
                </span>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            {/* Left: Logo & Mobile Menu *}
            <div className="flex space-x-4">
              <div className="lg:hidden flex items-center">
                <button onClick={toggleSidebar} className="mobile-menu-button">
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
              <div>
                <a href="/" className="flex items-center py-5 px-2 text-gray-700">
                  <svg className="h-6 w-6 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4V16M8 8h8M6 12h12" />
                  </svg>
                  <span className="font-bold">Logo</span>
                </a>
              </div>
            </div>

            {/* Middle: Navbar Items *}
            <div className="hidden lg:flex items-center space-x-1">
              <a href="/" className="py-5 px-3 text-gray-700">
                Home
              </a>
              <a href="/services" className="py-5 px-3 text-gray-700">
                Services
              </a>
              <a href="/doctors" className="py-5 px-3 text-gray-700">
                Doctors
              </a>
              <a href="/contact" className="py-5 px-3 text-gray-700">
                Contact
              </a>
            </div>

            {/* Right: Icons & Login *}
            <div className="flex items-center space-x-1">
              <button onClick={toggleModal} className="py-5 px-3">
                <svg className="h-6 w-6 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 21h4M6 18l1.4-1.4A9 9 0 0112 3m0 0a9 9 0 014.6 13.6L18 18M9 9h.01M15 9h.01M12 15h.01" />
                </svg>
              </button>
              <a href="/cart" className="py-5 px-3 relative">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" width="20" height="20">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                </svg>
                {cartItemCount > 0 && (
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{cartItemCount}</span>
                )}
              </a>
              {profile ? (
                <img src={profile?.picture} className="rounded-full w-10" alt="profile" />
              ) : (
                <button onClick={toggleLoginModal} className="py-2 px-3 bg-[#057C80] text-white rounded hover:bg-opacity-90 transition duration-300">
                  Log In
                </button>
              )}
            </div>
          </div>
        </div>
      </nav> */}
    </>
  );
}
