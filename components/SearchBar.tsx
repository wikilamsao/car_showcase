"use client";

import { useState } from "react";
import SearchManufacturer from "./SearchManufacturer";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
  <button type="submit" className={`-ml-3 z-10 ${otherClasses}`}>
    <Image src="/magnifying-glass.svg" alt="Search" width={40} height={40} className="object-contain" />
  </button>
)

const SearchBar = (setManufacturer, setModel) => {
  const [serachManufacturer, setSerachManufacturer] = useState('');
  const [searchModel, setSearchModel] = useState('');

  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (serachManufacturer.trim() === "" && searchModel.trim() === "") {
      return alert("Please provide some input");
    }

    updateSearchParams(searchModel.toLowerCase(), serachManufacturer.toLowerCase());
  };

  const updateSearchParams = (model: string, manufacturer: string) => {
    // Create a new URLSearchParams object using the current URL search parameters
    const searchParams = new URLSearchParams(window.location.search);

    // Update or delete the 'model' search parameter based on the 'model' value
    if (model) {
      searchParams.set("model", model);
    } else {
      searchParams.delete("model");
    }

    // Update or delete the 'manufacturer' search parameter based on the 'manufacturer' value
    if (manufacturer) {
      searchParams.set("manufacturer", manufacturer);
    } else {
       searchParams.delete("manufacturer");
    }

    // Generate the new pathname with the updated search parameters
    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

    router.push(newPathname);
  };

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchManufacturer
          manufacturer={serachManufacturer}
          setManuFacturer={setSerachManufacturer}
        />

        <SearchButton otherClasses="sm:hidden" />
      </div>
      <div className="searchbar__item">
        <Image src="/model-icon.png" alt="car model" width={25} height={25} className="absolute w-[20px] h-[20px] ml-4" />
        <input type="text" name="model" value={searchModel}
          onChange={(e) => setSearchModel(e.target.value)}
          className="searchbar__input"
          placeholder="Tiguan" />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <SearchButton otherClasses='max-sm:hidden' />
    </form>
  )
}

export default SearchBar