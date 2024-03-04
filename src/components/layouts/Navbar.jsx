/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { isEmpty } from "lodash";

import { classNames, getTimeOfDay } from "@/lib/utils";
import { useSelector, useDispatch } from "react-redux";
import { logoutRequest } from "@/lib/store/slices";
import {
  getSearchRef,
  getToggleSearch,
  getToggleMenu,
} from "@/lib/store/slices";
import { useTheme } from "@/hooks";

import { Button, Icon, DropdownMenu, Overlay } from "@/components";
import { defaultThemeConfig } from "@/configs";
import { logo } from "@/constants";
import { css } from "@emotion/react";
const Searchbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [input, setInput] = useState("");
  const ref = useRef();

  const { toggleSearch } = useSelector((state) => state.appUtil);
  const [theme] = useTheme();

  useEffect(() => {
    const query = new URL(window.location.href).searchParams.get("q");
    if (query) {
      setInput(query);
    }
    if (!pathname.includes("/search")) {
      setInput("");
    }
  }, [pathname]);

  useEffect(() => {
    dispatch(
      getSearchRef({
        value: ref.current.value,
      })
    );
  }, [ref]);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!isEmpty(input.trim()) && input.trim().length >= 3) {
        const path = location.pathname;

        if (path === "/search") {
          navigate("?q=" + input);
        } else {
          navigate("search?q=" + input);
        }
      }
    }
  };

  return (
    <>
      <div
        css={css`
          width: 100%;
          height: 100%;
          ${theme?.isMobile
            ? `
            position: absolute;
            padding: 0.75rem;
            transition-duration: 300ms;
            left: 0px;
            ${
              toggleSearch
                ? `
              top: 0px;
              background-color: var(--cardBg);
              `
                : `
              top: calc(var(--nav-height) * -1);
              `
            }
            `
            : `
            display: flex;
            align-items: center;
            `}
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 100%;
            width: 100%;
            ${theme?.isMobile
              ? `
              padding-left: 0.75rem;
              padding-right: 0.75rem; 
              border-radius: var(--border-radius);
              border-width: 1px; 
              background-color: var(--neutralBg);
              transition-duration: 500ms; 
              border-color: var(--onNeutralBgDivider);
              &:hover {
                border-color: var(--onNeutralBg);
              }
              `
              : `
              `}
          `}
        >
          {theme?.isMobile && <Icon name="BiSearch" />}
          <input
            placeholder="Search songs, albums ..."
            css={css`
              padding-left: 1rem;
              padding-right: 1rem;
              flex: 1 1 0%;
              border-radius: var(--border-radius);
              color: var(--onNeutralBg);
              width: 100%;
              height: 3rem;
              font-size: 0.875rem;
              line-height: 1.25rem;
              outline-width: 0px;
              background-color: transparent;
              border-color: var(--onNeutralBg);
              &:focus {
                background-color: var(--cardBg);
              }
            `}
            className="search_bar"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleSearch}
            ref={ref}
          />
          {theme?.isMobile && (
            <button
              css={css`
                border-radius: var(--border-radius);
                width: 2rem;
                height: 2rem;
                transition-property: color, background-color, border-color,
                  text-decoration-color, fill, stroke;
                transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
                transition-duration: 500ms;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: var(--neutralBgAlt);
                &:hover {
                  --tw-bg-opacity: 1;
                  background-color: rgb(239 68 68 / var(--tw-bg-opacity));
                }
              `}
              onClick={() => dispatch(getToggleSearch(false))}
            >
              <Icon name="MdCancel" />
            </button>
          )}
        </div>
      </div>
      <div
        css={css`
          display: flex;
          align-items: center;
          height: 100%;

          @media (min-width: 1024px) {
            display: none;
          }
        `}
      >
        <button
          css={css`
            border-radius: var(--border-radius);
            width: 3rem;
            height: 3rem;
            transition-property: color, background-color, border-color,
              text-decoration-color, fill, stroke;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transition-duration: 500ms;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: var(--primary-opacity);
            &:hover {
              background-color: var(--primary);
            }
          `}
          onClick={() => dispatch(getToggleSearch(true))}
        >
          <Icon
            name="BiSearch"
            css={css`
              &:hover {
                --tw-text-opacity: 1 !important;
                color: rgb(255 255 255 / var(--tw-text-opacity)) !important;
              }
            `}
          />
        </button>
      </div>
    </>
  );
};

