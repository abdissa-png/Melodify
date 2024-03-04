import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "@emotion/react";
export default function useNotification() {
  const toastFunc = (variant) => {
    switch (variant) {
      case "success":
        return toast.success;
      case "error":
        return toast.error;
      default:
        return toast;
    }
  };

  const notify = ({ title, description, variant = "success" }) =>
    toastFunc(variant)(
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          font-size: 0.875rem;
          line-height: 1.25rem;
        `}
      >
        <span
          css={css`
            color: var(--onNeutralBg);
          `}
        >
          {title}
        </span>
        <span
          css={css`
            color: var(--onNeutralBg);
          `}
        >
          {description}
        </span>
      </div>,
      {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      }
    );

  return [notify];
}
