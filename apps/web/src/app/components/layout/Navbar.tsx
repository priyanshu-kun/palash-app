// components/Navbar.tsx
"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Bell, ShoppingCart, User, LogOut, ExternalLink } from 'lucide-react';
import {PrimaryButton, SecondaryButton} from "@/app/components/ui/buttons/index";
import { useRouter, usePathname } from 'next/navigation'
import type { UserProfile } from '@/app/api/user';
import { clearTokens } from '@/app/utils/save-token';
import Logo from "@/app/assets/logo-light.png";
import Image from 'next/image';

interface NavbarProps {
    user: UserProfile | null;
    isLoading: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ user, isLoading }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

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
        <nav className={`fixed top-10 left-1/2 rounded-2xl w-full max-w-[90%]  z-50 transition-all -translate-x-1/2 duration-300 ${isScrolled ? 'bg-white/70 backdrop-blur-md shadow-md' : 'bg-gray-200'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-xl font-bold">
                            <Image
                                src={Logo}
                                alt="PALASH"
                                className="object-contain w-[100px]"
                                />
                        </Link>
                    </div>

                    <div className='flex items-center justify-center  '>
                        {/* Search Bar */}

                        {/* Navigation Links */}
                        <div className="hidden md:flex text-sm font-semibold items-center space-x-8">
                            <Link 
                                href="/" 
                                className={`text-gray-500 hover:text-gray-900 ${pathname === '/' ? 'text-gray-900 font-bold border-b-2 border-[#012b2b] underline' : ''}`}
                            >
                                Home
                            </Link>
                            {
                                user?.role === 'ADMIN' && (
                                    <Link 
                                        href="/admin-dashboard/services" 
                                        className={`text-gray-500 hover:text-gray-900 ${pathname.startsWith('/admin-dashboard') ? 'text-gray-900 font-bold border-b-2 border-[#012b2b] underline' : ''}`}
                                    >
                                        Admin 
                                    </Link>
                                )
                            }
                            <Link 
                                href="/services" 
                                className={`text-gray-500 hover:text-gray-900 ${pathname === '/services' ? 'text-gray-900 font-bold border-b-2 border-[#012b2b] underline' : ''}`}
                            >
                                Wellness Programs
                            </Link>
                            
                            <Link 
                                href="/pricing" 
                                className={`text-gray-500 hover:text-gray-900 ${pathname === '/pricing' ? 'text-gray-900 font-bold border-b-2 border-[#012b2b] underline' : ''}`}
                            >
                                Pricing
                            </Link>
                            <Link 
                                href="/about" 
                                className={`text-gray-500 hover:text-gray-900 ${pathname === '/about' ? 'text-gray-900 font-bold border-b-2 border-[#012b2b] underline' : ''}`}
                            >
                                About
                            </Link>
                        </div>
                    </div>


                    {/* Right Section */}
                    <div className="flex items-center space-x-4">
                        {isLoading ? (
                            <div className="h-10 w-24 bg-gray-200 animate-pulse rounded-full"></div>
                        ) : user ? (
                            <span className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100">

                                <span className="text-sm font-medium text-gray-600">Hey👋, @{user.name}</span>
                                <PrimaryButton onClick={() => {
                                    window.location.href = '/';
                                    clearTokens()
                                }} className='bg-red-400 hover:bg-red-500' startIcon={<LogOut size={16} color='white' />}>Logout</PrimaryButton>
                            </span>
                        ) : (
                            <SecondaryButton onClick={() => navigateToAuth()} className="px-8 border-gray-600 font-semibold text-gray-800 hover:bg-gray-100">
                                Sign in &#8594;
                            </SecondaryButton>
                        )}
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