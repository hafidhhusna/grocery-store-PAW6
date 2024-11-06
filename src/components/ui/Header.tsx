import React, { FC } from 'react';
import { FaShoppingBasket } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import ProfilePic from '@/../public/cat-profile.jpg';
import Searchbar from './SearchBar';

const Header: FC = () => {
    return (
        <div className="h-[100px] w-full bg-[#4DA14D] flex items-center justify-between px-8">
            <div className="flex items-center">
                <Link href="/home" className="flex items-center">
                    <FaShoppingBasket size={60} style={{ color: '#e9e35c' }} />
                    <div className="ml-4 leading-tight">
                        <h1 className="text-white text-xl font-bold">Groceries</h1>
                        <p className="text-white text-xl font-bold mt-[-4px]">Store</p>
                    </div>
                </Link>
                <div className="ml-10">
                    <Searchbar />
                </div>
            </div>
            <Link href="/profile" className="flex items-center space-x-2">
                <Image src={ProfilePic} alt="User Profile" width={40} height={40} className="rounded-full" />
                <p className="text-white font-semibold text-lg">User Profile</p>
            </Link>
        </div>
    );
};

export default Header;
