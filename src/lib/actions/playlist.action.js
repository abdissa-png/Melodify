import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import useSWR from "swr";
import { arrayUnion, serverTimestamp } from "@firebase/firestore";

import { elementInArray } from "@/lib/utils";
import {
  fbSetDoc,
  fbGetDoc,
  fbUpdateDoc,
  fbGetCollection,
} from "@/lib/helpers";

import { auth } from "@/configs";

import { fetchMultiplePlaylists } from "./editorial.action";

// recent played
export const useSaveRecentPlayed = () => {
  const userId = auth?.currentUser?.uid
  const fetcher = async (playlist) => {
    if (!userId) {
      throw new Error('Invalid params');
    }

    try {
      const recentPlayedRef = await fbGetDoc({
        collection: "recentPlayed",
        id: userId,
      });

      if (recentPlayedRef.exists()) {
        const { playlist_ids } = recentPlayedRef.data() || {};
        const notInArray = elementInArray(playlist_ids, playlist);

        if (!notInArray) {
          const playlistIdsData = [playlist, ...playlist_ids].slice(0, 6);

          await fbUpdateDoc({
            collection: "recentPlayed",
            id: userId,
            data: {
              playlist_ids: playlistIdsData,
            },
          });
        }
      } else {
        await fbSetDoc({
          collection: "recentPlayed",
          id: userId,
          data: {
            user_id: userId,
            playlist_ids: arrayUnion(playlist),
            created_at: serverTimestamp(),
          },
        });
      }
    } catch (error) {
      console.error(error);
      throw new Error('Failed to save recent played');
    }
  };

  return {
    saveRecentPlayed:fetcher,
  };
};

export const useFetchRecentPlayed = () => {
  const { currentUser } =useSelector((store)=>store.currentUser);
  const { userId } = currentUser || {};

  const fetcher = async () => {
    if (userId) {
      try {
        const recentPlayedRef = await fbGetDoc({
          collection: "recentPlayed",
          id: userId,
        });

        if (recentPlayedRef.exists()) {
          const data = recentPlayedRef.data().playlist_ids;
          return await fetchMultiplePlaylists(data);
        } else {
          return null;
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    } else {
      return null;
    }
  };

  const { data, error, isValidating } = useSWR(userId ? ["recentPlayed", { userId }] : null, fetcher);

  return { isPending: isValidating, isSuccess: Boolean(data), isError: Boolean(error), isFetching: isValidating, error, data };
};

// fetch playlists
export const useFetchMyPlaylists = () => {
  const { currentUser } =useSelector((store)=>store.currentUser);
  const { userId } = currentUser || {};

  const navigate = useNavigate();

  const fetcher = async () => {
    if (userId) {
      try {
        const myPlaylistsRef = await fbGetCollection({
          collection: "myPlaylists",
          whereQueries: [["user_id", "==", userId]],
          orderByQueries: [["created_at", "desc"]],
        });

        return myPlaylistsRef.docs.map((i) => {
          const s = i.data();
          return { ...s, id: i.id, created_at: s.created_at.toDate() };
        });
      } catch (error) {
        navigate("/");
        throw error;
      }
    } else {
      return null;
    }
  };

  const { data, error, isValidating } = useSWR(["myPlaylists",{ userId, navigate }], fetcher);

  return { isPending: isValidating, isSuccess: Boolean(data), isError: Boolean(error), isFetching: isValidating, error, data };
};

