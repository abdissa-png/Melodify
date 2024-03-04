import { css } from "@emotion/react";
export default function PatternBg() {
  return (
    <>
      <div
        css={css`
          position: absolute;
          z-index: 20;
          width: 210px;
          height: 210px;
          border-radius: 9999px;
          top: -125px;
          right: -15px;
          opacity: 0.2;
          background-image: linear-gradient(
            to left,
            var(--cardBg),
            var(--color-primary)
          );
        `}
      />
      <div
        css={css`
          position: absolute;
          z-index: 20;
          width: 210px;
          height: 210px;
          border-radius: 9999px;
          top: -85px;
          right: -95px;
          opacity: 0.3;
          background-image: linear-gradient(
            to left,
            var(--cardBg),
            var(--color-primary)
          );
        `}
      />
    </>
  );
}
