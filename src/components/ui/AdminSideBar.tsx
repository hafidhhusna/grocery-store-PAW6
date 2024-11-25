"use client"

import React, { FC, useState } from 'react';
import { HiMenuAlt3 } from "react-icons/hi";
import { AiFillProduct } from "react-icons/ai";  // Icon for our product
import { HiMiniShoppingBag } from "react-icons/hi2";  // Icon for orders
import { TbLogout2 } from "react-icons/tb";  // Log Out icon
import Link from 'next/link';
import { signOut } from 'next-auth/react';  // Import the signOut function

const AdminSidebar: FC = () => {
    const menus = [
        { name: "Our Product", link: '/our-product', icon: AiFillProduct },
        { name: "Orders", link: '/orders', icon: HiMiniShoppingBag },
    ];
    const [open, setOpen] = useState(true);

    return (
        <div className={`h-[calc(100vh-100px)] ${open ? 'w-[220px]' : 'w-[65px]'} duration-500 bg-[#8CCC8C] text-gray-100 px-3 flex flex-col`}>
            <div className="py-3 flex justify-end">
                <HiMenuAlt3 size={25} className="cursor-pointer" onClickCapture={() => setOpen(!open)} />
            </div>
            <div className="mt-5 flex flex-col gap-2 text-white font-semibold flex-grow">
                {
                    menus?.map((menu, i) => (
                        <Link href={menu?.link} key={i} className="flex items-center text-sm gap-4 font-semibold p-2 hover:bg-[#4DA14D] rounded-md group relative">
                            <div>{React.createElement(menu?.icon, { size: "25" })}</div>
                            <h2
                                style={{
                                    transitionDelay: `${i + 3}00ms`
                                }}
                                className={`whitespace-pre duration-500 text-base ${!open && 'opacity-0 translate-x-10 overflow-hidden'}`}
                            >
                                {menu?.name}
                            </h2>

                            {/* Pop-up effect for menu items */}
                            <h2
                                className={`${open && "hidden"} absolute left-40 bg-white whitespace-pre text-[#4DA14D] rounded-md drop-shadow-lg 
                                px-0 py-0 w-0 overflow-hidden group-hover:px-3 group-hover:py-1 group-hover:left-16 group-hover:duration-300 group-hover:w-fit`}
                                style={{
                                    zIndex: 10, // Add higher z-index for pop-up effect
                                }}
                            >
                                {menu?.name}
                            </h2>
                        </Link>
                    ))
                }
            </div>

            {/* Log Out Menu at the Bottom */}
            <div className="mt-auto flex items-center text-sm gap-4 font-semibold p-2 hover:bg-[#4DA14D] rounded-md group relative" onClick={() => signOut({ callbackUrl: "/login" })}>
                <div>
                    <TbLogout2 size={25} />
                </div>
                <h2
                    className={`whitespace-pre duration-500 text-base ${!open && 'opacity-0 translate-x-10 overflow-hidden'}`}
                >
                    Log Out
                </h2>

                {/* Pop-up effect for Log Out */}
                <h2
                    className={`${open && "hidden"} absolute left-40 bg-white whitespace-pre text-[#4DA14D] rounded-md drop-shadow-lg 
                    px-0 py-0 w-0 overflow-hidden group-hover:px-3 group-hover:py-1 group-hover:left-16 group-hover:duration-300 group-hover:w-fit`}
                    style={{
                        zIndex: 10, // Add higher z-index for pop-up effect
                    }}
                >
                    Log Out
                </h2>
            </div>
            <div className="mt-3" />
        </div>
    );
};

export default AdminSidebar;
