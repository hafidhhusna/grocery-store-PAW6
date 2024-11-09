"use client";

import React, { useState } from "react";
import { PiPencilSimpleLineBold } from "react-icons/pi";
import { IoPersonAddSharp } from "react-icons/io5";
import Header from "@/components/ui/Header"; // Adjust path if needed
import SideBar from "@/components/ui/SideBar"; // Adjust path if needed

const ProfilePage: React.FC = () => {
    const [profileImage, setProfileImage] = useState<string | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <Header />

            <div className="flex flex-1">
                {/* Sidebar */}
                <SideBar />

                {/* Profile Content */}
                <div className="flex-1 p-8 bg-gray-100 overflow-y-auto">
                    <h1 className="text-2xl text-[#666876] font-semibold mb-8">Profile</h1>

                    <div className="flex gap-8 justify-center">
                        {/* Profile Picture Section */}
                        <div className="flex-none w-1/4 bg-white rounded-xl overflow-hidden border-2 border-yellow-300 flex justify-center items-center relative">
                            <div className="absolute top-8 left-0 right-0 flex justify-center">
                                {profileImage ? (
                                    <img
                                        src={profileImage}
                                        alt="Profile"
                                        className="w-[260px] h-[260px] object-cover rounded-full border-4 border-yellow-300"
                                    />
                                ) : (
                                    <div className="w-[260px] h-[260px] bg-gray-300 rounded-full flex items-center justify-center text-6xl text-gray-400">
                                        <IoPersonAddSharp />
                                    </div>
                                )}
                            </div>

                            {/* Edit Profile Button */}
                            <label
                                htmlFor="upload-profile-image"
                                className="absolute top-[calc(50%+55px)] left-1/2 transform -translate-x-1/2 text-center bg-[#8CCC8C] p-2 rounded-full border border-gray-300 cursor-pointer hover:bg-[#4DA14D]"
                            >
                                <PiPencilSimpleLineBold className="text-white" />
                                <input
                                    type="file"
                                    id="upload-profile-image"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>

                            {/* Profile Name and Email */}
                            <div className="absolute bottom-4 left-4 flex flex-col items-start mb-4">
                                <p className="text-lg font-semibold text-gray-600">Your Full Name</p>
                                <p className="text-base text-[#666876]">youremail@gmail.com</p>
                            </div>
                        </div>

                        {/* Profile Details and Address Section (Right Side) */}
                        <div className="flex flex-col w-3/4 gap-6">
                            {/* Profile Details */}
                            <div className="w-full p-6 bg-white border border-yellow-300 rounded-md shadow-sm relative">
                                {/* Button Edit Profile */}
                                <button className="absolute top-4 right-4 text-sm flex items-center gap-1 px-2 py-1 rounded-md bg-[#D9D9D9] text-[#666876] hover:bg-[#666876] hover:text-white">
                                    <PiPencilSimpleLineBold />
                                    Edit Profile
                                </button>

                                <div className="flex">
                                    {/* Label group on the left */}
                                    <div className="text-gray-600 font-semibold space-y-2">
                                        <p>Username</p>
                                        <p>Full Name</p>
                                        <p>Email</p>
                                        <p>Password</p>
                                    </div>

                                    {/* Value group on the right */}
                                    <div className="ml-8 text-[#666876] space-y-2">
                                        <p>yourusername</p>
                                        <p>Your Full Name</p>
                                        <p>youremail@gmail.com</p>
                                        <p>************</p>
                                    </div>
                                </div>
                            </div>

                            {/* Address Section */}
                            <div className="h-[250px] w-full p-6 bg-white border border-yellow-300 rounded-md shadow-sm relative">
                                <h2 className="text-gray-600 font-semibold mb-4">Address</h2>

                                {/* Edit Address Button */}
                                <button className="absolute top-4 right-4 text-sm flex items-center gap-1 px-2 py-1 rounded-md bg-[#D9D9D9] text-[#666876] hover:bg-[#666876] hover:text-white">
                                    <PiPencilSimpleLineBold />
                                    Edit Address
                                </button>

                                <div className="text-[#666876] space-y-2">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
