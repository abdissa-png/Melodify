import { Sections } from "@/components";
import { css } from "@emotion/react";
export default function Playlists({ playlists, isPending, isSuccess }) {
  return (
    <div
      css={css`
        position: relative;
        margin-top: 2rem;
      `}
    >
      <Sections.MediaSection
        data={playlists?.data}
        enableTitle={false}
        type="playlist"
        isLoading={isPending}
        isSuccess={isSuccess}
      />
    </div>
  );
}
