import { close } from "@/lib/store/slices";
import { useSelector, useDispatch } from "react-redux";
import { IconButton } from "./buttons";
import { css } from "@emotion/react";
export default function Modal() {
  const { isOpen, modalContent } = useSelector((state) => state.appModal);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(close());
  };
  return (
    <>
      <div
        css={css`
          position: fixed;
          overflow: auto;
          background-color: var(--neutralBg);
          height: 100%;
          width: var(--main-width);
          left: var(
            --sidebar-horizwidth: 100%; left: var(--sidebar-width) ;ontal-width
          );
          transition: all;
          transition-duration: 500ms;
          z-index: 1300;
          transition: all 0.5s ease-in;
          top: ${isOpen ? "0px" : "10000px"};
        `}
      >
        <div
          css={css`
            padding: 2rem;
          `}
        >
          {modalContent ? modalContent : null}
        </div>
        <IconButton
          name="IoMdClose"
          css={css`
            position: absolute;
            right: 1rem;
            top: 1rem;
            background-color: var(--primary);
          `}
          onClick={handleClose}
        />
      </div>
    </>
  );
}
