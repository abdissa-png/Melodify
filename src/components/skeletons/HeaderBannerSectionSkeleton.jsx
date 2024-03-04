import { Skeleton } from "./Skeleton";
import { css } from "@emotion/react";
export default function HeaderBannerSkeleton({ type }) {
  const gradientClass =
    "background: linear-gradient(to left, var(--neutralBg), var(--cardBg));";

  return (
    <div
      css={css`
        margin-bottom: 1rem;
      `}
    >
      <Skeleton
        css={css`
          display: flex;
          padding: 1rem;
          flex-direction: column;
          gap: 1rem;
          align-items: center;
          border-radius: var(--border-radius);
          width: 100%;
          background-color: var(--cardSkeletonBg);
          @media (min-width: 450px) {
            flex-direction: row;
          }
        `}
      >
        <Skeleton
          css={css`
            width: 180px;
            height: 180px;
            aspect-ratio: 1 / 1;
            ${type === "artist"
              ? `border-radius: 9999px;`
              : `border-radius: var(--border-radius);`}
            ${gradientClass}
          `}
        />

        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          `}
        >
          <Skeleton
            css={css`
              border-radius: var(--border-radius);
              height: 1.25rem;
              width: 100px;
              ${gradientClass}
            `}
          />
          <Skeleton
            css={css`
              border-radius: var(--border-radius);
              height: 1.25rem;
              width: 150px;
              ${gradientClass}
            `}
          />
          <Skeleton
            css={css`
              border-radius: var(--border-radius);
              height: 2.5rem;
              width: 300px;
              ${gradientClass}
            `}
          />
          <div
            css={css`
              display: flex;
              gap: 1rem;
              align-items: center;
            `}
          >
            <Skeleton
              css={css`
                border-radius: var(--border-radius);
                height: 2.5rem;
                width: 2.5rem;
                ${gradientClass}
              `}
            />
            <Skeleton
              css={css`
                border-radius: var(--border-radius);
                height: 2.5rem;
                width: 2.5rem;
                ${gradientClass}
              `}
            />
          </div>
        </div>
      </Skeleton>
    </div>
  );
}