const SignUpButtons = () => {
  const navigate = useNavigate();
  return (
    <div
      css={css`
        display: flex;
        padding-left: 1rem;
        padding-right: 1rem;
        gap: 0;
        align-items: center;
      `}
    >
      <Button
        label="Sign Up"
        onClick={() => navigate("/register")}
        css={css`
          color: var(--onNeutralBg) !important;
          border-color: var(--onNeutralBg) !important;
        `}
      />
      <Button
        variant="contained"
        label="Log In"
        onClick={() => navigate("/login")}
      />
    </div>
  );
};

const UserMenu = () => {
  const { currentUser } = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const { user } = currentUser || {};
  const { email, username, imageUrl } = user || {};
  const signOut = () => {
    dispatch(logoutRequest());
  };
  const navigate = useNavigate();
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        height: 100%;
      `}
    >
      <DropdownMenu
        DropdownTrigger={() => (
          <div
            css={css`
              padding: 0.5rem;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 0.5rem;
              border-radius: 9999px;
              height: 100%;
              transition-property: color, background-color, border-color,
                text-decoration-color, fill, stroke;
              transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
              transition-duration: 500ms;
              background-color: var(--primary-opacity);
              &:hover {
                background-color: var(--primary);
              }
            `}
          >
            <div
              css={css`
                border-radius: 9999px;
                width: 2.25rem;
                height: 2.25rem;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: var(--neutralBg);
              `}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  css={css`
                    border-radius: 9999px;
                    width: 100%;
                    height: 100%;
                  `}
                />
              ) : (
                <Icon name="FaRegUser" size={16} />
              )}
            </div>
            <span
              css={css`
                padding-right: 0.5rem;
              `}
            >
              <Icon
                name="MdOutlineSettings"
                css={css`
                  &:hover {
                    --tw-text-opacity: 1 !important;
                    color: rgb(255 255 255 / var(--tw-text-opacity)) !important;
                  }
                `}
              />
            </span>
          </div>
        )}
        DropdownContent={() => (
          <div
            css={css`
              padding: 0.5rem;
              --tw-space-y-reverse: 0;
              margin-top: calc(
                0.75rem /* 12px */ * calc(1 - var(--tw-space-y-reverse))
              );
              margin-bottom: calc(
                0.75rem /* 12px */ * var(--tw-space-y-reverse)
              );
            `}
          >
            {email && (
              <div
                css={css`
                  padding: 0.75rem;
                  border-radius: var(--border-radius);
                  font-size: 0.875rem;
                  line-height: 1.25rem;
                  background-color: var(--neutralBg);
                `}
              >
                <h5
                  css={css`
                    font-size: 1.125rem;
                    line-height: 1.75rem;
                    font-weight: 600;
                  `}
                >
                  {getTimeOfDay()},{" "}
                  <span
                    css={css`
                      font-weight: 400;
                      text-transform: capitalize;
                    `}
                  >
                    {username}
                  </span>
                </h5>
                <span
                  css={css`
                    color: var(--onNeutralBgSecondary);
                  `}
                >
                  {email}
                </span>
              </div>
            )}
            <hr
              css={css`
                width: 100%;
                border-top-width: 1px;
                border-color: var(--onNeutralBgDivider);
              `}
            />

            <ul
              css={css`
                list-style-type: none;
                border-color: var(--onNeutralBgDivider);
              `}
            >
              {[
                {
                  id: "profile",
                  name: "Profile",
                  icon: "BiUser",
                  onClick: () => navigate("profile"),
                },
                {
                  id: "logout",
                  name: "Logout",
                  icon: "MdLogout",
                  onClick: signOut,
                },
              ].map((item) => (
                <li
                  css={css`
                    border-radius: var(--border-radius);
                    cursor: pointer;

                    &:hover {
                      color: var(--primary);
                      font-weight: 600;
                    }
                  `}
                  key={item.id}
                >
                  <button
                    css={css`
                      width: 100%;
                      padding: 1rem;
                      text-align: left;
                    `}
                    onClick={item.onClick}
                  >
                    <div
                      css={css`
                        display: flex;
                        gap: 0.75rem;
                      `}
                    >
                      <Icon
                        name={item.icon}
                        css={css`
                          &:hover {
                            color: var(--primary);
                          }
                        `}
                      />

                      <p
                        css={css`
                          font-size: 0.875rem;
                          line-height: 1.25rem;
                          white-space: nowrap;
                        `}
                      >
                        {item.name}
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        contentClassName="min-width: 300px;"
      />
    </div>
  );
};

const MobileToggleButton = () => {
  const dispatch = useDispatch();
  const { toggleMenu } = useSelector((state) => state.appUtil);
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        height: 100%;

        @media (min-width: 1024px) {
          display: none;
        }
      `}
    >
      <button
        css={css`
          border-radius: var(--border-radius);
          width: 3rem;
          height: 3rem;
          transition-property: color, background-color, border-color,
            text-decoration-color, fill, stroke;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 500ms;
          background-color: var(--primary-opacity);
          display: flex;
          align-items: center;
          justify-content: center;
          :hover {
            background-color: var(--primary);
          }
        `}
        onClick={() => dispatch(getToggleMenu(!toggleMenu))}
      >
        <Icon
          name="HiMenuAlt2"
          css={css`
            &:hover {
              --tw-text-opacity: 1 !important;
              color: rgb(255 255 255 / var(--tw-text-opacity)) !important;
            }
          `}
        />
      </button>
    </div>
  );
};

