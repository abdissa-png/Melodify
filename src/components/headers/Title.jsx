import { css } from "@emotion/react";
import { Icon } from "..";

const Title = ({
  name,
  desc,
  type,
  color,
  style,
  divider = true,
  showMoreLink,
}) => {
  const fontType = () => {
    switch (type) {
      case "extra-large":
        return "font-size: 1.875rem; line-height: 2.25rem;";
      case "large":
        return "font-size: 1.5rem; line-height: 2rem;";
      case "medium":
        return "font-size: 1.25rem; line-height: 1.75rem;";
      case "small":
        return "font-size: 1.125rem; line-height: 1.75rem;";
      case "extra-small":
        return "font-size: 0.875rem; line-height: 1.25rem;";
      default:
        return "";
    }
  };
  return (
    <div
      css={css`
        display: flex;
        margin-bottom: 1rem;
        flex-direction: column;
        gap: 0.75rem;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <h2
          css={css`
            font-weight: 600;
            ${fontType()}
            ${color === "primary"
              ? `color: var(--primary);`
              : `color: var(--onNeutralBg);`}
              ${style}
          `}
        >
          {name}
        </h2>
        {showMoreLink && (
          <button
            css={css`
              display: flex;
              padding: 0.5rem;
              gap: 0.25rem;
              justify-content: space-between;
              align-items: center;
              border-radius: 9999px;
              border-width: 1px;
              border-color: var(--neutralBg);
              font-size: 0.875rem;
              line-height: 1.25rem;
              color: var(--onNeutralBgSecondary);
              &:hover {
                color: var(--onNeutralBg);
                background-color: var(--neutralBgAlt);
                border-color: var(--onNeutralBgSecondary);
              }
            `}
            onClick={showMoreLink}
          >
            See more{" "}
            <Icon
              name="BiChevronsRight"
              css={css`
                color: var(--onNeutralBgSecondary);
              `}
            />
          </button>
        )}
      </div>
      {desc && (
        <p
          css={css`
            margin-top: -0.5rem;
            font-size: 0.875rem;
            line-height: 1.25rem;
            font-weight: 400;
            letter-spacing: 0.05em;
            color: var(--onNeutralBgSecondary);
          `}
        >
          {desc || "Top picks for you. Updated daily."}
        </p>
      )}
      {divider && (
        <div
          css={css`
            width: 100%;
            height: 1px;
            background-color: var(--onNeutralBgDivider);
          `}
        />
      )}
    </div>
  );
};

export default Title;
