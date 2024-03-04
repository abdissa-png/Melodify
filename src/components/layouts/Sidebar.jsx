/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  logoutRequest,
  getToggleMenu,
  getToggleSearch,
  close as modalClose,
} from "@/lib/store/slices";

import { useTheme } from "@/hooks";
import { themeConfig, defaultThemeConfig } from "@/configs";

import { Icon, Overlay, Title, Tooltip, Button, Skeletons } from "@/components";
import { css } from "@emotion/react";

const User = () => {
  const { currentUser } = useSelector((state) => state.currentUser);

  const { user } = currentUser || {};
  const { email, username, imageUrl } = user || {};

  return (
    <Link
      css={css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5rem;
        gap: 0.5rem;
        border-radius: var(--border-radius);
        background-color: var(--neutralBg);
      `}
      to="/profile"
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          width: 2.5rem;
          height: 2.5rem;
          background-color: var(--neutralBgAlt);
        `}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            css={css`
              width: 100%;
              height: 100%;
              border-radius: 9999px;
            `}
          />
        ) : (
          <Icon name="FaRegUser" size={16} />
        )}
      </div>

      {email && (
        <div
          css={css`
            display: flex;
            flex-direction: column;
            flex: 1 1 0%;
            font-size: 0.875rem;
            line-height: 1.25rem;
          `}
        >
          <span>@{username}</span>
          <span
            css={css`
              word-break: break-all;
              color: var(--onNeutralBgSecondary);
            `}
          >
            {email}
          </span>
        </div>
      )}
    </Link>
  );
};

const CreatePlaylistTooltipContent = ({ hideTooltip }) => {
  const navigate = useNavigate();

  return (
    <div
      css={css`
        padding: 1rem;
        border-radius: var(--border-radius);
        background-color: var(--cardBg);
      `}
    >
      <Title
        name="Create a Playlist?"
        desc="Log in to create and share playlists."
        type="small"
      />
      <div
        css={css`
          display: flex;
          gap: 0.5rem;
          align-items: center;
          justify-content: flex-end;
        `}
      >
        <Button
          label="Not now"
          variant="outlined"
          css={css`
            border-width: 0px;
          `}
          onClick={hideTooltip}
        />
        <Button
          label="Sign In"
          variant="contained"
          onClick={() => navigate("/login")}
        />
      </div>
    </div>
  );
};

