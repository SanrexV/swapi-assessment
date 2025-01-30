"use client";

import { useEffect, useState } from "react";
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

export default function Content() {
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
    <div>
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
        <li>Click on the card to get more details.</li>
      </ol>

      <div className="flex gap-4 items-center flex-col sm:flex-row">
        <button className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44">
          Load Characters
        </button>
        <button className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44">
          Load Films
        </button>
      </div>

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

      {/* <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer> */}
    </div>
  );
}
