const BASE_URL = "https://api.themoviedb.org/3";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
  },
};

export const getPopularMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/movie/popular?language=en-US&page=1`,
    options,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch popular movies");
  }

  return response.json();
};

export const getTrendingMovies = async () => {
  const response = await fetch(`${BASE_URL}/trending/movie/week`, options);

  if (!response.ok) {
    throw new Error("Failed to fetch trending movies");
  }

  return response.json();
};

export const getUpcomingMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/movie/upcoming?language=en-US&page=1`,
    options,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch upcoming movies");
  }

  return response.json();
};

export const getIndianMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/discover/movie?with_original_language=hi&sort_by=popularity.desc`,
    options,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch Indian movies");
  }

  return response.json();
};

export const getMalayalamMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/discover/movie?with_original_language=ml&sort_by=popularity.desc`,
    options,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch Malayalam movies");
  }

  return response.json();
};

export const getTrendingMovie = async () => {
  const response = await fetch(`${BASE_URL}/trending/movie/week`, options);

  if (!response.ok) {
    throw new Error("Failed to fetch trending movie");
  }

  const data = await response.json();

  return data.results[0];
};

export const getMovieDetails = async (movieId) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?language=en-US&append_to_response=credits,videos`,
    options,
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.status_message || "Failed to fetch movie details");
  }

  return data;
};

export const searchMovies = async (query, page = 1) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(
      query,
    )}&language=en-US&page=${page}`,
    options,
  );

  if (!response.ok) {
    throw new Error("Failed to search movies");
  }

  return response.json();
};

export const getAllMovies = async (page = 1) => {
  const response = await fetch(
    `${BASE_URL}/discover/movie?language=en-US&sort_by=popularity.desc&page=${page}`,
    options,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  return response.json();
};

export const getMovieCertification = async (movieId) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/release_dates`,
    options,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch certification");
  }

  const data = await response.json();

  return data.results;
};

export const getIndianCertification = async (movieId) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/release_dates`,
    options,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch certification");
  }

  const data = await response.json();

  const india = data.results.find((country) => country.iso_3166_1 === "IN");

  return india?.release_dates?.[0]?.certification || null;
};

export const getMovieTrailer = async (movieId) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/videos?language=en-US`,
    options,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movie videos");
  }

  const data = await response.json();

  const trailer = data.results?.find(
    (video) =>
      video.site === "YouTube" &&
      video.type === "Trailer" &&
      video.official === true,
  );

  return trailer || null;
};

export const getPersonDetails = async (person_id) => {
  const response = await fetch(`${BASE_URL}/person/${person_id}`, options);

  if (!response.ok) {
    throw new Error("Failed to fetch person details");
  }

  const data = await response.json();

  return data;
};

export const getMovieWatchProviders  = async (movie_id) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movie_id}/watch/providers`,
    options,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch provider details");
  }

  const data = await response.json();

  return data;
};

// export const getProductionDetails = async (Production_id) => {
//   const response = await fetch(
//     `${BASE_URL}/production/${Production_id}`,
//     options,
//   );

//   if (!response.ok) {
//     throw new Error("Failed to fetch Production Company details");
//   }

//   const data = await response.json();

//   return data;
// };
