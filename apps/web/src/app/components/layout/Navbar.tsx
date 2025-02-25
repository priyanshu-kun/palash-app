// components/Navbar.tsx
"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Bell, ShoppingCart } from 'lucide-react';
import {SecondaryButton} from "@/app/components/ui/buttons/index";
import { useRouter } from 'next/navigation'

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const router = useRouter();


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navigateToAuth = () => {
        // e.e.preventDefault();
        router.push('/sign-in');
    }

    return (
        <nav className={`fixed top-10 left-1/2 rounded-lg w-full max-w-[90%] z-10 transition-all -translate-x-1/2 duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-gray-100'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-xl font-bold">
                            PALASH
                        </Link>
                    </div>

                    <div className='flex items-center justify-center  '>
                        {/* Search Bar */}
                        <div className="hidden md:block flex-1 max-w-md mx-8">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-800" />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-10 pr-3 py-2 border  border-gray-600 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-800 placeholder:font-semibold text-sm   focus:border-transparent max-w-[160px]"
                                    placeholder="Search"
                                />
                            </div>
                        </div>

                        {/* Navigation Links */}
                        <div className="hidden md:flex text-sm font-semibold items-center space-x-8">
                            <Link href="/admin-dashboard/services" className="text-gray-500  hover:text-gray-900">
                               Admin 
                            </Link>
                            <Link href="/services" className="text-gray-500 hover:text-gray-900">
                                Wellness Programs
                            </Link>
                            <Link href="https://palash-app-forum.vercel.app/" target='__blank' className="text-gray-500 hover:text-gray-900">
                                Community Forum
                            </Link>
                            <Link href="/about" className="text-gray-500 hover:text-gray-900">
                                About
                            </Link>
                        </div>
                    </div>


                    {/* Right Section */}
                    <div className="flex items-center space-x-4">
                        {/* <button className="p-2 rounded-full hover:bg-gray-100">
                            <Bell className="h-6 w-6 text-gray-600" />
                        </button>
                        <button className="p-2 rounded-full hover:bg-gray-100">
                            <ShoppingCart className="h-6 w-6 text-gray-600" />
                        </button> */}
                        <SecondaryButton onClick={() => navigateToAuth()} className=" px-8  border-gray-600 font-semibold text-gray-800  hover:bg-gray-100 ">
                            Sign in &#8594;
                        </SecondaryButton>
                    </div>
                </div>
            </div>

            {/* Mobile Search (Visible on small screens) */}
            <div className="md:hidden px-4 pb-4">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Search"
                    />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;