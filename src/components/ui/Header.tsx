import React, { FC } from 'react';
import { FaShoppingBasket } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import ProfilePic from '@/../public/cat-profile.jpg';
import Searchbar from './SearchBar';

const Header: FC = () => {
    return (
        <div className="h-[100px] w-full bg-[#4DA14D] flex items-center justify-between px-4 md:px-8">
            {/* Left Section */}
            <div className="flex items-center space-x-4 md:space-x-8 w-full">
                {/* Logo */}
                <Link href="/home" className="flex items-center">
                    <FaShoppingBasket size={50} className="text-[#e9e35c]" />
                    <div className="ml-2 md:ml-4 leading-tight">
                        <h1 className="text-white text-lg md:text-xl font-bold">Groceries</h1>
                        <p className="text-white text-lg md:text-xl font-bold mt-[-4px]">Store</p>
                    </div>
                </Link>

                {/* Searchbar */}
                <div className="flex-1">
                    <Searchbar />
                </div>
            </div>

            {/* Right Section */}
            <Link
                href="/profile"
                className="flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-[#267126] transition-colors duration-300"
            >
                <Image
                    src={ProfilePic}
                    alt="User Profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                />
                <p className="text-white font-semibold text-sm md:text-lg">User Profile</p>
            </Link>
        </div>
    );
};

export default Header;
