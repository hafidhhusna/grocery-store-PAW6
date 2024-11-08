"use client"

import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/navigation';
import { IoPerson } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";

export default function Login() {
  const router = useRouter();

  const handleRegisterRedirect = () => {
    router.push('/signin'); 
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();  
    router.push('/dashboard');  
  };

  const handleGoogleSignIn = () => {
    router.push('/signin-google');  // Ubah sesuai routes/logika login with google
  };

  const handleGuestRedirect = () => {
    router.push('/dashboard');  
  };

  return (
    <div className="h-screen flex justify-center items-center bg-cover bg-center" style={{ backgroundImage: 'url(/background-green.png)' }}>
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-semibold text-center mb-4 text-[#666876]">Login to your account</h1>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="flex items-center border border-gray-300 rounded-md p-2">
            <IoPerson className="text-[#666876] mr-2" />
            <input
              id="username"
              type="text"
              placeholder="Username"
              className="w-full bg-transparent text-[#666876] focus:outline-none"
            />
          </div>
          <div className="flex items-center border border-gray-300 rounded-md p-2 mt-4">
            <RiLockPasswordFill className="text-[#666876] mr-2" />
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="w-full bg-transparent text-[#666876] focus:outline-none"
            />
          </div>
          <a href="#" className="text-[#666876] text-xs font-semibold inline-block">Forgot Password?</a>
          <div className="flex flex-col space-y-2 mt-4">
            <button type="submit" className="bg-[#79CC79] text-white font-semibold p-2 rounded-md">Login</button>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center bg-white border border-gray-300 p-2 rounded-md"
            >
              <FcGoogle className="mr-2" />
              <span className="text-[#666876] font-semibold">Sign in with Google</span>
            </button>
            <div className="text-center">
              <span className="text-sm text-[#666876]">Don't have an account? </span>
              <button
                onClick={handleRegisterRedirect}
                className="text-[#79CC79] text-sm font-semibold underline"
              >
                Register
              </button>
            </div>
            <div className="text-center">
              <button
                onClick={handleGuestRedirect}
                className="text-[#666876] text-sm font-semibold"
              >
                Continue as Guest
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
