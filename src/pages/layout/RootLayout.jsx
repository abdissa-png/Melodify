import { Outlet } from "react-router-dom";

import { ScrollProvider } from "@/providers";

import { Modal, Navbar, Sidebar, TrackPlayer, TopPlay } from "@/components";
import { css } from "@emotion/react";
const RootLayout = () => {
  return (
    <>
      <ScrollProvider>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            max-width: 100%;
            margin: auto;
            @media (min-width: 1280px) {
              flex-direction: row;
            }
            background-color: var(--neutralBg);
          `}
          id="main_app"
        >
          <Sidebar />
          <main
            css={css`
              position: relative;
              width: 100%;
              margin-left: auto;
              margin-right: auto;
              overflow: hidden;
            `}
          >
            <Navbar />
            <div
              css={css`
                position: relative;
                margin-bottom: 1.5rem;
                @media (min-width: 1280px) {
                  margin-bottom: 100px;
                }
                overflow-y: scroll;
                padding: 0.75rem;
                @media (min-width: 640px) {
                  padding: 1.5rem;
                }
                max-width: 80rem;
                width: var(--main-width);
                left: var(--sidebar-horizontal-width);
                transition: all;
                transition-duration: 500ms;
                margin-top: var(--main-margin-top);
              `}
              className="page_content hide_scrollbar"
            >
              <Outlet />
            </div>
            <Modal />
          </main>
          <TopPlay />
        </div>
      </ScrollProvider>
      <TrackPlayer />
    </>
  );
};

export default RootLayout;
