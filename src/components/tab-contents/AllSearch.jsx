import { useId, useMemo } from "react";

import { Sections } from "@/components";
import { css } from "@emotion/react";
export default function AllSearch({
  setCurrentTab,
  data,
  isPending,
  isSuccess,
}) {
  const { artists, tracks, albums, playlists, radios } = data || {};

  const radioId = useId();

  const bannerD = useMemo(() => {
    let details, type, tracks;
    if (artists?.data?.length) {
      details = artists?.data[0];
      type = "artist";
      tracks = tracks?.data;
    } else if (albums?.data?.length) {
      details = albums?.data[0];
      type = "album";
      tracks = albums?.data[0]?.tracks;
    } else if (playlists?.data?.length) {
      details = playlists?.data[0];
      type = "playlist";
      tracks = playlists?.data[0]?.tracks;
    }

    return { details, type, tracks };
  }, [albums, artists, playlists]);

  return (
    <div
      css={css`
        position: relative;
        margin-top: 2rem;
        height: 100vh;
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
              grid-column: span 6 / span 6;
            }
          `}
        >
          <Sections.BannerSection
            details={bannerD?.details}
            tracks={bannerD?.tracks}
            type="search"
            isLoading={isPending}
            isSuccess={isSuccess}
          />

          <Sections.MediaSection
            data={artists?.data?.slice(0, 3)}
            title="Artists"
            titleType="medium"
            titleDivider={false}
            type="artist"
            gridNumber={3}
            showMoreLink={() => setCurrentTab("related_artists")}
            cardItemNumber={9}
            isLoading={isPending}
            isSuccess={isSuccess}
          />

          <Sections.MediaSection
            data={albums?.data?.slice(0, 3)}
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

          <Sections.MediaSection
            data={playlists?.data?.slice(0, 3)}
            title="Playlists"
            titleType="medium"
            titleDivider={false}
            showMoreLink={() => setCurrentTab("playlists")}
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
              grid-column: span 4 / span 4;
            }
          `}
        >
          <div
            css={css`
              position: sticky;
              top: 0px;
            `}
          >
            <Sections.TrackSection
              data={tracks?.data?.slice(0, 5)}
              details={{
                id: bannerD?.details?.id,
                type: bannerD?.type,
              }}
              disableHeader
              disableRowList={["album", "actions", "dateCreated"]}
              imageDims="16"
              enableTitle
              listDivider={false}
              titleName="Tracks"
              titleDivider={false}
              titleType="medium"
              showMoreLink={() => setCurrentTab("tracks")}
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
              disableRowList={["album", "duration", "actions"]}
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
    </div>
  );
}
