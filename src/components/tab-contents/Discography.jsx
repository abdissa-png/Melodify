import { useId } from "react";

import { Sections } from "@/components";
import { css } from "@emotion/react";
export default function Discography({
  setCurrentTab,
  data,
  isPending,
  isSuccess,
}) {
  const { details, topTracks, albums, relatedArtists, playlists, radios } =
    data || {};

  const radioId = useId();

  return (
    <div
      css={css`
        position: relative;
        margin-top: 2rem;
      `}
    >
      <div
        css={css`
          display: grid;
          grid-template-columns: repeat(1, minmax(0, 1fr));
          gap: 2rem;
          @media (min-width: 768px) {
            grid-template-columns: repeat(10, minmax(0, 1fr));
          }
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            grid-column: span 1 / span 1;
            gap: 2rem;
            @media (min-width: 768px) {
              grid-column: span 7 / span 7;
            }
          `}
        >
          <Sections.TrackSection
            data={topTracks?.data?.slice(0, 5)}
            details={{
              id: details?.id,
              type: "artist",
            }}
            disableHeader
            disableRowList={["album", "dateCreated"]}
            imageDims="10"
            enableTitle
            titleName="Top Tracks"
            titleDivider={false}
            showMoreLink={() => setCurrentTab("top_tracks")}
            showMoreDisplay="top"
            titleType="medium"
            className="px-1 py-1 rounded bg-sidebar"
            isLoading={isPending}
            isSuccess={isSuccess}
          />

          <Sections.MediaSection
            data={albums?.data?.slice(0, 9)}
            title="Albums"
            titleType="medium"
            titleDivider={false}
            showMoreLink={() => setCurrentTab("albums")}
            type="album"
            cardItemNumber={9}
            gridNumber={3}
            isLoading={isPending}
            isSuccess={isSuccess}
          />
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            grid-column: span 1 / span 1;
            gap: 2rem;
            @media (min-width: 768px) {
              grid-column: span 3 / span 3;
            }
          `}
        >
          <Sections.MediaSectionMinified
            data={playlists ? playlists?.data?.slice(0, 4) : []}
            title="Playlists"
            titleType="medium"
            titleDivider={false}
            type="playlist"
            gridNumber={1}
            showMoreLink={() => setCurrentTab("playlists")}
            showMoreDisplay="bottom"
            isLoading={isPending}
            isSuccess={isSuccess}
          />

          <Sections.MediaSectionMinified
            data={relatedArtists?.data?.slice(0, 4)}
            title="Related Artists"
            titleType="medium"
            titleDivider={false}
            type="artist"
            gridNumber={1}
            showMoreLink={() => setCurrentTab("related_artists")}
            showMoreDisplay="bottom"
            isLoading={isPending}
            isSuccess={isSuccess}
          />

          <Sections.TrackSection
            data={radios?.data?.slice(0, 6)}
            details={{
              id: radioId,
              type: "radio",
            }}
            disableHeader
            disableRowList={[
              "no",
              "album",
              "duration",
              "action_one",
              "action_two",
              "dateCreated",
            ]}
            imageDims="16"
            enableTitle
            listDivider={false}
            titleName="Radios"
            titleDivider={false}
            titleType="medium"
            isLoading={isPending}
            isSuccess={isSuccess}
          />
        </div>
      </div>
    </div>
  );
}
