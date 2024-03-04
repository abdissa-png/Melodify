import { useEffect } from "react";
import { css } from "@emotion/react";
export default function Overlay({ isOpen, handleIsOpen, transparent, style }) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);
  return (
    <>
      {isOpen && (
        <div
          css={css`
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            width: 100vw;
            ${transparent
              ? `background-color: transparent;`
              : `
              background-color: rgba(0, 0, 0, 0.50);`}
            ${style}
          `}
          onClick={() => handleIsOpen(false)}
        />
      )}
    </>
  );
}
