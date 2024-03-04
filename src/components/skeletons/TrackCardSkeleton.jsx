import { Skeleton } from "./Skeleton";
import { css } from "@emotion/react";
const imageDimsOpt = {
  11: "height: 2.75rem;  width: 2.75rem; ",
  16: "height: 4rem;  width: 4rem;",
  20: "height: 5rem;  width: 5rem;",
  28: "height: 7rem;  width: 7rem;",
};

export default function TrackCardSkeleton({ number, imageDims = "11" }) {
  const gradientClass =
    "background: linear-gradient(to left, var(--neutralBg), var(--cardBg));";

  return (
    <>
      {[...Array(number)].map((_, index) => (
        <div
          key={index}
          css={css`
            grid-column: span 1 / span 1;
          `}
        >
          <Skeleton
            css={css`
              display: flex;
              flex-direction: row;
              align-items: center;
              width: 100%;
              padding: 1rem;
              border-radius: var(--border-radius);
              background-color: var(--cardSkeletonBg);
            `}
          >
            <Skeleton
              css={css`
                border-radius: var(--border-radius);
                ${gradientClass}
                ${imageDimsOpt[imageDims]}
              `}
            />

            <div
              css={css`
                display: flex;
                margin-left: 0.75rem;
                flex-direction: column;
                gap: 0.5rem;
              `}
            >
              <Skeleton
                css={css`
                  border-radius: var(--border-radius);
                  width: 5rem;
                  height: 1rem;
                  ${gradientClass}
                `}
              />
              <Skeleton
                css={css`
                  border-radius: var(--border-radius);
                  width: 8rem;
                  height: 1rem;
                  ${gradientClass}
                `}
              />
            </div>
          </Skeleton>
        </div>
      ))}
    </>
  );
}
