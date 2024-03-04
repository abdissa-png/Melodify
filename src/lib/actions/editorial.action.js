import useSWR,{mutate} from 'swr';
import { apiQuery } from "@/lib/helpers";
import { useState } from "react";
function getStatus(data,error) {
  const isPending = !data && !error;
  const isSuccess = data && !error;
  const isError = error;
  const isFetching = !error && !data;
  return {isPending,isSuccess,isError,isFetching};
}
export const useFetchTopCharts = (params) => {
  const { id, section } = params ?? {};

  if (!(id && section)) {
    throw new Error("Invalid params");
  }

  const fetcher = async () => {
    const data = await apiQuery({
      endpoint: `editorial/${id}/${section}`,
    });

    let resp;
    if (["charts"].includes(section)) {
      resp = data;
    } else {
      resp = { [section]: data };
    }

    return resp;
  };

  const { data, error } = useSWR(["topCharts", params], fetcher);

  const {isPending,isError,isFetching,isSuccess}=getStatus(data,error)

  return { isPending, isSuccess, isError, isFetching, error, data };
};
export const useFetchNewReleases = ({ id }) => {
    if (!id) {
      throw new Error("Invalid params");
    }
  
    const fetcher = async () => {
      try {
        const data = await apiQuery({
          endpoint: `editorial/${id}/releases`,
        });
  
        return { ["releases"]: data };
      } catch (error) {
        throw error;
      }
    };
  
    const { data, error } = useSWR([`newReleases_${id}`, { id }], fetcher);
  
    const {isPending,isError,isFetching,isSuccess}=getStatus(data,error)
  
    return { isPending, isSuccess, isError, isFetching, error, data };
  };

export const useFetchTopSelection = ({ id }) => {
    if (!id) {
      throw new Error("Invalid params");
    }
  
    const fetcher = async () => {
      try {
        const data = await apiQuery({
          endpoint: `editorial/${id}/selection`,
        });
  
        return { ["selection"]: data };
      } catch (error) {
        throw error;
      }
    };
  
    const { data, error } = useSWR([`topSelection_${id}`, { id }], fetcher);
  
    const {isPending,isError,isFetching,isSuccess}=getStatus(data,error)
  
    return { isPending, isSuccess, isError, isFetching, error, data };
};
export const useFetchGenres = () => {
  
    const fetcher = async () => {
      try {
        const response = await apiQuery({
          endpoint: `genre`,
        });

        return response?.data?.filter((item) => item.name !== "All");
      } catch (error) {
        throw error;
      }
    };
  
    const { data, error } = useSWR(["genres"], fetcher);
  
    const {isPending,isError,isFetching,isSuccess}=getStatus(data,error)
  
    return { isPending, isSuccess, isError, isFetching, error, data };
};
export const useFetchGenreById = ({ id }) => {
    if (!id) {
      throw new Error("Invalid params");
    }
  
    const fetcher = async () => {
      try {
        const data = await apiQuery({
          endpoint: `genre/${id}`,
        });
  
        return data;
      } catch (error) {
        throw error;
      }
    };
  
    const { data, error } = useSWR([`genreById_${id}`, { id }], fetcher);
  
    const {isPending,isError,isFetching,isSuccess}=getStatus(data,error)
  
    return { isPending, isSuccess, isError, isFetching, error, data };
};
export const useFetchGenreBySection = ({ id, section }) => {
    if (!(id && section)) {
      throw new Error("Invalid params");
    }
  
    const fetcher = async () => {
      try {
        const data = await apiQuery({
          endpoint: `genre/${id}/${section}`,
        });
  
        return data;
      } catch (error) {
        throw error;
      }
    };
  
    const { data, error } = useSWR([`genreBySection_${section}_${id}`, { id, section }], fetcher);
  
    const {isPending,isError,isFetching,isSuccess}=getStatus(data,error)
  
    return { isPending, isSuccess, isError, isFetching, error, data };
};
export const useFetchArtist = ({ id }) => {
    if (!id) {
      throw new Error("Invalid params");
    }
  
    const fetcher = async () => {
      try {
        const limit = "?limit=20";

          const [
            details,
            topTracks,
            albums,
            relatedArtists,
            playlists,
            radios,
          ] = await Promise.all([
            apiQuery({ endpoint: `artist/${id}` }),
            apiQuery({ endpoint: `artist/${id}/top${limit}` }),
            apiQuery({ endpoint: `artist/${id}/albums${limit}` }),
            apiQuery({ endpoint: `artist/${id}/related${limit}` }),
            apiQuery({ endpoint: `artist/${id}/playlists${limit}` }),
            apiQuery({ endpoint: `artist/${id}/radio` }),
          ]);

          return {
            details,
            topTracks,
            albums,
            relatedArtists,
            playlists,
            radios,
          };
      } catch (error) {
        throw error;
      }
    };
  
    const { data, error } = useSWR([`artist_${id}`, { id }], fetcher);
  
    const {isPending,isError,isFetching,isSuccess}=getStatus(data,error)
  
    return { isPending, isSuccess, isError, isFetching, error, data };
};
export const useFetchChartBySection = ({ id, section }) => {
    if (!(id && section)) {
      throw new Error("Invalid params");
    }
  
    const fetcher = async () => {
      try {
        const data = await apiQuery({
          endpoint: `chart/${id}/${section}`,
        });
  
        return data;
      } catch (error) {
        throw error;
      }
    };
  
    const { data, error } = useSWR([`chartsBySection_${section}_${id}`, { id, section }], fetcher);
  
    const {isPending,isError,isFetching,isSuccess}=getStatus(data,error)
  
    return { isPending, isSuccess, isError, isFetching, error, data };
};
export const useFetchPlaylists = ({ id, section }) => {
    if (!(id && section)) {
      throw new Error("Invalid params");
    }
  
    const fetcher = async () => {
      try {
        const data = await apiQuery({
          endpoint: `${section}/${id}`,
        });
  
        return data;
      } catch (error) {
        throw error;
      }
    };
  
    const { data, error } = useSWR([`playlist_${section}_${id}`, { id, section }], fetcher);
  
    const {isPending,isError,isFetching,isSuccess}=getStatus(data,error)
  
    return { isPending, isSuccess, isError, isFetching, error, data };
};
export const fetchMultiplePlaylists = async (data) => {
    try {
      if (!data) {
        throw new Error("Invalid params");
      }
      const mappedData = data.map(async (item) => {
        const values = Object.values(item)?.[0];
        const { id, type } = values;
  
        if (!id || !type) {
          throw new Error("Invalid params");
        }
        return await apiQuery({
          endpoint: `${type}/${id}`,
        });
      });
  
      return await Promise.all(mappedData);
    } catch (error) {
      throw error;
    }
};

