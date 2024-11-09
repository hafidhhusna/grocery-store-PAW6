"use client"

import React, { FC } from 'react';
import { IoIosWarning, IoIosClose } from 'react-icons/io';

interface WarningMessagePopupProps {
    title: string;
    description: string;
    onClose: () => void;
}

const WarningMessagePopup: FC<WarningMessagePopupProps> = ({ title, description, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="relative bg-white border border-gray-300 rounded-lg shadow-lg p-8 w-116">
                <button onClick={onClose} aria-label="Close" className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
                    <IoIosClose size={28} />
                </button>
                <div className="flex flex-col items-center text-center">
                    <IoIosWarning size={120} className="text-[#ffd966] mb-2" />
                    <h2 className="text-2xl font-semibold text-gray-800 mb-1">{title}</h2>
                    <p className="text-gray-600">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default WarningMessagePopup;

