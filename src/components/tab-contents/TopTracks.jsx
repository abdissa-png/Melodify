import { Sections } from "@/components";
import { css } from "@emotion/react";
export default function TopTracks({
  topTracks,
  details,
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
      <Sections.TrackSection
        data={topTracks?.data}
        details={{
          id: details?.id,
          type: details?.type,
        }}
        disableRowList={["dateCreated"]}
        enableTitle={false}
        skeletonItemNumber={20}
        isLoading={isPending}
        isSuccess={isSuccess}
      />
    </div>
  );
}
