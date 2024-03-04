import { Sections } from "@/components";
import { css } from "@emotion/react";
export default function RelatedArtists({
  relatedArtists,
  isPending,
  isSuccess,
}) {
  return (
    <div
      css={css`
        position: relative;
        margin-top: 2rem;
      `}
    >
      <Sections.MediaSection
        data={relatedArtists?.data}
        enableTitle={false}
        type="artist"
        isLoading={isPending}
        isSuccess={isSuccess}
      />
    </div>
  );
}
