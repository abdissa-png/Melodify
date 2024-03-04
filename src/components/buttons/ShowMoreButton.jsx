import { Icon } from "..";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
const StyledButton = styled.button`
  margin-top: 1rem;
  color: var(--onNeutralBgSecondary);
  font-size: 0.875rem;
  line-height: 1.25rem;
  border-width: 1px;
  border-color: var(--onNeutralBgSecondary);
  border-radius: 9999px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.25rem;
  &:hover {
    color: var(--onNeutralBg);
    background-color: var(--neutralBgAlt);
  }
`;
export default function ShowMoreButton({ className, ...props }) {
  return (
    <StyledButton {...props}>
      See more
      <Icon
        name="BiChevronsRight"
        css={css`
          color: var(--onNeutralBgSecondary);
        `}
      />
    </StyledButton>
  );
}
