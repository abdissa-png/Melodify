import { css } from "@emotion/react";
function Skeleton({ ...props }) {
  return (
    <div
      css={css`
        @keyframes pulse {
          50% {
            opacity: 0.5;
          }
        }
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      `}
      {...props}
    />
  );
}

export { Skeleton };
