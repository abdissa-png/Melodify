import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeTrackFromMyPlaylistRequest,
  addTrackToMyPlaylistRequest,
} from "@/lib/store/slices";
import { useFetchMyPlaylists } from "@/lib/actions";
import { formatDuration, formatIndexToDouble, truncate } from "@/lib/utils";

import { IconButton, DropdownMenu, Icon } from "@/components";

const MoreButtonDropDown = ({
  trackId,
  type,
  myPlaylistId,
  imageUrl,
  artistId,
  albumId,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.currentUser);
  const { userId } = currentUser || {};
  const addToMyPlaylist = (value) => {
    dispatch(addTrackToMyPlaylistRequest(value));
  };
  const deleteTrackFromMyPlaylist = (value) => {
    dispatch(removeTrackFromMyPlaylistRequest({ userId, ...value }));
  };
  const [openAddPlaylist, setAddPlaylist] = useState(false);

  const { loading: isSubmittingAddToPlaylist } = useSelector(
    (store) => store.myPlaylist
  );

  const { data: myPlaylists } = useFetchMyPlaylists();

  return (
    <DropdownMenu
      DropdownTrigger={() => (
        <div
          css={css`
            position: relative;
          `}
        >
          <div
            css={css`
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: var(--border-radius);
              width: 2rem;
              height: 2rem;
              &:hover {
                background-color: var(--neutralBgAlt);
              }
            `}
          >
            <Icon
              name="TbPlaylistAdd"
              css={css`
                color: var(--onNeutralBg);
              `}
              size={26}
            />
          </div>
        </div>
      )}
      DropdownContent={() => (
        <div className="p-1">
          {!openAddPlaylist ? (
            <div>
              <button
                css={css`
                  padding: 0.5rem;
                  border-radius: var(--border-radius);
                  width: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  &:hover {
                    background-color: var(--cardBgHover);
                  }
                `}
                onClick={() => setAddPlaylist(true)}
              >
                <span
                  css={css`
                    white-space: nowrap;
                  `}
                >
                  Add to playlist
                </span>
                <Icon name="MdArrowRight" size={20} />
              </button>

              {[
                ...(myPlaylistId
                  ? [
                      {
                        label: "Remove from this playlist",
                        onClick: () => {
                          deleteTrackFromMyPlaylist({
                            trackD: {
                              [trackId]: {
                                id: trackId,
                                type,
                              },
                            },
                            id: myPlaylistId,
                          });
                        },
                      },
                    ]
                  : []),
                {
                  label: "Go to artist",
                  onClick: () => {
                    navigate(`/artist/${artistId}`);
                  },
                },
                {
                  label: "Go to album",
                  onClick: () => {
                    navigate(`/album/${albumId}`);
                  },
                },
              ].map((item) => (
                <button
                  key={item.label}
                  css={css`
                    display: flex;
                    padding: 0.5rem;
                    border-radius: var(--border-radius);
                    width: 100%;
                    text-align: left;

                    &:hover {
                      background-color: var(--cardBgHover);
                    }
                  `}
                  onClick={() => item.onClick()}
                >
                  <span
                    css={css`
                      white-space: nowrap;
                    `}
                  >
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div>
              <IconButton
                name="MdOutlineKeyboardArrowLeft"
                style="&:hover {
                    background-color: var(--neutralBg);
                  }"
                onClick={() => setAddPlaylist(false)}
              />
              <div>
                <button
                  css={css`
                    display: flex;
                    padding: 0.5rem;
                    gap: 0.5rem;
                    align-items: center;
                    border-radius: var(--border-radius);
                    border-bottom-width: 1px;
                    width: 100%;
                    font-weight: 600;
                    text-align: left;
                    white-space: nowrap;
                    border-color: var(--onNeutralBgDivider);
                    &:hover {
                      background-color: var(--cardBgHover);
                    }
                  `}
                  onClick={() => navigate("/my-playlist")}
                >
                  Create a playlist
                  <Icon name="IoMdAddCircle" size={16} />
                </button>

                {myPlaylists?.length
                  ? myPlaylists?.map((item, index) => (
                      <button
                        key={index}
                        css={css`
                          width: 100%;
                          padding: 0.5rem;
                          text-align: left;
                          border-radius: var(--border-radius);
                          &:hover {
                            background-color: var(--cardBgHover);
                          }
                          white-space: nowrap;
                        `}
                        disabled={isSubmittingAddToPlaylist}
                        onClick={() => {
                          addToMyPlaylist({
                            userId,
                            trackD: {
                              [trackId]: {
                                id: trackId,
                                type,
                              },
                            },
                            id: item.id,
                            imageUrl,
                          });
                        }}
                      >
                        {item.title}
                      </button>
                    ))
                  : null}
              </div>
            </div>
          )}
        </div>
      )}
    />
  );
};

const TrackCard = ({
  item,
  trackId,
  trackType,
  playlistId,
  details,
  isPlaying,
  myPlaylistId,
  listDivider,
  disableRowList,
  handleTrackClick,
}) => {
  const { currentUser } = useSelector((store) => store.currentUser);
  const { user } = currentUser || {};

  const { id, type, index } = item || {};
  const isCurrentTrack =
    trackId === id && trackType === type && playlistId === details.id;
  const isCurrentPlaying = isCurrentTrack && isPlaying;

  return (
    <li
      key={item.id}
      css={css`
        display: flex;
        position: relative;
        padding: 0.75rem;
        align-items: center;
        font-size: 1rem;
        line-height: 1.5rem;
        cursor: pointer;
        color: var(--onNeutralBg) !important;
        border-color: var(--onNeutralBgDivider);
        &:hover {
          background-color: var(--cardBgHover);
          border-radius: var(--border-radius);
        }
        ${listDivider
          ? `padding-top: 0.75rem;
          padding-bottom: 0.75rem;`
          : `padding-top: 0.5rem;
          padding-bottom: 0.5rem`}
        ${index !== 0 ? `border-top-width: 1px;` : ``}
      `}
    >
      <div
        className="track_card"
        css={css`
          display: flex;
          position: relative;
          justify-content: center;
          width: 100%;
        `}
      >
        <div
          css={css`
            display: flex;
            flex: 1 1 0%;
            gap: 0.5rem;
            justify-content: flex-start;
            align-items: center;
            @media (min-width: 450px) {
              gap: 1rem;
            }
          `}
        >
          {!disableRowList?.includes("no") && (
            <span
              css={css`
                display: block;
                margin-right: 0;
                font-size: 0.875rem;
                line-height: 1.25rem;
                @media (min-width: 450px) {
                  margin-right: 0.5rem;
                }
              `}
            >
              {formatIndexToDouble(index + 1)}
            </span>
          )}
          <div
            css={css`
              position: relative;
              width: 3rem;
              height: 3rem;
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
                  ${isCurrentTrack
                    ? `background-color: var(--neutralBg); opacity: 0.7;`
                    : `background-color: transparent;`}
                }
              `}
            />
            <img
              src={item.image}
              alt={item.name}
              css={css`
                aspect-ratio: 1 / 1;
                border-radius: var(--border-radius);
                width: 100%;
                height: 100%;
              `}
            />

            <div
              css={css`
                display: flex;
                position: absolute;
                top: 0;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
              `}
            >
              <IconButton
                className="track_play_button"
                name={
                  isCurrentTrack
                    ? !isCurrentPlaying
                      ? "BsFillPlayFill"
                      : "BsFillPauseFill"
                    : "BsFillPlayFill"
                }
                css={css`
                  height: 1.75rem;
                  width: 1.75rem;
                  border-radius: 9999px;
                  background-color: var(--primary);
                  ${isCurrentTrack
                    ? ""
                    : `
                      visibility: hidden;
                      display:flex;
                    `};
                `}
                onClick={() => {
                  handleTrackClick({ id, type, index });
                }}
                iconColor="--tw-text-opacity: 1;
                color: rgb(255 255 255 / var(--tw-text-opacity));"
              />
            </div>
          </div>
          <div
            css={css`
              display: flex;
              flex-direction: column;
              flex: 1 1 0%;
              gap: 0.25rem;
              width: 100%;
              color: var(--onNeutralBg);
            `}
          >
            <span
              css={css`
                font-size: 0.875rem;
                line-height: 1.25rem;
              `}
            >
              {truncate(item.name, 15)}
            </span>
            <div
              css={css`
                display: flex;
                flex-direction: column;
                @media (min-width: 450px) {
                  flex-direction: row;
                }
              `}
            >
              <Link
                title="Artist"
                to={`/artist/${item.artistId}`}
                css={css`
                  text-underline-offset: 4px;
                  cursor: pointer;
                  color: var(--onNeutralBgSecondary);
                  font-size: 14px;
                  &:hover {
                    text-decoration: underline;
                  }
                `}
              >
                {item.artistName}
              </Link>

              {!disableRowList?.includes("album") && (
                <>
                  <span
                    css={css`
                      display: none;
                      @media (min-width: 450px) {
                        display: inline-block;
                      }
                    `}
                  >
                    &nbsp;&nbsp;{"."}&nbsp;&nbsp;
                  </span>
                  <Link
                    title="Album"
                    to={`/album/${item.albumId}`}
                    css={css`
                      text-underline-offset: 4px;
                      cursor: pointer;
                      font-size: 14px;
                      color: var(--onNeutralBgSecondary);
                      &:hover {
                        text-decoration: underline;
                      }
                    `}
                  >
                    {truncate(item.albumTitle, 15)}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        <div
          css={css`
            display: flex;
            position: absolute;
            right: 0;
            gap: 0.5rem;
            align-items: center;
          `}
        >
          {!disableRowList?.includes("duration") && (
            <div
              css={css`
                display: flex;
                justify-content: flex-end;
                align-items: flex-end;
                font-size: 0.875rem;
                line-height: 1.25rem;
                text-align: right;
              `}
            >
              {formatDuration(item.duration)}
            </div>
          )}

          {user && (
            <>
              {!disableRowList?.includes("more_button") && (
                <div
                  css={css`
                    display: flex;
                    gap: 0.5rem;
                    justify-content: flex-end;
                    align-items: center;
                    font-size: 0.875rem;
                    line-height: 1.25rem;
                    text-align: right;
                  `}
                >
                  <MoreButtonDropDown
                    trackId={id}
                    type={type}
                    myPlaylistId={myPlaylistId}
                    imageUrl={item.image}
                    artistId={item.artistId}
                    albumId={item.albumId}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </li>
  );
};

export default TrackCard;
