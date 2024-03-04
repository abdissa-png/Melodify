/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";

import { logo } from "@/constants";
import { css } from "@emotion/react";
import { Icon, Title } from "@/components";
import { useSelector } from "react-redux";

export default function AuthLayout() {
  const { pathname } = useLocation();

  const { currentUser } = useSelector((store) => store.currentUser);
  const { user } = currentUser || {};

  const title = useMemo(() => {
    const t = {
      "/register": "Create your account",
      "/login": "Sign In",
    };

    return t[pathname];
  }, [pathname]);

  return (
    <div>
      <div
        css={css`
          flex-direction: column;
          height: 100%;
          padding-top: 1.5rem;
          padding-bottom: 1.5rem;
          margin: auto;
          background-color: var(--neutralBg);
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        <div
          css={css`
            width: 25rem;
            max-width: calc(100vw);
            @media (min-width: 1024px) {
              max-width: calc(100vw - 5rem /* 80px */);
            }
            padding: 2rem;
            background-color: var(--cardBg);
            border-radius: var(--border-radius);
          `}
        >
          {currentUser && (
            <>
              {user && <Navigate to="/" replace={true} />}
              <div>
                <div
                  css={css`
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-bottom: 1.5rem;
                    @media (min-width: 1024px) {
                      margin-bottom: 1.5rem /* 24px */;
                    }
                  `}
                >
                  <Link
                    to="/"
                    css={css`
                      display: flex;
                      flex-direction: row;
                      align-items: center;
                      gap: 0.25rem;
                      margin: 0px;
                    `}
                  >
                    <Icon
                      name={logo.icon}
                      css={css`
                        color: var(--primary) !important;
                      `}
                      size={20}
                    />

                    <h1
                      css={css`
                        font-size: 20px;
                        color: var(--primary);
                        font-weight: 700;
                      `}
                    >
                      {logo.name}
                    </h1>
                  </Link>
                </div>

                <Title
                  name={title || ""}
                  desc="to continue to Melodify"
                  type="medium"
                />

                <Outlet />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
