import React, { forwardRef } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Icon } from "@/components";

const StyledButton = styled.button`
  ${(props) => {
    switch (props.variant) {
      case "outlined":
        return `
          border:  1px solid;
          border-color: var(--primary);
          color: var(--primary);
        `;
      case "contained":
        return `
          background-color: var(--primary);
          --tw-text-opacity: 1;
    color: rgb(255 255 255 / var(--tw-text-opacity));
        `;
      case "gradient":
        return `
          background: linear-gradient(to right, #ff7e5f, #feb47b);
          color: white;
        `;
      default:
        return "";
    }
  }}
  font-weight:  600;
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  transition: transform 0.3s ease;
  cursor: pointer;
  outline: 2px solid transparent;
  outline-offset: 2px;
  opacity: ${(props) => (props.disabled || props.isSubmitting ? 0.5 : 1)};
  cursor: ${(props) =>
    props.disabled || props.isSubmitting ? "not-allowed" : "pointer"};
  &:hover {
    transform: ${(props) =>
      props.disabled || props.isSubmitting ? "none" : "scale(1.0)"};
  }
`;
// const StyledIcon = styled(Icon)`
//   ${(props) => {
//     switch (props.variant) {
//       case "filled":
//         return `
//             color: white;
//         `;
//       case "contained":
//         return `
//         --tw-text-opacity: 1;
//         color: rgb(255 255 255 / var(--tw-text-opacity));
//         `;
//       case "gradient":
//         return `
//           color: white;
//         `;
//       default:
//         return "";
//     }
//   }}
// `;
const Button = forwardRef(
  (
    { type, label, disabled, variant, labelIcon, isSubmitting, ...props },
    ref
  ) => {
    return (
      <StyledButton
        as="button"
        ref={ref}
        type={type}
        variant={variant}
        disabled={disabled || isSubmitting}
        {...props}
      >
        {!isSubmitting ? (
          <div
            css={css`
              display: flex;
              flex-direction: row;
              align-items: center;
            `}
          >
            {labelIcon && (
              <div
                css={css`
                  margin-right: 0.25rem;
                `}
              >
                {/* Replace this with your Icon component */}
                <Icon
                  name={labelIcon}
                  css={css`
                    ${variant == "filled" ? `color: white;` : ``}
                    ${variant == "contained"
                      ? `--tw-text-opacity: 1;
                    color: rgb(255 255 255 / var(--tw-text-opacity));`
                      : ``}
                  ${variant == "gradient" ? `color: white;` : ``}
                  `}
                />
              </div>
            )}
            <div
              css={css`
                width: 100%;
                text-align: center;
                white-space: nowrap;
              `}
            >
              {label}
            </div>
          </div>
        ) : (
          <div>Loading..</div>
        )}
      </StyledButton>
    );
  }
);

Button.displayName = "Button";
export default Button;
