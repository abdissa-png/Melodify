import { Link } from "react-router-dom";
import { css } from "@emotion/react";
export default function Error() {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
      `}
    >
      <div
        css={css`
          text-align: center;
        `}
      >
        <h1
          css={css`
            font-size: 3.75rem;
            line-height: 1;
            font-weight: 800;
            color: var(--primary);
          `}
        >
          404
        </h1>
        <p
          css={css`
            margin-top: 0.5rem;
            font-size: 1.5rem;
            line-height: 2rem;
            font-weight: 600;
            color: var(--onNeutralBg);
          `}
        >
          Page Not Found
        </p>
        <p
          css={css`
            margin-top: 0.5rem;
            color: var(--onNeutralBgSecondary);
          `}
        >
          The page you are looking for might be in another universe.
        </p>
        <div
          css={css`
            margin-top: 1.5rem;
          `}
        >
          <Link
            href="/"
            css={css`
              color: var(--primary);
              &:hover {
                text-decoration-line: underline;
              }
            `}
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}
