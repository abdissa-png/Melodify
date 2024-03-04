import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { css } from "@emotion/react";

export function AppDropdownMenu({
  DropdownTrigger,
  DropdownContent,
  contentClassName,
}) {
  return (
    <Menu
      as="div"
      css={css`
        position: relative;
      `}
    >
      <div>
        <Menu.Button
          css={css`
            width: 100%;
            text-align: left;
          `}
        >
          <DropdownTrigger />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          css={css`
            position: absolute;
            right: 0px;
            z-index: 10;
            margin-top: 0.5rem;
            transform-origin: top right;
            border-radius: var(--border-radius);
            background-color: var(--cardBg);
            --tw-shadow: rgba(0, 0, 0, 0.2) 0 8px 10px -5px,
              rgba(0, 0, 0, 0.14) 0 16px 24px 2px,
              rgba(0, 0, 0, 0.12) 0 6px 30px 5px;
            --tw-shadow-colored: 0 8px 10px -5px var(--tw-shadow-color),
              0 16px 24px 2px var(--tw-shadow-color),
              0 6px 30px 5px var(--tw-shadow-color);
            box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
              var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
            color: var(--onNeutralBg);
            ${contentClassName}
          `}
        >
          <div
            css={css`
              padding: 0.25rem;
              font-size: 0.875rem;
              line-height: 1.25rem;
            `}
          >
            {DropdownContent && <DropdownContent />}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