export const useFetchTracks = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [getId, setGetId] = useState(null);

  // Fetcher function for useSWR
//   const fetcher = async (key) => {
//     const [type, id] = key;
//     if (!id || !type) return null;
//     setGetId(id);
//     const response = await apiQuery({
//       endpoint: `${type}/${id}/tracks`,
//     });
//     return response.data;
//   };

//   // Using useSWR for data fetching
//   const { data: tracks, error } = useSWR(getId && type ? [`tracks_${type}_${id}`,{type,id}] : null, fetcher);

  // Mutation function
  const fetchTracks = async (params) => {
    const { id, type, callback } = params || {};
    if (!id || !type) return;

    setIsSubmitting(true);
    try {
      setGetId(id);
      const response = await apiQuery({
        endpoint: `${type}/${id}/tracks`,
      });
      // After successful mutation, you might want to revalidate the data
      mutate([`tracks_${type}_${id}`,{type,id}], response.data, false);
      if (callback) callback(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    fetchTracks,
    isSubmitting,
    getId,
  };
};



export const useFetchSearch = ({ searchText }) => {
    if (!(searchText?.trim())) {
      // throw new Error("Invalid params");
      console.log("invalid params")
    }
  
    const fetcher = async () => {
      try {
        const limit = "";

        const [tracks, albums, artists, playlists, radios] = await Promise.all([
            apiQuery({
              endpoint: `search/track?q=${searchText}${limit}`,
            }),
            apiQuery({
              endpoint: `search/album?q=${searchText}${limit}`,
            }),
            apiQuery({
              endpoint: `search/artist?q=${searchText}${limit}`,
            }),
            apiQuery({
              endpoint: `search/playlist?q=${searchText}${limit}`,
            }),
            apiQuery({
              endpoint: `search/radio?q=${searchText}${limit}`,
            }),
          ]);
  
          return {
            tracks,
            albums,
            artists,
            playlists,
            radios,
          };
      } catch (error) {
        throw error;
      }
    };
  
    const { data, error } = useSWR(["fetchSearch", { searchText }], fetcher);
  
    const {isPending,isError,isFetching,isSuccess}=getStatus(data,error)
  
    return { isPending, isSuccess, isError, isFetching, error, data };
};