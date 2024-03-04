import { Skeleton } from "./Skeleton";
import { css } from "@emotion/react";
export default function TitleSkeleton({ type }) {
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
          width: 100%;
          padding: 1rem;
          border-radius: var(--border-radius);
          background-color: var(--cardSkeletonBg);
        `}
      >
        <Skeleton
          css={css`
            width: 33.333333%;
            height: 36px;
            aspect-ratio: 1 / 1;
            border-radius: var(--border-radius);
            ${gradientClass}
          `}
        />
        {!["top-pick"].includes(type || "") && (
          <div className="">
            <Skeleton
              css={css`
                width: 33.333333%;
                height: 1rem;
                border-radius: var(--border-radius);
                margin-top: 0.75rem ${gradientClass};
              `}
            />
          </div>
        )}
      </Skeleton>
    </div>
  );
}
