import { useMemo } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getFormatData } from "@/lib/utils";
import { usePlayer } from "@/hooks";
import { css } from "@emotion/react";

import {
  Title,
  IconButton,
  PatternBg,
  Genres,
  Contributors,
  MetaDetails,
  Skeletons,
} from "@/components";

export default function BannerSection(props) {
  const {
    details,
    hideActionButtons,
    tracks,
    type: typeAlt,
    showPattern,
    isLoading,
    isSuccess,
  } = props;

  const { playlistId, playlistType } = useSelector((state) => state.player);

  const { handlePlayPause, handleGetPlaylist, isPlaying } = usePlayer();

  const isCurrentPlaylist = useMemo(
    () => playlistId === details?.id && playlistType === details?.type,
    [details, playlistId, playlistType]
  );

  const trackFormatted = useMemo(() => getFormatData(tracks), [tracks]);

  const {
    image,
    name,
    type,
    desc,
    genres,
    contributors,
    tracksNo,
    albumsNo,
    fansNo,
    duration,
    releaseDate,
  } = getFormatData([details])?.[0] || [];

  const handleGetPlaylistFunc = () => {
    handleGetPlaylist({
      tracklist: trackFormatted,
      playlistId: details?.id,
      playlistType: details?.type,
      savePlay: true,
    });
  };

  return (
    <div
      css={css`
        position: relative;
      `}
    >
      {typeAlt !== "search" && (
        <div
          css={css`
            position: absolute;
            border-radius: var(--border-radius);
            width: 100%;
            height: 100%;
            background-color: var(--primary-opacity);
          `}
        />
      )}

      {isLoading && (
        <div>
          <Skeletons.HeaderBannerSectionSkeleton type={typeAlt} />
        </div>
      )}

      {isSuccess && details && (
        <div
          css={css`
            ${typeAlt === "search"
              ? `
              background-color: var(--cardBg);
              border-radius: var(--border-radius);
              padding: 1.5rem;
              `
              : `
              `}
          `}
        >
          {typeAlt === "search" && (
            <Title name={"Top Results"} type={"medium"} divider={false} />
          )}
          <div
            css={css`
              display: flex;
              overflow: hidden;
              position: relative;
              z-index: 10;
              flex-direction: column;
              gap: 1.5rem;
              align-items: center;
              @media (min-width: 450px) {
                flex-direction: row;
              }
              ${typeAlt !== "search"
                ? `
                border-bottom-width: 0px;
                border-color: var(--onNeutralBgDivider);
                padding: 1rem;
                `
                : `
                padding: 0px;
                `}
            `}
          >
            {showPattern && <PatternBg />}

            <img
              src={image}
              alt=""
              css={css`
                aspect-ratio: 1 / 1;
                height: 180px;
                width: 180px;
                --tw-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
                  0 8px 10px -6px rgb(0 0 0 / 0.1);
                --tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color),
                  0 8px 10px -6px var(--tw-shadow-color);
                box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
                  var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
                ${type === "artist"
                  ? `
                  border-radius: 9999px;
                  `
                  : `
                  border-radius: var(--border-radius);
                  `}
              `}
            />
            <div
              css={css`
                color: var(--onNeutralBg);
                display: flex;
                width: 100%;
                ${typeAlt === "search"
                  ? `
                  flex-direction: row; 
                  gap: 2rem; 
                  justify-content: flex-start; 
                  align-items: center; 

                  `
                  : `
                  flex-direction: column; 
                  justify-content: space-between; 
                  align-items: flex-start; 
                  `}
              `}
            >
              <div
                css={css`
                  gap: 0.5rem;
                `}
              >
                <div
                  css={css`
                    display: flex;
                    align-items: center;
                  `}
                >
                  <div
                    css={css`
                      display: block;
                      text-transform: capitalize;
                    `}
                  >
                    {type}
                  </div>
                  <Genres genres={genres?.data} />
                </div>
                <Title
                  name={name}
                  type="extra-large"
                  divider={false}
                  desc={desc || <Contributors contributors={contributors} />}
                />

                {typeAlt !== "search" && (
                  <MetaDetails
                    {...{ tracksNo, albumsNo, fansNo, duration, releaseDate }}
                  />
                )}
              </div>
              {!hideActionButtons && (
                <div
                  css={css`
                    display: flex;
                    gap: 1rem;
                  `}
                >
                  <IconButton
                    name={
                      isCurrentPlaylist
                        ? !isPlaying
                          ? "BsFillPlayFill"
                          : "BsFillPauseFill"
                        : "BsFillPlayFill"
                    }
                    css={css`
                      width: 2.5rem;
                      height: 2.5rem;
                      background-color: var(--primary);
                    `}
                    iconColor="--tw-text-opacity: 1 !important;
                    color: rgb(255 255 255 / var(--tw-text-opacity)) !important;"
                    size={25}
                    onClick={() => {
                      if (isCurrentPlaylist) {
                        handlePlayPause();
                      } else {
                        handleGetPlaylistFunc();
                      }
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
