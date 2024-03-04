import { useMemo } from "react";
import { Navigate } from "react-router-dom";

import { useFetchMyPlaylists } from "@/lib/actions";
import { useSelector, useDispatch } from "react-redux";
import { createMyPlaylistRequest } from "@/lib/store/slices";
import { IconButton, Sections } from "@/components";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
export default function MyPlaylists() {
  const { currentUser } = useSelector((state) => state.currentUser);
  const { user, userId } = currentUser || {};
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.myPlaylist);

  const createMyPlaylist = () => {
    dispatch(createMyPlaylistRequest({ userId, navigate }));
  };
  const {
    data: myPlaylists,
    isPending: myPlaylistsDataPending,
    isSuccess: myPlaylistsDataSuccess,
  } = useFetchMyPlaylists();

  const playlists = useMemo(() => {
    if (myPlaylists && myPlaylists.length) {
      return myPlaylists.map((playlist) => {
        const { image_url, created_at, desc, track_ids } = playlist;
        return {
          ...playlist,
          cover_big: image_url,
          type: "my-playlist",
          release_date: created_at,
          description: desc,
          track_total: track_ids ? Object.keys(track_ids)?.length : "0",
        };
      });
    } else {
      return null;
    }
  }, [myPlaylists]);

  return (
    <section>
      {currentUser && (
        <>
          {!user ? (
            <Navigate to="/" replace={true} />
          ) : (
            <Sections.MediaSectionMinified
              data={playlists}
              title="My Playlists"
              subTitle="Curate your sounds and tracks at the go."
              titleType="large"
              type="my-playlist"
              gridNumber={3}
              imageDims={28}
              isMyPlaylist
              CreatePlaylistComp={() => (
                <li
                  css={css`
                    grid-column: span 1 / span 1;
                  `}
                >
                  <div
                    css={css`
                      height: 100%;
                    `}
                  >
                    <div
                      css={css`
                        flex-direction: column;
                        width: 100%;
                        height: 100%;
                        gap: 0.5rem;
                        padding: 1rem;
                        border-width: 1px;
                        border-style: dashed;
                        border-radius: var(--border-radius);
                        border-color: var(--onNeutralBgSecondary);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: var(--onNeutralBg);
                      `}
                    >
                      <IconButton
                        name={
                          isLoading.create ? "HiOutlineDotsHorizontal" : "MdAdd"
                        }
                        style="width: 3rem; height:3rem; border-radius: 9999px; --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
                        --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
                        box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow); background-color: var(--primary); display:flex; align-items:center; justify-content:center;"
                        iconColor="--tw-text-opacity: 1 !important;
                        color: rgb(255 255 255 / var(--tw-text-opacity)) !important;"
                        size="30"
                        disabled={isLoading.create}
                        onClick={() => createMyPlaylist()}
                      />
                      <p
                        css={css`
                          font-size: 0.875rem;
                          line-height: 1.25rem;
                          font-weight: 600;
                          letter-spacing: 0.05em;
                        `}
                      >
                        Create Playlist
                      </p>
                    </div>
                  </div>
                </li>
              )}
              isLoading={myPlaylistsDataPending}
              isSuccess={myPlaylistsDataSuccess}
            />
          )}
        </>
      )}
    </section>
  );
}
