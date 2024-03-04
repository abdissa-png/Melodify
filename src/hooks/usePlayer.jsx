import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import useLocalStorage from "use-local-storage";
import { useSelector, useDispatch } from "react-redux";
import {
  useSaveRecentPlayed,
  useFetchTracks,
  useUpdateAccountPlayer,
} from "@/lib/actions";
import {
  getNextTrack,
  getPlaylist,
  getPrevTrack,
  getIsLooping as setIsLooping,
  getIsShuffle as setIsShuffle,
  getOnAudioEnd as setOnAudioEnd,
  updateTrackIndex,
} from "@/lib/store/slices";
import { getFormatData } from "@/lib/utils";

const formatTime = (seconds) => {
  if (seconds === Infinity) {
    return "--";
  }
  const floored = Math.floor(seconds);
  let from = 14;
  let length = 5;
  if (floored >= 3600) {
    from = 11;
    length = 8;
  }

  return new Date(floored * 1000).toISOString().substr(from, length);
};

let autoplay = false;
export default function usePlayer() {
  const [melodifyPlayer, setMelodifyPlayer] = useLocalStorage("player");
  const dispatch = useDispatch();

  const { currentUser } = useSelector((store) => store.currentUser);
  const { user, userId } = currentUser || {};

  const accountPlayer = user?.player;

  const {
    load,
    togglePlayPause,
    mute,
    muted,
    volume,
    setVolume,
    isReady,
    duration,
    seek,
    stop,
    playing,
    getPosition,
  } = useGlobalAudioPlayer();

  const {
    tracklist,
    playlistId,
    playlistType,
    trackIndex,
    isLooping,
    isShuffle,
  } = useSelector((store) => store.player);

  const { updatePlayer } = useUpdateAccountPlayer();

  const { fetchTracks } = useFetchTracks();

  const { saveRecentPlayed } = useSaveRecentPlayed();

  const [vol, setVol] = useState(volume);
  const [pos, setPos] = useState(0);
  const [timer, setTimer] = useState(0);

  const frameRef = useRef();
  const audioBarContainerRef = useRef(null);

  const currentTrack = tracklist?.[trackIndex];

  const { audioSrc } = currentTrack || {};

  const usePlayerInit = () => {
    useEffect(() => {
      if (currentTrack?.audioSrc) {
        load(audioSrc, {
          autoplay,
          loop: true,
          onend: () => handleOnAudioEnd(),
          initialVolume: vol,
        });
      }
    }, [currentTrack, autoplay]);

    useEffect(() => {
      const animate = () => {
        setPos(getPosition());
        frameRef.current = requestAnimationFrame(animate);
      };
      frameRef.current = window.requestAnimationFrame(animate);
      return () => {
        if (frameRef.current) {
          cancelAnimationFrame(frameRef.current);
        }
      };
    }, []);

    useEffect(() => {
      const i = setInterval(() => {
        setTimer(getPosition());
      }, 500);
      return () => clearInterval(i);
    }, [getPosition]);

    useEffect(() => {
      setVolume(vol);
    }, [setVolume, vol]);

    useEffect(() => {
      if (userId && melodifyPlayer) {
        updatePlayer(melodifyPlayer);
      }
    }, [userId]);

    useEffect(() => {
      if (playlistId && trackIndex) {
        const playerD = {
          trackIndex,
          playlistId,
          playlistType,
          isLooping,
          isShuffle,
          imageAlt: accountPlayer?.imageAlt || null,
        };
        setMelodifyPlayer(playerD);
        updatePlayer(playerD);
      }
    }, [playlistId, tracklist, trackIndex, isLooping, isShuffle]);

    useEffect(() => {
      if (accountPlayer) {
        const callback = (tracks) => {
          dispatch(
            getPlaylist({
              tracklist: getFormatData(tracks, accountPlayer?.imageAlt),
              playlistId: accountPlayer?.playlistId,
              playlistType: accountPlayer?.playlistType,
              trackIndex: accountPlayer?.trackIndex,
            })
          );
        };

        fetchTracks({
          id: accountPlayer?.playlistId,
          type: accountPlayer?.playlistType,
          callback,
        });
      }
    }, [accountPlayer]);
  };

  const handleUpdateTrackindex = (trackIndex) => {
    dispatch(updateTrackIndex(trackIndex));
  };

  const handlePlayPause = () => {
    togglePlayPause();
  };

  const handleNext = () => {
    dispatch(getNextTrack());
    autoplay = true;
  };

  const handleOnAudioEnd = () => {
    dispatch(setOnAudioEnd());
    autoplay = true;
  };

  const handlePrev = () => {
    dispatch(getPrevTrack());
    autoplay = true;
  };

  const handleSetVolume = useCallback(
    (slider) => {
      const volValue = parseFloat((Number(slider) / 100).toFixed(2));
      mute(volValue === 0);
      setVol(volValue);
      setVolume(volValue);
    },
    [mute, setVolume]
  );

  const handleVolumeMute = () => {
    mute(!muted);
  };

  const handleSeek = useCallback(
    (event) => {
      const { clientX: eventOffsetX } = event;

      if (audioBarContainerRef.current) {
        const elementWidth = audioBarContainerRef?.current?.clientWidth;
        const elementOffsetX =
          audioBarContainerRef?.current?.getBoundingClientRect().left;

        const percent = (eventOffsetX - elementOffsetX) / elementWidth;
        seek(percent * duration);
      }
    },
    [duration, playing, seek]
  );

  const handleLoop = () => {
    dispatch(setIsLooping());
  };

  const handleShuffle = () => {
    dispatch(setIsShuffle());
  };

  const progressBarWidth = useMemo(() => {
    if (isReady && duration) {
      return (pos / duration) * 100;
    }
  }, [duration, isReady, pos]);

  const getTimer = `${formatTime(timer)} / ${formatTime(duration)}`;

  const handleGetPlaylist = (data) => {
    autoplay = true;

    if (data?.tracklist) {
      dispatch(getPlaylist(data));
    }

    if (data?.savePlay) {
      saveRecentPlayed({
        [data?.playlistId]: {
          id: data?.playlistId,
          type: data?.playlistType,
        },
      });
      const playerD = {
        trackIndex: 0,
        playlistId: data?.playlistId,
        playlistType: data?.playlistType,
        imageAlt: data?.imageAlt,
        isLooping,
        isShuffle,
      };
      setMelodifyPlayer(playerD);
      updatePlayer(playerD);
    }
  };

  return {
    handleUpdateTrackindex,
    handlePlayPause,
    handleNext,
    handlePrev,
    handleSetVolume,
    handleVolumeMute,
    handleGetPlaylist,
    handleSeek,
    handleLoop,
    handleShuffle,
    progressBarWidth,
    usePlayerInit,
    currentTrack,
    tracklist,
    volume: vol,
    isPlaying: playing,
    stop,
    audioSrc,
    getTimer,
    audioBarContainerRef,
    isLooping,
    isShuffle,
  };
}
