import { Sections } from "@/components";
import { css } from "@emotion/react";
export default function Albums({ albums, isPending, isSuccess }) {
  return (
    <div
      css={css`
        position: relative;
        margin-top: 2rem;
      `}
    >
      <Sections.MediaSection
        data={albums?.data}
        enableTitle={false}
        type="album"
        isLoading={isPending}
        isSuccess={isSuccess}
      />
    </div>
  );
}
