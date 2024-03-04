import { classNames } from "@/lib/utils";

import { Skeleton } from "./Skeleton";
import { css } from "@emotion/react";
export default function NavlistSkeleton() {
  const gradientClass =
    "background: linear-gradient(to left, var(--neutralBg), var(--cardBg));";

  return (
    <div
      css={css`
        padding: 1rem 1rem;
      `}
    >
      <Skeleton
        css={css`
          width: 100%;
          height: calc(100vh - 112px);
          border-radius: var(--border-radius);
          ${gradientClass}
        `}
      />
    </div>
  );
}
