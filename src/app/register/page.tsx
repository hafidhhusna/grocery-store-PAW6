"use client"

import { IoPerson, IoLockClosed, IoMail } from "react-icons/io5";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from "react";

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Tambahkan logika register di sini
    router.push('/dashboard');  
  };

  return (
    <div className="h-screen flex justify-center items-center bg-cover bg-center" style={{ backgroundImage: 'url(/background-green.png)' }}>
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-semibold text-center mb-1 text-[#333333]">Register</h1>
        <p className="text-sm text-center text-[#666666] mb-4">Create your account</p>
        
        <form className="space-y-4" onSubmit={handleRegister}>

          <div className="flex items-center border border-gray-300 rounded-md p-2">
            <IoPerson className="text-[#666666] mr-2" />
            <input
              name="username"
              type="text"
              placeholder="Username"
              className="w-full bg-transparent text-[#666666] focus:outline-none"
              value={form.username}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-md p-2">
            <IoMail className="text-[#666666] mr-2" />
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full bg-transparent text-[#666666] focus:outline-none"
              value={form.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-md p-2">
            <IoLockClosed className="text-[#666666] mr-2" />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full bg-transparent text-[#666666] focus:outline-none"
              value={form.password}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-md p-2">
            <IoLockClosed className="text-[#666666] mr-2" />
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              className="w-full bg-transparent text-[#666666] focus:outline-none"
              value={form.confirmPassword}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col space-y-2 mt-4">
            <button type="submit" className="bg-[#79CC79] text-white font-semibold p-2 rounded-md">Register</button>
          </div>
          
          <div className="text-center mt-4">
            <span className="text-sm text-[#666666]">Already have an account? </span>
            <Link href="/login" className="text-[#79CC79] text-sm font-semibold underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
