import { Skeleton } from "./Skeleton";
import { css } from "@emotion/react";
export default function MediaCardSkeleton({ type, number }) {
  const gradientClass =
    "background: linear-gradient(to left, var(--neutralBg), var(--cardBg));";

  return (
    <>
      {[...Array(number)].map((_, index) => (
        <div
          css={css`
            grid-column: span 1 / span 1;
          `}
          key={index}
        >
          <Skeleton
            css={css`
              padding: 1rem;
              border-radius: var(--border-radius);
              width: 100%;
              background-color: var(--cardSkeletonBg);
            `}
          >
            <div
              css={css`
                aspect-ratio: 1 / 1;
              `}
            >
              <Skeleton
                css={css`
                  width: 100%;
                  height: 100%;
                  ${gradientClass}
                  ${type === "artist"
                    ? `
                    border-radius: 9999px;
                    `
                    : `
                    border-radius: var(--border-radius);
                    `}
                `}
              />
            </div>
            <div
              css={css`
                display: flex;
                justify-content: center;
              `}
            >
              <Skeleton
                css={css`
                  width: 5rem;
                  height: 1rem;
                  border-radius: var(--border-radius);
                  margin-top: 1rem;
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