const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [toggleNav, setToggleNav] = useState(false);

  const signOut = () => {
    dispatch(logoutRequest());
  };
  const { currentUser } = useSelector((state) => state.currentUser);

  const { user } = currentUser || {};

  const { toggleMenu, searchRef } = useSelector((state) => state.appUtil);

  const [theme] = useTheme();

  const { sidebar, orientation, isMobile } = theme || defaultThemeConfig;
  const isHorizontal = orientation === "horizontal" && !isMobile;

  const isFolded = sidebar === "folded";

  useEffect(() => {
    getToggleMenu && dispatch(getToggleMenu(false));
  }, [pathname]);

  const navlinks = useMemo(() => {
    return [
      {
        name: "Menu",
        subLinks: [
          {
            id: "discover",
            name: "Discover",
            to: "/discover",
            icon: "BiPlayCircle",
            tooltip: "hover",
          },
          {
            id: "browse",
            name: "Browse",
            to: "/browse",
            icon: "RiListIndefinite",
            tooltip: "hover",
          },
        ],
      },
      {
        name: "Library",
        subLinks: [
          ...(user
            ? [
                {
                  id: "my_playlists",
                  name: "My Playlists",
                  to: "/my-playlist",
                  icon: "PiPlaylistBold",
                  tooltip: "hover",
                },
              ]
            : [
                {
                  id: "create_playlists",
                  name: "Create Playlists",
                  icon: "PiPlaylistBold",
                  dialog: true,
                  tooltip: "click",
                  tooltipContent: CreatePlaylistTooltipContent,
                  arrowPos: "left-top",
                  arrowClassName: "color: var(--cardBg);",
                },
              ]),
        ],
      },
      {
        name: "Account",
        subLinks: [
          ...(user
            ? [
                {
                  id: "profile",
                  name: "Profile",
                  to: "/profile",
                  icon: "BiUser",
                  tooltip: "hover",
                },
                {
                  id: "logout",
                  name: "Logout",
                  to: "/logout",
                  onClick: signOut,
                  icon: "MdLogout",
                  tooltip: "hover",
                },
              ]
            : [
                {
                  id: "sign_up",
                  name: "Sign Up",
                  to: "/register",
                  icon: "BiUser",
                  tooltip: "hover",
                },
                {
                  id: "sign_in",
                  name: "Sign In",
                  to: "/login",
                  icon: "MdLogin",
                  tooltip: "hover",
                },
              ]),
        ],
      },
    ];
  }, [user]);

  const hideTooltip = (hideFunc) => {
    setToggleNav(false);
    if (hideFunc) hideFunc();
  };

  const hoverWidth = themeConfig.sidebars.full;

  return (
    <section
      className="sidebar_section"
      css={css`
        z-index: 1100;
        position: fixed;
        top: var(--nav-height);
        ${isMobile
          ? `
          transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 500ms;
    ${
      toggleMenu && !isHorizontal
        ? `left: 0px;`
        : `left: calc(var(--sidebar-width) * -1);`
    }
          `
          : ` `}
        ${isHorizontal
          ? ` 
            top: var(--nav-height);
            width: var(--nav-width);
            --tw-shadow: 0 3px 5px -1px rgb(0 0 0 / 10%), 0 6px 10px 0 rgb(0 0 0 / 10%), 0 1px 18px 0 rgb(0 0 0 / 12%);
    --tw-shadow-colored: 0 3px 5px -1px var(--tw-shadow-color), 0 6px 10px 0 var(--tw-shadow-color), 0 1px 18px 0 var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);

            `
          : `height: 100%;`}
      `}
    >
      <Overlay
        isOpen={toggleMenu}
        handleIsOpen={() => {
          dispatch(getToggleMenu());
        }}
      />

      <div
        {...(!isHorizontal && {
          onMouseOver: () => setToggleNav(true),
          onMouseOut: () => setToggleNav(false),
        })}
        {...(toggleNav &&
          !isHorizontal && { style: { width: `${hoverWidth}px` } })}
        css={css`
          overflow: auto;
          position: relative
            ${isHorizontal
              ? ` 
            height: var(--nav-height);
            background-color: var(--cardSkeletonBg);
            `
              : `
            top: var(--nav-height);
            width: var(--sidebar-width);
            transition-property: all;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transition-duration: 150ms;
            padding-bottom: 100px;
            background-color: var(--neutralBgAlt);
            height: calc(100vh - var(--nav-height));
            `};
        `}
        className="hide_scrollbar"
      >
        <div
          css={css`
            position: relative;
            --tw-text-opacity: 1;
            color: rgb(255 255 255 / var(--tw-text-opacity));
            font-size: 1rem;
            line-height: 1.5rem;
            ${isHorizontal
              ? `
              display: flex;
              height: 100%;
              border-top-width: 1px;
              border-color: var(--onNeutralBgDivider);
              `
              : `
              `}
          `}
        >
          {currentUser ? (
            <>
              {navlinks.map((item) => (
                <div
                  key={item.name}
                  css={css`
                    margin-top: 1rem;
                    ${isHorizontal ? `display: flex; gap: 0.75rem;` : ``}
                  `}
                >
                  {((!isFolded && !isHorizontal) || toggleNav) && (
                    <span
                      css={css`
                        display: block;
                        padding: 0.75rem;
                        margin-left: 0.75rem;
                        margin-right: 0.75rem;
                        font-size: 0.875rem;
                        line-height: 1.25rem;
                        --tw-text-opacity: 1;
                        color: rgb(156 163 175 / var(--tw-text-opacity));
                        text-transform: uppercase;
                      `}
                    >
                      {item.name}
                    </span>
                  )}

                  <ul
                    css={css`
                      ${isHorizontal ? `display:flex;` : ``}
                    `}
                  >
                    {item.subLinks.map((link) => (
                      <Fragment key={link.name}>
                        <li
                          key={link.name}
                          className={`dropdown_${link.id}`}
                          css={css`
                            position: relative;
                            padding-left: 10px;
                            padding-right: 10px;
                            ${isHorizontal
                              ? `
                              display:flex;
                              align-items:center;
                              justify-content:center;
                              `
                              : ``}
                          `}
                        >
                          <Tooltip
                            id={link.id}
                            tooltipType={link.tooltip}
                            arrowPos={link?.arrowPos}
                            css={css`
                              ${link?.arrowClassName}
                            `}
                            TooltipComp={link?.tooltipContent}
                            disabled={link.tooltip === "hover"}
                            hideTooltipFunc={hideTooltip}
                          >
                            <button
                              onClick={() => {
                                if (link?.onClick) {
                                  link?.onClick();
                                } else if (link?.dialog) {
                                  return null;
                                } else if (link?.refFocus) {
                                  link?.refFocus?.current?.focus();
                                  dispatch(getToggleSearch(true));
                                } else {
                                  navigate(link.to);
                                }
                                dispatch(modalClose());
                              }}
                              css={css`
                                display: flex;
                                flex-direction: row;
                                gap: 0.5rem;
                                align-items: center;
                                border-style: none;
                                outline-width: 0px;
                                width: 100%;
                                height: 3rem;
                                ${isHorizontal
                                  ? `
                                  align-items: center;
                                  padding: 0.75rem;
                                  `
                                  : `
                                  padding-left: 20px;
                                  `}
                                ${pathname.includes(link.to)
                                  ? `
                                  border-radius: var(--border-radius);
                                  background-color: var(--primary-opacity);
                                  `
                                  : `
                                  `}
                              `}
                            >
                              <Icon
                                name={link.icon}
                                css={css`
                                  &:hover {
                                    color: var(--primary) !important;
                                  }
                                  ${pathname.includes(link.to)
                                    ? `
                                    color: var(--primary) !important;
                                    `
                                    : `
                                    `}
                                `}
                                size={20}
                              />

                              <div
                                css={css`
                                  &:hover {
                                    color: var(--primary);
                                  }
                                  font-size: 0.875rem;
                                  line-height: 1.25rem;
                                  display: flex;
                                  align-items: center;
                                  gap: 0.75rem;
                                  white-space: nowrap;
                                  ${pathname.includes(link.to)
                                    ? `color: var(--primary);`
                                    : `color: var(--onNeutralBg);`}
                                  ${!(isFolded && !isHorizontal && !isMobile) ||
                                  toggleNav
                                    ? `
                                    opacity: 1;
                                    transition-property: opacity;
                                    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
                                    transition-duration: 1000ms;
                                    `
                                    : `
                                    visibility: hidden;
                                    width: 0px;
                                    opacity: 0;
                                    `}
                                `}
                              >
                                {link.name}
                                {link.badgeCount && (
                                  <div
                                    css={css`
                                    display: flex; 
                                    right: 0.5rem; 
                                    justify-content: center; 
                                    align-items: center; 
                                    border-radius: 9999px; 
                                    width: 1rem; 
                                    height: 1rem; 
                                    animation: animation: bounce 1s infinite
                                    background-color: var(--primary);
                                    @keyframes bounce {
                                      0%, 100% {
                                        transform: translateY(-25%);
                                        animationTimingFunction: cubic-bezier(0.8, 0, 1, 1);
                                      }
                                      50% {
                                        transform: translateY(0);
                                        animationTimingFunction: cubic-bezier(0, 0, 0.2, 1);
                                      }
                                    } 
                                    &:hover {
                                      --tw-bg-opacity: 1;
                                      background-color: rgb(255 255 255 / var(--tw-bg-opacity));
                                    }
                                    `}
                                  >
                                    <span
                                      css={css`
                                        font-size: 0.75rem;
                                        line-height: 1rem;
                                        --tw-text-opacity: 1;
                                        color: rgb(
                                          255 255 255 / var(--tw-text-opacity)
                                        );
                                        &:hover {
                                          color: var(--primary);
                                        }
                                      `}
                                    >
                                      {3}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </button>
                          </Tooltip>
                        </li>
                      </Fragment>
                    ))}
                  </ul>
                </div>
              ))}
            </>
          ) : (
            <Skeletons.NavlistSkeleton />
          )}
          {user && isMobile ? (
            <div className="fixed bottom-0 p-2 bg-sidebar w-sidebar max-h-[100px]">
              <User />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