const DesktopToggleButton = () => {
  const [theme, setTheme] = useTheme();

  const changeTheme = (value) => {
    setTheme({ ...theme, ...value });
  };

  const sidebar = theme?.sidebar === "full" ? "folded" : "full";

  return (
    <div
      css={css`
        display: none;
        align-items: center;
        height: 100%;

        @media (min-width: 1024px) {
          display: flex;
        }
      `}
    >
      <button
        css={css`
          border-radius: var(--border-radius);
          width: 3rem;
          height: 3rem;
          transition-property: color, background-color, border-color,
            text-decoration-color, fill, stroke;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 500ms;
          background-color: var(--primary-opacity);
          display: flex;
          align-items: center;
          justify-content: center;
          :hover {
            background-color: var(--primary);
          }
        `}
        onClick={() => changeTheme({ sidebar })}
      >
        <Icon
          name="HiMenuAlt2"
          css={css`
            &:hover {
              --tw-text-opacity: 1 !important;
              color: rgb(255 255 255 / var(--tw-text-opacity)) !important;
            }
          `}
        />
      </button>
    </div>
  );
};

const Logo = ({ isFolded, isHorizontal }) => {
  const isMobile = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const showFull = Boolean(isFolded && !isHorizontal && isMobile);

  return (
    <div
      css={css`
        position: relative;
        padding: 0.75rem;
        z-index: 20;
        height: var(--nav-height);
        transition-duration: 500ms;
        ${!isHorizontal ? `width: var(--sidebar-width);` : ``}
        ${showFull
          ? `background-color: var(--primary);`
          : `@media (min-width: 1024px) {
              background-color: var(--neutralBgAlt);
      }`}
      `}
    >
      <Link
        to="/"
        css={css`
          display: flex;
          gap: 0.5rem;
          align-items: center;
          width: fit-content;
          height: 100%;
        `}
      >
        <div
          css={css`
            ${showFull
              ? `
            position: absolute;
            top: 50%;
            left: 50%;
            --tw-translate-x: -50%;
            transform: translate(var(--tw-translate-x), var(--tw-translate-y))
              rotate(var(--tw-rotate)) skewX(var(--tw-skew-x))
              skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x))
              scaleY(var(--tw-scale-y));
            --tw-translate-y: -50%;
            transform: translate(var(--tw-translate-x), var(--tw-translate-y))
              rotate(var(--tw-rotate)) skewX(var(--tw-skew-x))
              skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x))
              scaleY(var(--tw-scale-y));
          `
              : ""}
          `}
        >
          <Icon
            name={logo.icon}
            size={25}
            css={css`
              ${showFull
                ? `--tw-text-opacity: 1 !important;
                color: rgb(255 255 255 / var(--tw-text-opacity)) !important;`
                : `color: var(--primary) !important;`}
            `}
          />
        </div>

        <h1
          css={css`
            font-size: 20px;
            color: var(--primary);
            font-weight: 700;
            transition-property: opacity;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transition-duration: 150ms;
            ${showFull
              ? `
              visibility: hidden;
              width: 0px;
              opacity: 0;
              `
              : `
              opacity: 1;
              `}
          `}
        >
          {logo.name}
        </h1>
      </Link>
    </div>
  );
};

