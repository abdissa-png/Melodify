import { Navigate, useNavigate, useParams } from "react-router-dom";

import {
  open,
  close,
  getModalContent,
  fetchMyPlaylistRequest,
} from "@/lib/store/slices";
import { useSelector, useDispatch } from "react-redux";
import { Button, SearchModal, Title, Sections } from "@/components";
import { css } from "@emotion/react";
import { useEffect } from "react";
export default function MyPlaylist() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { playlist, isLoading, error } = useSelector(
    (store) => store.myPlaylist
  );
  const playlistDataPending = isLoading.fetch;
  const playlistDataSuccess = isLoading.fetch && !error.fetch;
  const { currentUser } = useSelector((state) => state.currentUser);
  const { user, userId } = currentUser || {};
  useEffect(() => {
    if (userId && id) {
      dispatch(fetchMyPlaylistRequest({ userId, id, navigate }));
    }
  }, [userId, id]);
  const { playlistDetails, playlistTracks } = playlist || {};
  const { created_at, title, desc, image_url, image_path, track_ids } =
    playlistDetails || {};

  const sumTrackDuration = playlistTracks?.length
    ? playlistTracks.reduce((acc, item) => {
        acc += item.duration;
        return acc;
      }, 0)
    : null;

  const details = playlistDetails
    ? {
        id,
        image: image_url,
        imagePath: image_path,
        name: title,
        type: "playlist",
        desc,
        tracksNo: track_ids ? Object?.keys(track_ids)?.length : "0",
        duration: sumTrackDuration,
        releaseDate: created_at,
      }
    : null;

  return (
    <section>
      {
        <>
          {user ? (
            <div>
              <Sections.MyPlaylistBannerSection
                details={{ ...details, user: user?.username }}
                tracks={playlistTracks}
                showPattern
              />

              <div
                css={css`
                  position: relative;
                  margin-top: 2rem;
                `}
              >
                <Sections.TrackSection
                  data={playlistTracks}
                  details={{
                    id,
                    type: "playlist",
                  }}
                  myPlaylistId={id}
                  skeletonItemNumber={10}
                  isLoading={playlistDataPending}
                  isSuccess={playlistDataSuccess}
                />

                {track_ids && (
                  <div
                    css={css`
                      width: 100%;
                      margin-top: 2rem;
                    `}
                  >
                    <Title
                      name="Let's find a new addition for your playlist!"
                      type="medium"
                      divider={false}
                    />
                    <Button
                      labelIcon="MdAdd"
                      label="Add Tracks"
                      variant="outlined"
                      css={css`
                        border-color: var(--neutralBgAlt) !important;
                        color: var(--onNeutralBg) !important;
                        background-color: var(--neutralBgAlt);
                        padding: 1rem !important;
                      `}
                      onClick={() => {
                        dispatch(open());
                        dispatch(
                          getModalContent(
                            <SearchModal
                              playlistId={id}
                              title={title}
                              close={() => dispatch(close())}
                            />
                          )
                        );
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Navigate to="/" replace={true} />
          )}
        </>
      }
    </section>
  );
}
