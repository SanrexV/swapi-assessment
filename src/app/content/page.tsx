"use client";

import { useState } from "react";
import { fetchAllCharacters, fetchAllFilms } from "@swapi-app/utils/loadData";
import Card from "@swapi-app/components/card/card";
import Paginator from "@swapi-app/components/paginator/paginator";

interface Results {
  description: string;
  title?: string;
  name?: string;
  type: string;
}

interface PaginatorProps {
  totalPages: number;
  prevUrl: string | null;
  nextUrl: string | null;
  currentPage: number;
}

const DEFAULT_PAGINATOR_PROPS = {
  totalPages: 0,
  prevUrl: "",
  nextUrl: "",
  currentPage: 1,
};

export default function Content() {
  const [resultsData, setResultsData] = useState<Results[]>([]);
  const [paginatorData, setPaginatorData] = useState<PaginatorProps>(
    DEFAULT_PAGINATOR_PROPS
  );

  const handleOnClick = async (resourceType: string) => {
    if (resourceType === "characters") {
      const { totalPages, prevUrl, nextUrl, currentPage, queryResults } =
        await fetchAllCharacters();

      setResultsData(queryResults);
      setPaginatorData({ totalPages, prevUrl, nextUrl, currentPage });
    }

    if (resourceType === "films") {
      const allFilms: Results[] = await fetchAllFilms();
      setResultsData(allFilms);
      setPaginatorData(DEFAULT_PAGINATOR_PROPS);
    }
  };

  const handleOnPagination = async (pageUrl: string | null) => {
    const { totalPages, prevUrl, nextUrl, currentPage, queryResults } =
      await fetchAllCharacters(pageUrl);

    setResultsData(queryResults);
    setPaginatorData({ totalPages, prevUrl, nextUrl, currentPage });
  };

  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-5xl font-bold mb-20">Content Page</h1>

      <ol className="list-inside list-decimal text-start font-[family-name:var(--font-geist-mono)] mb-6">
        <li className="mb-2">
          Select between{" "}
          <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
            Characters
          </code>{" "}
          or{" "}
          <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
            Films
          </code>
          .
        </li>
        <li>Enjoy!</li>
      </ol>

      <div className="flex gap-4 items-center flex-col sm:flex-row mb-10">
        <button
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
          onClick={() => handleOnClick("characters")}
        >
          Load Characters
        </button>
        <button
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
          onClick={() => handleOnClick("films")}
        >
          Load Films
        </button>
      </div>

      <div
        className={`grid grid-cols-1 sm:grid-cols-${
          resultsData.length < 2 ? resultsData.length : "2"
        } md:grid-cols-${
          resultsData.length < 3 ? resultsData.length : "3"
        } lg:grid-cols-${
          resultsData.length < 4 ? resultsData.length : "4"
        } gap-5`}
      >
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
      {!!paginatorData.totalPages && (
        <div>
          <Paginator
            currentPage={paginatorData.currentPage}
            nextUrl={paginatorData.nextUrl}
            prevUrl={paginatorData.prevUrl}
            totalPages={paginatorData.totalPages}
            handlePagination={handleOnPagination}
          />
        </div>
      )}
    </div>
  );
}
