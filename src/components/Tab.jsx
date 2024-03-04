import { Fragment } from "react";
import * as Tabs from "@radix-ui/react-tabs";

import { Icon } from "@/components";
import { css } from "@emotion/react";
import { Skeleton } from "./skeletons/Skeleton";

export function AppTab({
  currentTab,
  setCurrentTab,
  content,
  tabs,
  isLoaded,
  fullWidth,
}) {
  return (
    <Tabs.Root
      css={css`
        position: relative;
        display: flex;
        flex-direction: column;
      `}
      value={currentTab}
    >
      <Tabs.List
        css={css`
          display: flex;
          ${isLoaded
            ? `
          border-bottom-width: 1px;
          border-color: var(--onNeutralBgDivider);
                       `
            : ``}
        `}
        aria-label=""
      >
        {!isLoaded && (
          <>
            {tabs.map((tab) => (
              <Skeleton
                key={tab.id}
                css={css`
                  width: 100px;
                  margin-left: 0.25rem;
                  margin-right: 0.25rem;
                  height: 40px;
                  background-color: var(--cardSkeletonBg);
                  border-radius: 9999px;
                `}
              />
            ))}
          </>
        )}
        {isLoaded && (
          <div
            css={css`
              display: flex;
              width: 100%;
              overflow: auto;
            `}
            className="hide_scrollbar"
          >
            {tabs.map((tab) => (
              <Fragment key={tab.id}>
                {tab?.display ? (
                  <Tabs.Trigger
                    css={css`
                      padding: 1rem;
                      color: var(--onNeutralBgSecondary);
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      line-height: 1;
                      outline: 2px solid transparent;
                      outline-offset: 2px;
                      cursor: pointer;
                      color: var(--onNeutralBg);
                      font-weight: 600;
                      font-size: 0.875rem;
                      line-height: 1.25rem;
                      border-bottom-width: 2px;
                      border-color: var(--onNeutralBg);
                      white-space: nowrap;
                      ${fullWidth ? `width: 100%;` : `width: fit-content;`}
                    `}
                    value={tab.id}
                    onClick={() => setCurrentTab(tab.id)}
                  >
                    {tab.icon && <Icon name={tab.icon} size={22} />}
                    {tab.name}
                  </Tabs.Trigger>
                ) : null}
              </Fragment>
            ))}
          </div>
        )}
      </Tabs.List>
      {content &&
        Object?.entries(content).map((page) => (
          <Tabs.Content value={page[0]} key={page[0]}>
            {page[1] || null}
          </Tabs.Content>
        ))}
    </Tabs.Root>
  );
}
