export const fetchAllCharacters = async () => {
  let id = 1;
  const baseUrl = "https://www.swapi.tech/api/people/";
  const results = [];

  while (true) {
    try {
      const response = await fetch(`${baseUrl}${id}`);

      if (!response.ok) {
        throw new Error(
          `Error fetching data: ${response.status} ${response.statusText}`
        );
      }

      const { result } = await response.json();
      const {
        description,
        properties: { name },
      } = result;

      if (!result) {
        break;
      }
      results.push({ description, name });
      console.log(`Fetched person ${id}: `, name);
      id++;
    } catch (error) {
      console.error(`Error fetching person ${id}:`, error);
      break;
    }
  }

  return results;
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
