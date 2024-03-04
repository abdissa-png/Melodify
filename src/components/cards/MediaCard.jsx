import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import { useSelector } from "react-redux";
import { useFetchTracks } from "@/lib/actions";
import { getFormatData, truncate } from "@/lib/utils";
import { usePlayer } from "@/hooks";

import { Icon, MetaDetailsMediaCard } from "@/components";

export default function MediaCard({ item, type }) {
  const navigate = useNavigate();

  const { playlistId, playlistType } = useSelector((state) => state.player);

  const { fetchTracks, isSubmitting, getId } = useFetchTracks();

  const { handlePlayPause, handleGetPlaylist, isPlaying } = usePlayer();

  const isTypeTopClick = useMemo(
    () => ["genre", "artist"].includes(type),
    [type]
  );

  const isTitleCentered = useMemo(
    () => ["artist", "playlist", "genre"].includes(type),
    [type]
  );

  return (
    <div
      className="media_card"
      css={css`
        --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
        --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
        box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
          var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
        padding: 0.75rem;
        border-radius: var(--border-radius);
        background-color: var(--cardBg);
        background-color: var(--cardBgHover);
        transition-duration: 300ms;
        transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
        cursor: pointer;
      `}
      onClick={() => {
        if (!["radio"]?.includes(type)) {
          navigate(`/${type}/${item?.id}`);
        }
      }}
    >
      <div
        css={css`
          position: relative;
        `}
      >
        <div
          className="shadow_card"
          css={css`
            height: 100%;
            width: 100%;
            overflow: hidden;
            ${type === "artist"
              ? `border-radius: 9999px;`
              : `border-radius: var(--border-radius);`}
          `}
        >
          {item.image ? (
            <img
              src={item.image}
              css={css`
                object-fit: cover;
                aspect-ratio: 1 / 1;
                width: 100%;
                ${type === "artist"
                  ? `border-radius: 9999px;`
                  : `border-radius: var(--border-radius);`}
              `}
              width={100}
              height={100}
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
                align-items: center;
                justify-content: center;
                background-color: var(--cardBg);
                ${type === "artist"
                  ? `border-radius: 9999px;`
                  : `border-radius: var(--border-radius);`}
              `}
            >
              <Icon
                name="BsMusicNoteBeamed"
                size={60}
                css={css`
                  color: var(--onNeutralBgSecondary) !important;
                `}
              />
            </div>
          )}
          {!isTypeTopClick && (
            <div
              css={css`
                position: absolute;
                --tw-translate-y: -30%;
                transform: translate(
                    var(--tw-translate-x),
                    var(--tw-translate-y)
                  )
                  rotate(var(--tw-rotate)) skewX(var(--tw-skew-x))
                  skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x))
                  scaleY(var(--tw-scale-y));
                --tw-translate-x: -50%;
                transform: translate(
                    var(--tw-translate-x),
                    var(--tw-translate-y)
                  )
                  rotate(var(--tw-rotate)) skewX(var(--tw-skew-x))
                  skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x))
                  scaleY(var(--tw-scale-y));
                top: 50%;
                left: 50%;
              `}
            >
              {playlistId === item.id && playlistType === type ? (
                <button
                  className="primary_linear"
                  css={css`
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 2.5rem;
                    height: 2.5rem;
                    border-radius: 9999px;
                    --tw-shadow: 0 3px 5px -1px rgb(0 0 0 / 10%),
                      0 6px 10px 0 rgb(0 0 0 / 10%),
                      0 1px 18px 0 rgb(0 0 0 / 12%);
                    --tw-shadow-colored: 0 3px 5px -1px var(--tw-shadow-color),
                      0 6px 10px 0 var(--tw-shadow-color),
                      0 1px 18px 0 var(--tw-shadow-color);
                    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
                      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
                    background: linear-gradient(
                      var(--primary-light-gray),
                      var(--primary)
                    );
                  `}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayPause();
                  }}
                >
                  <Icon
                    name={isPlaying ? "BsFillPauseFill" : "BsFillPlayFill"}
                    css={css`
                      --tw-text-opacity: 1 !important;
                      color: rgb(
                        255 255 255 / var(--tw-text-opacity)
                      ) !important;
                    `}
                    size={24}
                  />
                </button>
              ) : (
                <button
                  className="play_button"
                  css={css`
                    height: 2.5rem;
                    width: 2.5rem;
                    border-radius: 9999px;
                    --tw-shadow: rgba(0 0 0 0.2) 0 3px 5px -1px,
                      rgba(0 0 0 0.14) 0 6px 10px 0,
                      rgba(0 0 0 0.12) 0 1px 18px 0;
                    --tw-shadow-colored: 0 3px 5px -1px var(--tw-shadow-color),
                      0 6px 10px 0 var(--tw-shadow-color),
                      0 1px 18px 0 var(--tw-shadow-color);
                    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
                      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(
                      var(--primary-light-gray),
                      var(--primary)
                    );
                    transition-property: all;
                    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
                    transition-duration: 150ms;
                    ${isSubmitting && getId == item?.id
                      ? `--tw-translate-y: 0px;
                        transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));`
                      : `--tw-translate-y: 7rem;
                        transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));`}
                    visibility: hidden;
                  `}
                  disabled={isSubmitting}
                  onClick={(e) => {
                    e.stopPropagation();
                    const callback = (tracks) => {
                      handleGetPlaylist({
                        tracklist: getFormatData(tracks, item?.image),
                        playlistId: item?.id,
                        playlistType: item?.type,
                        savePlay: true,
                        imageAlt: item?.image,
                      });
                    };
                    fetchTracks(
                      { id: item?.id, type: item?.type, callback },
                      callback
                    );
                  }}
                >
                  <Icon
                    name={
                      isSubmitting
                        ? "HiOutlineDotsHorizontal"
                        : "BsFillPlayFill"
                    }
                    css={css`
                      --tw-text-opacity: 1 !important;
                      color: rgb(
                        255 255 255 / var(--tw-text-opacity)
                      ) !important;
                    `}
                    size={24}
                  />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      <div
        className="desc"
        css={css`
          margin-top: 1rem;
          ${isTitleCentered ? `text-align: center;` : `text-align: left;`}
        `}
      >
        <h6
          css={css`
            font-size: 0.875rem;
            line-height: 1.25rem;
            font-weight: 600;
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

        <MetaDetailsMediaCard
          fansNo={item?.fansNo}
          tracksNo={item?.tracksNo}
          releaseDate={item?.releaseDate}
          albumsNo={item?.albumsNo}
          type={type}
        />
      </div>
    </div>
  );
}
