"use client";

import { useState } from "react";
import SearchBox from "@swapi-app/components/searchBox/searchBox";
import { fetchCharacterInfo, fetchFilmInfo } from "@swapi-app/utils/loadData";
import Card from "@swapi-app/components/card/card";

interface Results {
  description: string;
  title?: string;
  name?: string;
  type: string;
}

export default function Home() {
  const [resultsData, setResultsData] = useState<Results[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;

    setIsLoading(true);
    setShowErrorMessage(false);

    try {
      const [characterInfo, filmInfo] = await Promise.all([
        fetchCharacterInfo(query),
        fetchFilmInfo(query),
      ]);
      const mergedResultsData = [...characterInfo, ...filmInfo];

      setResultsData(mergedResultsData);
      setShowErrorMessage(mergedResultsData.length === 0);
    } catch (error) {
      console.error("Error fetching data:", error);
      setShowErrorMessage(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-5xl font-bold mb-20">Star Wars Searchbox</h1>
      <ol className="list-inside list-decimal text-start font-mono mb-6">
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
        <li>
          Looking for the full list? Navigate to the{" "}
          <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
            Content
          </code>{" "}
          page in the menu!
        </li>
      </ol>

      <div className="mb-10">
        <SearchBox onSearch={handleSearch} />
      </div>

      {isLoading ? (
        <h2 className="text-2xl font-semibold">Loading...</h2>
      ) : showErrorMessage ? (
        <h2 className="text-2xl font-semibold">
          Oops... there is no info for that search
        </h2>
      ) : (
        <div className="grid grid-cols-1 gap-5">
          {resultsData.map(({ description, title, name, type }, idx) => (
            <Card
              key={`${type}-${idx}`}
              description={description}
              title={title || name || "No Name"}
              imageUrl={`/${type}.jpg`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
