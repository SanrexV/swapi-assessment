"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import SearchBox from "@swapi-app/components/searchBox/searchBox";
import {
  fetchAllCharacters,
  fetchCharacterInfo,
  fetchFilmInfo,
} from "@swapi-app/utils/loadData";
import Card from "@swapi-app/components/Card/Card";

interface Results {
  description: string;
  title?: string;
  name?: string;
  type: string;
}

export default function Home() {
  const [resultsData, setResultsData] = useState<Results[]>([]);

  useEffect(() => {
    // fetchAllCharacters();
  }, []);

  const handleSearch = async (query: string) => {
    console.log("Searching for:", query);

    const [characterInfo, filmInfo] = await Promise.all([
      fetchCharacterInfo(query),
      fetchFilmInfo(query),
    ]);

    setResultsData([...characterInfo, ...filmInfo]);
  };

  console.log("resultsData: ", resultsData);

  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-5xl font-bold mb-20">Star Wars Searchbox</h1>
      <ol className="list-inside list-decimal text-start font-[family-name:var(--font-geist-mono)] mb-6">
        <li className="mb-2">
          Search by{" "}
          <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
            character
          </code>{" "}
          or{" "}
          <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
            film
          </code>
          .
        </li>
        <li>Click on the card to get more details.</li>
      </ol>

      <div className="mb-10">
        <SearchBox onSearch={handleSearch} />
      </div>

      {resultsData && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {resultsData.map((result, idx: number) => {
            const { description, title, name, type } = result;
            return (
              <Card
                description={description}
                title={title || name || "No Name"}
                imageUrl={`/${type}.jpg`}
                key={idx}
              />
            );
          })}
        </div>
      )}
      {!resultsData.length && (
        <h2 className="text-2xl font-semibold">
          Oops... there is no info for that search
        </h2>
      )}
    </div>
  );
}
