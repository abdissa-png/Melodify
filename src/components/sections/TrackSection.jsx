/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from "react";

import { useFetchMyPlaylists } from "@/lib/actions";
import { useSelector } from "react-redux";
import { classNames, getFormatData } from "@/lib/utils";
import { usePlayer } from "@/hooks";
import { css } from "@emotion/react";
import { ShowMoreButton, Title, Skeletons, Cards } from "@/components";

export default function TrackSection({
  data,
  details,
  disableHeader,
  disableRowList = [""],
  imageDims = "16",
  skeletonItemNumber = 5,
  enableTitle,
  titleDivider = true,
  titleName,
  titleType,
  showMoreLink,
  showMoreDisplay,
  listDivider = true,
  myPlaylistId,
  className,
  isLoading,
  isSuccess,
}) {
  useFetchMyPlaylists();

  const { playlistId, trackId, trackType } =
    useSelector((state) => state.player) || {};

  const { handlePlayPause, handleGetPlaylist, isPlaying } = usePlayer();

  const trackFormatted = useMemo(() => getFormatData(data), [data]);

  const handleTrackClick = ({ id, type, index }) => {
    if (trackId === id) {
      handlePlayPause();
    } else {
      handleGetPlaylist({
        tracklist: trackFormatted,
        playlistId: details?.id,
        playlistType: details?.type,
        trackIndex: index,
        trackId: id,
        trackType: type,
      });
    }
  };

  return (
    <>
      {isLoading && (
        <div>
          {enableTitle && <Skeletons.TitleSkeleton type="top-pick" />}
          <Skeletons.TrackCardSkeleton
            number={skeletonItemNumber}
            imageDims={imageDims}
          />
        </div>
      )}

      {data?.length ? (
        <div>
          {enableTitle && (
            <Title
              name={titleName || ""}
              type={titleType}
              divider={titleDivider}
              {...(showMoreDisplay === "top" && {
                showMoreLink,
              })}
            />
          )}
          <div className="">
            {!disableHeader && <Title name="Songs" type="medium" />}

            <div className={classNames("list_content", className)}>
              <ul
                css={css`
                  display: flex;
                  flex-direction: column;
                  width: 100%;
                  list-style-type: none;
                `}
              >
                {trackFormatted?.length &&
                  trackFormatted?.map((item) => {
                    return (
                      <Cards.TrackCard
                        key={item.id}
                        item={item}
                        {...{
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
                          imageDims,
                        }}
                      />
                    );
                  })}
              </ul>
            </div>
          </div>
          {showMoreLink && showMoreDisplay === "bottom" && (
            <ShowMoreButton onClick={showMoreLink} />
          )}
        </div>
      ) : null}
    </>
  );
}
