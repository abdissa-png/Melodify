import { Navigate, useParams } from "react-router-dom";

import { useFetchPlaylists } from "@/lib/actions";
import { Sections } from "@/components";
import { css } from "@emotion/react";
const allowedSection = ["playlist", "album", "radio"];

export default function Playlist() {
  const slug = useParams();
  const { section = "playlist", id } = slug || {};

  const {
    data: playlists,
    isPending: playlistDataPending,
    isSuccess: playlistDataSuccess,
  } = useFetchPlaylists({ id, section });

  const { tracks } = playlists || {};

  if (!section || !id || !allowedSection.includes(section)) {
    return <Navigate to="/discover" replace />;
  }

  return (
    <section>
      <Sections.BannerSection
        details={playlists}
        tracks={tracks?.data}
        isLoading={playlistDataPending}
        isSuccess={playlistDataSuccess}
        showPattern
      />

      <div
        css={css`
          position: relative;
          margin-top: 2rem;
        `}
      >
        <Sections.TrackSection
          data={tracks?.data && tracks?.data}
          details={{
            id: playlists?.id,
            type: playlists?.type,
          }}
          disableRowList={["dateCreated"]}
          skeletonItemNumber={20}
          isLoading={playlistDataPending}
          isSuccess={playlistDataSuccess}
        />
      </div>
    </section>
  );
}
