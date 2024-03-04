import * as Dialog from "@radix-ui/react-dialog";
import { css } from "@emotion/react";
import { Icon } from "@/components";

const AppDialog = ({ open, onOpenChange, Content, displayCloseBtn = true }) => (
  <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Dialog.Overlay
        css={css`
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          place-items: center;
          overflow: auto;
          z-index: 2200;
        `}
      >
        <Dialog.Content
          css={css`
            height: 100vh;
            @media (min-width: 450px) {
              height: auto;
            }
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            max-width: 450px;
            margin: auto;
            &:focus {
              outline: 2px solid transparent;
              outline-offset: 2px;
            }
          `}
        >
          <div
            css={css`
              position: relative;
              border-radius: var(--border-radius);
              background-color: var(--neutralBg);
              --tw-shadow: 0 3px 5px -1px rgb(0 0 0 / 10%),
                0 6px 10px 0 rgb(0 0 0 / 10%), 0 1px 18px 0 rgb(0 0 0 / 12%);
              --tw-shadow-colored: 0 3px 5px -1px var(--tw-shadow-color),
                0 6px 10px 0 var(--tw-shadow-color),
                0 1px 18px 0 var(--tw-shadow-color);
              box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
                var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
              padding: 1.5rem;
              height: 100%;
              width: 100%;
              margin-top: 60px;
              margin-bottom: 60px;
            `}
          >
            <Content />
            {displayCloseBtn && (
              <Dialog.Close asChild>
                <button
                  css={css`
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 9999px;
                    outline-width: 0px;
                    height: 1.5rem;
                    width: 1.5rem;
                    background-color: var(--primary);
                    --tw-shadow: 0 3px 5px -1px rgb(0 0 0 / 10%),
                      0 6px 10px 0 rgb(0 0 0 / 10%),
                      0 1px 18px 0 rgb(0 0 0 / 12%);
                    --tw-shadow-colored: 0 3px 5px -1px var(--tw-shadow-color),
                      0 6px 10px 0 var(--tw-shadow-color),
                      0 1px 18px 0 var(--tw-shadow-color);
                    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
                      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
                  `}
                  aria-label="Close"
                >
                  <Icon name="IoMdClose" size={15} />
                </button>
              </Dialog.Close>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  </Dialog.Root>
);

export default AppDialog;
