"use client"

import React, { FC, useState } from 'react';
import { HiMenuAlt3 } from "react-icons/hi"
import { IoHome } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { HiMiniShoppingBag } from "react-icons/hi2";
import { IoIosNotifications } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import Link from 'next/link'

const SideBar: FC = () => {
    const menus = [
        { name: "Home", link: '/category', icon: IoHome },
        { name: "Shopping Cart", link: '/cart', icon: FaCartShopping },
        { name: "Order", link: '/order', icon: HiMiniShoppingBag },
        { name: "Notification", link: '/', icon: IoIosNotifications },
        { name: "Settings", link: '/', icon: IoSettingsSharp }
    ]
    const [open, setOpen] = useState(true);
    return (
        <div className={`h-[calc(100vh-100px)] ${open ? 'w-[220px]' : 'w-[65px]'} duration-500 bg-[#8CCC8C] text-gray-100 px-3`}>
            <div className="py-3 flex justify-end">
                <HiMenuAlt3 size={25} className="cursor-pointer" onClickCapture={() => setOpen(!open)} />
            </div>
            <div className="mt-5 flex flex-col gap-2 relative text-white font-semibold">
                {
                    menus?.map((menu, i) => (
                        <Link href={menu?.link} key={i} className="flex items-center text-sm gap-4 font-semibold p-2 hover:bg-[#4DA14D] rounded-md group">
                            <div>{React.createElement(menu?.icon, { size: "25" })}</div>
                            <h2
                                style={{
                                    transitionDelay: `${i + 3}00ms`
                                }}
                                className={`whitespace-pre duration-500 text-base ${!open && 'opacity-0 translate-x-10 overflow-hidden'}`}
                            >
                                {menu?.name}
                            </h2>
                            <h2
                                className={`${open && "hidden"} absolute left-40 bg-white whitespace-pre text-[#4DA14D] rounded-md drop-shadow-lg 
                                px-0 py-0 w-0 overflow-hidden group-hover:px-3 group-hover:py-1 group-hover:left-16 group-hover:duration-300 group-hover:w-fit`}
                                style={{
                                    zIndex: 10, // Tambahkan z-index yang lebih tinggi
                                }}
                            >
                                {menu?.name}
                            </h2>

                        </Link>

                    ))
                }

            </div>
        </div>
    );
};

export default SideBar;
