import { forwardRef } from "react";

import { Icon } from "@/components";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
const StyledButton = styled.button`
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: 2px solid transparent;
  outline-offset: 2px;
  transform: scale(1.1);
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &:hover {
    --tw-scale-x: 1.1;
    --tw-scale-y: 1.1;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y))
      rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
      scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
`;
const IconButton = forwardRef(
  (
    {
      type = "button",
      name,
      size,
      style,
      iconColor,
      disabled,
      onClick,
      ...props
    },
    ref
  ) => {
    return (
      <StyledButton
        type={type}
        disabled={disabled}
        ref={ref}
        onClick={onClick}
        {...props}
      >
        <Icon
          name={name}
          size={size}
          onClick={onClick}
          css={css`
            ${style}
            ${iconColor}
          `}
        />
      </StyledButton>
    );
  }
);

IconButton.displayName = "IconButton";

export default IconButton;