export default function Navbar() {
  const { toggleSearch } = useSelector((state) => state.appUtil);
  const [theme] = useTheme();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.currentUser);

  const { orientation, sidebar, isMobile } = theme || defaultThemeConfig;
  const isHorizontal = orientation === "horizontal" && !isMobile;
  const isFolded = sidebar === "folded";

  const { user } = currentUser || {};

  return (
    <nav
      css={css`
        position: fixed;
        z-index: 1200;
        height: var(--nav-height);
        top: 0px;
        background-color: var(--neutralBgOpacity);
        --tw-backdrop-blur: blur(50px);
        backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness)
          var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale)
          var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert)
          var(--tw-backdrop-opacity) var(--tw-backdrop-saturate)
          var(--tw-backdrop-sepia);
        width: var(--nav-width);
      `}
    >
      <Overlay
        isOpen={toggleSearch}
        handleIsOpen={() => {
          dispatch(getToggleSearch);
        }}
      />
      <div
        css={css`
          position: absolute;
          width: 100%;
          height: 100%;
          transition-property: all;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 300ms;
        `}
      />

      <div
        css={css`
          position: relative;
          display: flex;
          height: 100%;
          align-items: center;
          justify-content: space-between;
          ${isHorizontal ? `background-color: var(--neutralBgAlt);` : ``}
        `}
        className={classNames(
          "relative flex h-full items-center justify-between",
          isHorizontal && "bg-sidebar"
        )}
      >
        <Logo isFolded={isFolded} isHorizontal={isHorizontal} />
        <div
          css={css`
            display: flex;
            padding-left: 0.75rem;
            padding-right: 0.75rem;
            gap: 1rem;
            align-items: center;

            @media (min-width: 1024px) {
              flex: 1 1 0%;
            }
          `}
        >
          <div
            css={css`
              display: flex;
              z-index: 20;
              flex: 1 1 0%;
              gap: 1rem;
              align-items: center;
              height: 100%;
            `}
          >
            {!isHorizontal && <DesktopToggleButton />}
            <Searchbar />
            <MobileToggleButton />
          </div>
          {!isMobile ? (
            <div
              css={css`
                display: flex;
                gap: 1rem;
                align-items: center;
                height: 100%;
              `}
            >
              {user ? (
                <>
                  <UserMenu />
                </>
              ) : (
                <SignUpButtons />
              )}
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
