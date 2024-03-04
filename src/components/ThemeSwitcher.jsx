import { useState } from "react";
import { capitalize, startCase } from "lodash";
import Slider from "rc-slider";

import { useDispatch, useSelector } from "react-redux";
import { getOpenSwitch as setOpenSwitch } from "@/lib/store/slices";
import { useTheme } from "@/hooks";
import { css } from "@emotion/react";
import { themeConfig, defaultThemeConfig } from "@/configs";

import { Icon, Button, Tab, Overlay } from ".";

import "rc-slider/assets/index.css";

const themeIcon = {
  light: "MdOutlineLightMode",
  dark: "MdDarkMode",
};

const Swatch = ({ theme, setTheme }) => {
  const { modes, colors, themes, sidebars, orientations, players } =
    themeConfig || {};

  const { color, mode } = theme;
  const changeTheme = (value) => {
    setTheme({ ...defaultThemeConfig, ...theme, ...value });
  };

  return (
    <div
      className="switch_content"
      css={css`
        background-color: var(--switchBg);
      `}
    >
      <div className="switch_mode">
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1rem;
            border-bottom-width: 1px;
            border-color: var(--onNeutralBgDivider);
          `}
        >
          <h4
            css={css`
              font-size: 0.875rem;
              line-height: 1.25rem;
              text-transform: uppercase;
            `}
          >
            Theme Mode
          </h4>
          <div
            css={css`
              display: flex;
              flex-direction: row;
              gap: 1rem;
            `}
          >
            {modes.map((mode) => {
              const isActive = theme?.mode === mode;
              return (
                <button
                  key={mode}
                  css={css`
                    border-width: 2px;
                    border-radius: var(--border-radius);
                    height: 3rem;
                    width: 3rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    ${isActive
                      ? `border-color: var(--primary);`
                      : `border-color: var(--onNeutralBgSecondary);`}
                  `}
                  onClick={() =>
                    changeTheme({
                      mode,
                      theme:
                        mode === "light"
                          ? "theme_light"
                          : `theme_dark_${color}`,
                    })
                  }
                >
                  <Icon
                    name={themeIcon[mode]}
                    css={css`
                      ${mode === "light"
                        ? `--tw-text-opacity: 1;
                    color: rgb(250 204 21 / var(--tw-text-opacity));`
                        : ``}
                    `}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="switch_color">
        <div
          css={css`
            padding: 1rem;
            --tw-space-y-reverse: 0;
            margin-top: calc(
              1rem /* 16px */ * calc(1 - var(--tw-space-y-reverse))
            );
            margin-bottom: calc(1rem /* 16px */ * var(--tw-space-y-reverse));
            border-bottom-width: 1px;
            border-color: var(--onNeutralBgDivider);
          `}
        >
          <h4
            css={css`
              font-size: 0.875rem;
              line-height: 1.25rem;
              text-transform: uppercase;
            `}
          >
            Preset Color
          </h4>
          <div
            css={css`
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;
              gap: 1rem;
            `}
          >
            {Object.entries(colors).map((color) => {
              const isActive = theme?.color === color[0];
              const { primary } = color[1];

              const themeC =
                mode === "light" ? "theme_light" : `theme_dark_${color[0]}`;

              const main = themes?.[themeC]?.neutralBg;

              return (
                <button
                  key={color[0]}
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${main} 50%, ${primary} 50%)`,
                  }}
                  css={css`
                    position: relative;
                    border-radius: 9999px;
                    border-width: 0px;
                    height: 3rem;
                    width: 3rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    ${isActive
                      ? "border-color: var(--primary);"
                      : "border-color: var(--onNeutralBgSecondary);"}
                  `}
                  onClick={() =>
                    changeTheme({
                      color: color[0],
                      theme: themeC,
                    })
                  }
                >
                  {isActive && (
                    <Icon
                      name="BsPalette"
                      css={css`
                        ${mode === "light"
                          ? `--tw-text-opacity: 1 !important;color: rgb(24 24 27 / var(--tw-text-opacity)) !important;`
                          : `--tw-text-opacity: 1 !important;
                        color: rgb(255 255 255 / var(--tw-text-opacity)) !important;`}
                      `}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="switch_sidebar">
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1rem;
            border-bottom-width: 1px;
            border-color: var(--onNeutralBgDivider);
          `}
        >
          <h4
            css={css`
              font-size: 0.875rem;
              line-height: 1.25rem;
              text-transform: uppercase;
            `}
          >
            Sidebar drawer
          </h4>
          <div
            css={css`
              display: flex;
              flex-direction: row;
              gap: 1rem;
            `}
          >
            {Object.entries(sidebars).map((sidebar) => {
              const w = Math.round(+sidebar[1] / 9);
              const isActive = theme?.sidebar === sidebar[0];
              const color = colors?.[theme?.color]?.primary;
              return (
                <button
                  key={sidebar[0]}
                  css={css`
                    border-width: 2px;
                    border-radius: 2px;
                    height: 3rem;
                    width: 3rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0.25rem;
                    ${isActive
                      ? `border-color: var(--primary);`
                      : `border-color: var(--onNeutralBgSecondary);`}
                  `}
                  onClick={() =>
                    changeTheme({
                      sidebar: sidebar[0],
                    })
                  }
                >
                  <div
                    css={css`
                      position: relative;
                      width: 100%;
                      height: 100%;
                      border-width: 1px;
                      border-style: dashed;
                      border-radius: 2px;
                      border-color: var(--onNeutralBgSecondary);
                    `}
                  >
                    <div
                      style={{
                        backgroundColor: color,
                        width: `${w}px`,
                      }}
                      css={css`
                        position: absolute;
                        height: 100%;
                        border-radius: 2px;
                      `}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="switch_layout">
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1rem;
            border-bottom-width: 1px;
            border-color: var(--onNeutralBgDivider);
          `}
        >
          <h4
            css={css`
              font-size: 0.875rem;
              line-height: 1.25rem;
              text-transform: uppercase;
            `}
          >
            Theme Layout
          </h4>
          <div
            css={css`
              display: flex;
              flex-direction: row;
              gap: 1rem;
            `}
          >
            {orientations.map((orientation) => {
              const color = colors?.[theme?.color]?.primary;

              const isActive = theme?.orientation === orientation;
              return (
                <button
                  key={orientation}
                  css={css`
                    border-width: 2px;
                    border-radius: 2px;
                    height: 3rem;
                    width: 3rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0.25rem;
                    ${isActive
                      ? `border-color: var(--primary);`
                      : `border-color: var(--onNeutralBgSecondary);`}
                  `}
                  onClick={() =>
                    changeTheme({
                      orientation,
                    })
                  }
                >
                  <div
                    css={css`
                      position: relative;
                      width: 100%;
                      height: 100%;
                      border-width: 1px;
                      border-style: dashed;
                      border-radius: 2px;
                      border-color: var(--onNeutralBgSecondary);
                    `}
                  >
                    <div
                      style={{
                        backgroundColor: color,
                      }}
                      css={css`
                        position: absolute;
                        border-radius: 2px;
                        ${orientation === "vertical"
                          ? `height: 100%; width: 33.333333%;`
                          : `width: 100%; height: 33.333333%;`}
                      `}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="switch_player">
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1rem;
            border-bottom-width: 1px;
            border-color: var(--onNeutralBgDivider);
          `}
        >
          <h4
            css={css`
              font-size: 0.875rem;
              line-height: 1.25rem;
              text-transform: uppercase;
            `}
          >
            Player Layout
          </h4>
          <div
            css={css`
              display: flex;
              flex-direction: row;
              gap: 0.5rem;
            `}
          >
            {players.map((player) => {
              const isActive = theme?.player === player;

              return (
                <button
                  key={player}
                  css={css`
                    background-color: var(--primary-opacity);
                    border-radius: 9999px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding-top: 0.5rem;
                    padding-bottom: 0.5rem;
                    padding-left: 1rem;
                    padding-right: 1rem;
                    border-width: 1px;
                    ${isActive
                      ? `background-color: var(--primary-opacity);`
                      : `border-color: var(--primary-opacity);`}
                  `}
                  onClick={() =>
                    changeTheme({
                      player,
                    })
                  }
                >
                  <span
                    css={css`
                      font-size: 0.875rem;
                      line-height: 1.25rem;
                    `}
                  >
                    {capitalize(player)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const Fonts = ({ theme, setTheme }) => {
  const { fontFamilies } = themeConfig || {};
  const { borderRadius } = theme || {};
  const changeTheme = (value) => {
    setTheme({ ...defaultThemeConfig, ...theme, ...value });
  };
  const min = 2;
  const max = 24;

  const handleRender = (node, props) => {
    const pos = 100 / (max - min);

    return (
      <div value={props.value}>
        {node}
        {props.dragging && (
          <div
            style={{ left: `${(props.value - min) * pos}%`, borderRadius: 2 }}
            css={css`
              position: absolute;
              width: 1.5rem;
              height: 2rem;
              font-size: 0.875rem;
              line-height: 1.25rem;
              background-color: var(--primary);
              --tw-shadow: rgba(0, 0, 0, 0.2) 0 8px 10px -5px,
                rgba(0, 0, 0, 0.14) 0 16px 24px 2px,
                rgba(0, 0, 0, 0.12) 0 6px 30px 5px;
              --tw-shadow-colored: 0 8px 10px -5px var(--tw-shadow-color),
                0 16px 24px 2px var(--tw-shadow-color),
                0 6px 30px 5px var(--tw-shadow-color);
              box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
                var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
              top: -2.5rem;
              display: flex;
              align-items: center;
              justify-content: center;
              --tw-translate-x: -50%;
              transform: translate(var(--tw-translate-x), var(--tw-translate-y))
                rotate(var(--tw-rotate)) skewX(var(--tw-skew-x))
                skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x))
                scaleY(var(--tw-scale-y));
            `}
          >
            {props.value}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className="switch_content"
      css={css`
        background-color: var(--switchBg);
      `}
    >
      <div className="switch_font">
        <div
          css={css`
            padding: 1rem;
            --tw-space-y-reverse: 0;
            margin-top: calc(
              1rem /* 16px */ * calc(1 - var(--tw-space-y-reverse))
            );
            margin-bottom: calc(1rem /* 16px */ * var(--tw-space-y-reverse));
            border-bottom-width: 1px;
            border-color: var(--onNeutralBgDivider);
          `}
        >
          <h4
            css={css`
              font-size: 0.875rem;
              line-height: 1.25rem;
              text-transform: uppercase;
            `}
          >
            Font Style
          </h4>
          <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 1rem;
            `}
          >
            {fontFamilies.map((font) => {
              const isActive = theme?.fontFamily === font;
              return (
                <button
                  key={font}
                  css={css`
                    width: 100%;
                    border-width: 1px;
                    border-radius: var(--border-radius);
                    text-align: left;
                    padding: 0.75rem;
                    background-color: var(--neutralBg);
                    ${isActive
                      ? `border-color: var(--primary);`
                      : `border-color: var(--onNeutralBgDivider);`}
                  `}
                  onClick={() =>
                    changeTheme({
                      fontFamily: font,
                    })
                  }
                >
                  {startCase(font)}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="switch_border_radius">
        <div
          css={css`
            padding: 1rem;
            --tw-space-y-reverse: 0;
            margin-top: calc(
              1rem /* 16px */ * calc(1 - var(--tw-space-y-reverse))
            );
            margin-bottom: calc(1rem /* 16px */ * var(--tw-space-y-reverse));
            border-bottom-width: 1px;
            border-color: var(--onNeutralBgDivider);
          `}
        >
          <h4
            css={css`
              font-size: 0.875rem;
              line-height: 1.25rem;
              text-transform: uppercase;
            `}
          >
            Border Radius
          </h4>

          <div
            css={css`
              position: relative;
              display: flex;
              align-items: center;
              gap: 0.75rem;
              padding-top: 1.5rem;
            `}
          >
            <span
              css={css`
                font-size: 0.875rem;
                line-height: 1.25rem;
              `}
            >
              {min}px
            </span>
            <Slider
              min={min}
              max={max}
              defaultValue={borderRadius}
              onChange={(e) =>
                changeTheme({
                  borderRadius: e,
                })
              }
              handleRender={handleRender}
              style={{
                handle: {
                  backgroundColor: "var(--primary)",
                  borderColor: "var(--primary)",
                },
                track: {
                  backgroundColor: "var(--primary)",
                },
              }}
            />
            <span
              css={css`
                font-size: 0.875rem;
                line-height: 1.25rem;
              `}
            >
              {max}px
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ThemeSwitcher() {
  const [theme, setTheme] = useTheme();

  const { openSwitch } = useSelector((state) => state.appUtil);
  const [currentTab, setCurrentTab] = useState("swatch");
  const dispatch = useDispatch();
  const handleOpenSwitch = (value) => {
    dispatch(setOpenSwitch(value));
  };
  return (
    <section
      css={css`
        position: fixed;
        z-index: 1200;
        top: 0px;
        height: 100vh;
        transition-duration: 300ms;
        transition-property: all;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 150ms;
        transition-timing-function: linear;
        width: var(--aside-width);
        ${openSwitch ? `right: 0px;` : `right: calc(var(--aside-width) * -1);`}
      `}
    >
      <button
        css={css`
          position: absolute;
          z-index: 1045;
          border-top-left-radius: 9999px;
          border-top-right-radius: 9999px;
          border-bottom-left-radius: 9999px;
          border-bottom-right-radius: var(--border-radius);
          width: 40px;
          height: 40px;
          top: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--primary);
          box-shadow: var(--primary-light-gray) 0px 5px 14px 0px;
          left: -45px;
          top: 5rem;
        `}
        onClick={() => handleOpenSwitch(!openSwitch)}
      >
        <Icon
          name={openSwitch ? "IoMdCloseCircle" : "MdOutlineSettings"}
          css={css`
            --tw-text-opacity: 1 !important;
            color: rgb(255 255 255 / var(--tw-text-opacity)) !important;
            ${!openSwitch
              ? `@keyframes spin {
              to {
                transform: rotate(360deg);
              }
            }
            animation: spin 1s linear infinite;`
              : ``}
          `}
        />
      </button>

      <Overlay
        isOpen={openSwitch}
        handleIsOpen={handleOpenSwitch}
        transparent
      />

      <div
        css={css`
          position: relative;
          height: 100vh;
          overflow: auto;
          color: var(--onNeutralBg);
          background-color: var(--switchBg);
          .shadow-box {
            --tw-shadow: rgba(0, 0, 0, 0.2) 0 8px 10px -5px,
              rgba(0, 0, 0, 0.14) 0 16px 24px 2px,
              rgba(0, 0, 0, 0.12) 0 6px 30px 5px;
            --tw-shadow-colored: 0 8px 10px -5px var(--tw-shadow-color),
              0 16px 24px 2px var(--tw-shadow-color),
              0 6px 30px 5px var(--tw-shadow-color);
            box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
              var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
          }
        `}
      >
        <div
          css={css`
            padding: 1.25rem;
            padding-bottom: 1rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
          `}
        >
          <h5 className="">Theme Customization</h5>
          <div
            css={css`
              display: flex;
              align-items: center;
              gap: 0.5rem;
            `}
          >
            <Button
              label="Reset"
              variant="outlined"
              css={css`
                --tw-border-opacity: 1 !important;
                border-color: rgb(
                  239 68 68 / var(--tw-border-opacity)
                ) !important;
                --tw-text-opacity: 1 !important;
                color: rgb(239 68 68 / var(--tw-text-opacity)) !important;
              `}
              onClick={() => setTheme(defaultThemeConfig)}
            />
            <button
              css={css`
                width: 2rem;
                height: 2rem;
                border-radius: var(--border-radius);
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: var(--neutralBg);
              `}
              onClick={() => handleOpenSwitch(false)}
            >
              <Icon name="TiTimes" />
            </button>
          </div>
        </div>
        <div
          css={css`
            border-top-width: 1px;
            background-color: var(--neutralBg);
            border-color: var(--onNeutralBgDivider);
          `}
        >
          <Tab
            tabs={[
              {
                id: "swatch",
                name: "",
                icon: "TbColorSwatch",
                display: true,
              },
              {
                id: "fonts",
                name: "",
                icon: "AiOutlineFontSize",
                display: true,
              },
            ]}
            isLoaded
            content={{
              swatch: <Swatch theme={theme} setTheme={setTheme} />,
              fonts: <Fonts theme={theme} setTheme={setTheme} />,
            }}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            fullWidth
          />
        </div>
      </div>
    </section>
  );
}
