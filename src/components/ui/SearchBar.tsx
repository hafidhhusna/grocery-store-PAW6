"use client";

import React, { FC, useState, ChangeEvent } from "react";
import { FaSearch } from "react-icons/fa";
import { itemlist } from "@/lib/itemlist";
import { useRouter } from "next/navigation";

const Searchbar: FC = () => {
    const [activateSearch, setActivatedSearch] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const router = useRouter();

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value === "") {
            setActivatedSearch([]);
            return;
        }

        setActivatedSearch(
            itemlist.filter((w: string) => w.includes(value)).slice(0, 8)
        );
    };

    const handleSelect = (selectedValue: string) => {
        setSearchTerm(selectedValue);
        setActivatedSearch([]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm) {
            router.push(`/search?query=${searchTerm}`);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="relative w-full sm:w-[250px] md:w-[300px] lg:w-[400px]"
        >
            <div className="relative">
                <input
                    type="search"
                    value={searchTerm}
                    placeholder="Type to search"
                    className="w-full h-[40px] p-4 rounded-full text-gray-500 placeholder-gray-500"
                    onChange={handleSearch}
                />
                <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white text-gray-400 rounded-full"
                >
                    <FaSearch />
                </button>
            </div>

            {activateSearch.length > 0 && (
                <div className="absolute top-10 mt-2 p-3 bg-white text-gray-400 w-full rounded-xl left-1/2 -translate-x-1/2 flex flex-col gap-2 shadow-lg">
                    {activateSearch.map((s: string, index: number) => (
                        <span
                            key={index}
                            onClick={() => handleSelect(s)}
                            className="cursor-pointer p-2 w-full hover:bg-gray-200"
                        >
                            {s}
                        </span>
                    ))}
                </div>
            )}
        </form>
    );
};

export default Searchbar;
