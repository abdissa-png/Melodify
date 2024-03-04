import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { useFetchTracks } from "@/lib/actions";
import {
  formatDateString,
  formatNumWithCommas,
  getFormatData,
  truncate,
  pluralize,
} from "@/lib/utils";
import { usePlayer } from "@/hooks";
import { css } from "@emotion/react";
import { Icon, IconButton } from "@/components";

const imageDimsOpt = {
  16: "height:4rem; width:4rem;",
  20: "height:5rem; width:5rem;",
  28: "height:7rem; width:7rem;",
};

export default function MediaCardMinified({
  item,
  type,
  imageDims = 16,
  isMyPlaylist,
}) {
  const navigate = useNavigate();
  const { playlistId, playlistType } = useSelector((state) => state.player);

  const { handlePlayPause, handleGetPlaylist, isPlaying } = usePlayer();

  const { fetchTracks, isSubmitting } = useFetchTracks();

  const isCurrentPlaylist =
    playlistId === item.id && item.type.includes(playlistType);

  return (
    <li
      css={css`
        grid-column: span 1 / span 1;
      `}
      onClick={() => {
        navigate(`/${type}/${item?.id}`);
      }}
    >
      <div
        className="media_card"
        css={css`
          position: relative;
          padding-left: 0.75rem;
          padding-right: 0.75rem;
          padding-top: 0.75rem;
          padding-bottom: 0.75rem;
          transition-property: all;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 150ms;
          transition-duration: 300ms;
          cursor: pointer;
          background-color: var(--cardBg);
          border-color: var(--onNeutralBgDivider);
          &:hover {
            border-radius: var(--border-radius);
            background-color: var(--cardBgHover);
          }
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            gap: 0.75rem;
          `}
        >
          <div
            css={css`
              position: relative;
              ${imageDimsOpt[imageDims]}
            `}
          >
            <div
              css={css`
                position: absolute;
                width: 100%;
                height: 100%;
                &:hover {
                  background-color: var(--neutralBg);
                  opacity: 0.7;
                }
                ${(isCurrentPlaylist
                  ? "background-color: var(--neutralBg); opacity: 0.5;"
                  : "background-color: transparent;",
                type === "artist"
                  ? "border-radius: 9999px;"
                  : "border-radius: var(--border-radius);")}
              `}
            />
            {item.image ? (
              <img
                src={item.image}
                className="shadow_card"
                css={css`
                  object-fit: cover;
                  aspect-ratio: 1 / 1;
                  height: 100%;
                  width: 100%;
                  ${type === "artist"
                    ? "border-radius: 9999px;"
                    : "border-radius: var(--border-radius);"}
                `}
                alt="image"
              />
            ) : (
              <div
                css={css`
                  object-fit: cover;
                  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
                    0 4px 6px -4px rgb(0 0 0 / 0.1);
                  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color),
                    0 4px 6px -4px var(--tw-shadow-color);
                  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
                    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
                  aspect-ratio: 1 / 1;
                  height: 100%;
                  width: 100%;
                  display: flex;
                  items-center: center;
                  justify-content: center;
                  ${type === "artist"
                    ? "border-radius: 9999px;"
                    : "border-radius: var(--border-radius);"}
                `}
              >
                <Icon
                  name="BsMusicNoteBeamed"
                  size={40}
                  css={css`
                    color: var(--onNeutralBgSecondary) !important;
                  `}
                />
              </div>
            )}
            {(!isMyPlaylist || (playlistId === item.id && isMyPlaylist)) && (
              <div
                css={css`
                  position: absolute;
                  top: 0px;
                  width: 100%;
                  height: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                `}
              >
                <IconButton
                  className="play_button"
                  name={
                    isCurrentPlaylist
                      ? isPlaying
                        ? isSubmitting
                          ? "HiOutlineDotsHorizontal"
                          : "BsFillPauseFill"
                        : "BsFillPlayFill"
                      : "BsFillPlayFill"
                  }
                  css={css`
                    border-radius: 9999px;
                    height: 2.25rem;
                    width: 2.25rem;
                    background-color: var(--primary);
                    visibility: hidden;
                  `}
                  iconColor="--tw-text-opacity: 1 !important;
                  color: rgb(255 255 255 / var(--tw-text-opacity)) !important;"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isCurrentPlaylist) {
                      handlePlayPause();
                    } else {
                      const callback = (tracks) => {
                        handleGetPlaylist({
                          tracklist: getFormatData(tracks, item?.image),
                          playlistId: item?.id,
                          playlistType: item?.type,
                          savePlay: !isMyPlaylist,
                          imageAlt: item?.image,
                        });
                      };
                      fetchTracks({ id: item?.id, type: item?.type, callback });
                    }
                  }}
                />
              </div>
            )}
          </div>
          <div
            css={css`
              display: flex;
              align-items: flex-start;
              justify-content: space-between;
              flex: 1 1 0%;
              width: 100%;
            `}
          >
            <div
              css={css`
                display: flex;
                flex-direction: column;
              `}
            >
              <h6
                css={css`
                  font-size: 0.875rem;
                  line-height: 1.25rem;
                  color: var(--onNeutralBg);
                `}
              >
                {truncate(item?.name, 18)}
              </h6>
              {item?.desc && (
                <p
                  css={css`
                    font-size: 0.875rem;
                    line-height: 1.25rem;
                    font-weight: 400;
                    color: var(--onNeutralBgSecondary);
                  `}
                >
                  {truncate(item?.desc || "", 20)}
                </p>
              )}
              {(item?.tracksNo ||
                item?.releaseDate ||
                item?.fansNo ||
                item?.albumsNo) && (
                <>
                  {["artist"].includes(type) ? (
                    <p
                      css={css`
                        margin-top: 0.25rem;
                        font-size: 0.75rem;
                        line-height: 1rem;
                        color: var(--onNeutralBgSecondary);
                      `}
                    >
                      {item?.fansNo && (
                        <span>{formatNumWithCommas(item?.fansNo)} fans</span>
                      )}
                      {item?.albumsNo && (
                        <span>
                          &nbsp;&nbsp;{item?.albumsNo}{" "}
                          {pluralize("album", item?.albumsNo)}
                        </span>
                      )}
                    </p>
                  ) : (
                    <p
                      css={css`
                        margin-top: 0.25rem;
                        font-size: 0.75rem;
                        line-height: 1rem;
                        color: var(--onNeutralBgSecondary);
                      `}
                    >
                      {`${item?.tracksNo}` && (
                        <span>
                          {`${item?.tracksNo || 0}`}{" "}
                          {pluralize("track", item?.tracksNo)}
                        </span>
                      )}
                      {item?.releaseDate && (
                        <span>
                          &nbsp;&nbsp;{formatDateString(item?.releaseDate)}
                        </span>
                      )}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
