interface Results {
  description: string;
  title?: string;
  name?: string;
  type: string;
}

interface AllCharacters {
  totalPages: number;
  prevUrl: string | null;
  nextUrl: string | null;
  currentPage: number;
  queryResults: Results[];
}

interface CharactersApiResponse {
  results: { name: string; title?: string }[];
  total_pages: number;
  previous: string | null;
  next: string | null;
}

const PAGE_LIMIT = 8;
const DEFAULT_PAGE_URL = `https://www.swapi.tech/api/people?page=1&limit=${PAGE_LIMIT}`;

export const fetchAllCharacters = async (
  pageUrl: string | null = DEFAULT_PAGE_URL
): Promise<AllCharacters> => {
  const emptyResponse = {
    totalPages: 0,
    prevUrl: null,
    nextUrl: null,
    currentPage: 0,
    queryResults: [],
  };

  if (pageUrl === null) {
    return emptyResponse;
  }

  try {
    const response = await fetch(pageUrl);

    if (!response.ok) {
      throw new Error(
        `Error fetching data: ${response.status} ${response.statusText}`
      );
    }

    const { results, total_pages, previous, next }: CharactersApiResponse =
      await response.json();

    return {
      totalPages: total_pages,
      prevUrl: previous,
      nextUrl: next,
      currentPage: Number(new URL(pageUrl).searchParams.get("page")) || 0,
      queryResults: results.map(({ name, title }) => ({
        description: "A person within the Star Wars universe",
        name,
        title,
        type: "character",
      })),
    };
  } catch (error) {
    console.error("Failed to fetch characters info: ", error);
    return emptyResponse;
  }
};

export const fetchAllFilms = async () => {
  try {
    const response = await fetch(
      `https://www.swapi.tech/api/films?page=1&limit=${PAGE_LIMIT}`
    );

    if (!response.ok) {
      throw new Error(
        `Error fetching data: ${response.status} ${response.statusText}`
      );
    }

    const { result: queryResults } = await response.json();

    if (!queryResults.length) {
      return [];
    }

    return queryResults.map(
      (result: { description: string; properties: { title: string } }) => {
        const {
          description,
          properties: { title },
        } = result;

        return {
          description,
          title,
          type: "film",
        };
      }
    );
  } catch (error) {
    console.error("Failed to fetch films info: ", error);
  }
};

export const fetchCharacterInfo = async (query: string) => {
  try {
    const response = await fetch(
      `https://www.swapi.tech/api/people/?name=${query}`
    );

    if (!response.ok) {
      throw new Error(
        `Error fetching data: ${response.status} ${response.statusText}`
      );
    }

    const { result: queryResults } = await response.json();

    if (!queryResults.length) {
      return [];
    }

    return queryResults.map(
      (result: { description: string; properties: { name: string } }) => {
        const {
          description,
          properties: { name },
        } = result;

        return {
          description,
          name,
          type: "character",
        };
      }
    );
  } catch (error) {
    console.error("Failed to fetch character info: ", error);
  }
};

export const fetchFilmInfo = async (query: string) => {
  try {
    const response = await fetch(
      `https://www.swapi.tech/api/films/?title=${query}`
    );

    if (!response.ok) {
      throw new Error(
        `Error fetching data: ${response.status} ${response.statusText}`
      );
    }

    const { result: queryResults } = await response.json();

    if (!queryResults.length) {
      return [];
    }

    return queryResults.map(
      (result: { description: string; properties: { title: string } }) => {
        const {
          description,
          properties: { title },
        } = result;

        return {
          description,
          title,
          type: "film",
        };
      }
    );
  } catch (error) {
    console.error("Failed to fetch film info: ", error);
  }
};
