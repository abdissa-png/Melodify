import { useEffect, useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import { css } from "@emotion/react";
import { truncate, formatIndexToDouble } from "@/lib/utils";
import { usePlayer, useTheme } from "@/hooks";

import { IconButton, Icon } from "@/components";

const PlayerVolume = ({ muted, volume, handleVolumeMute, handleSetVolume }) => {
  return (
    <div
      css={css`
        position: relative;
        display: flex;
      `}
    >
      <IconButton
        name={
          !muted
            ? volume > 0.5
              ? "BiVolumeFull"
              : "BiVolumeLow"
            : "BiVolumeMute"
        }
        onClick={handleVolumeMute}
      />

      <div
        css={css`
          position: absolute;
          bottom: 2rem;
          background-color: var(--cardBg);
          padding: 1rem;
          display: none;
          &:hover {
            display: block;
          }
          border-radius: var(--border-radius);
          right: 50%;
          --tw-translate-x: 50%;
          transform: translate(var(--tw-translate-x), var(--tw-translate-y))
            rotate(var(--tw-rotate)) skewX(var(--tw-skew-x))
            skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x))
            scaleY(var(--tw-scale-y));
          --tw-shadow: 0 3px 5px -1px rgb(0 0 0 / 10%),
            0 6px 10px 0 rgb(0 0 0 / 10%), 0 1px 18px 0 rgb(0 0 0 / 12%);
          --tw-shadow-colored: 0 3px 5px -1px var(--tw-shadow-color),
            0 6px 10px 0 var(--tw-shadow-color),
            0 1px 18px 0 var(--tw-shadow-color);
          box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
            var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
        `}
      >
        <Slider.Root
          css={css`
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: var(--onNeutralBg);
            user-select: none;
            touch-action: none;
            width: 5px;
            height: 100px;
            border-radius: 9999px;
          `}
          max={100}
          step={1}
          orientation="vertical"
          value={[muted ? 0 : volume * 100]}
          onValueChange={handleSetVolume}
        >
          <Slider.Track
            css={css`
              position: relative;
              height: 100%;
              border-radius: 9999px;
              background-color: var(--playerBg);
              flex-grow: 1;
            `}
          >
            <Slider.Range
              css={css`
                position: absolute;
                width: 100%;
                border-radius: 9999px;
                background-color: var(--onNeutralBg);
              `}
            />
          </Slider.Track>

          <Slider.Thumb
            css={css`
              position: relative;
              right: 0px;
              display: block;
              width: 1.25rem;
              height: 0.75rem;
              border-radius: var(--border-radius);
              cursor: pointer;
              background-color: var(--onNeutralBg);
              --tw-shadow: 0 3px 5px -1px rgb(0 0 0 / 10%),
                0 6px 10px 0 rgb(0 0 0 / 10%), 0 1px 18px 0 rgb(0 0 0 / 12%);
              --tw-shadow-colored: 0 3px 5px -1px var(--tw-shadow-color),
                0 6px 10px 0 var(--tw-shadow-color),
                0 1px 18px 0 var(--tw-shadow-color);
              box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
                var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
              &:hover {
                background-color: var(--playerBg);
              }
              &:focus {
                outline: 2px solid transparent;
                outline-offset: 2px;
              }
            `}
            aria-label="Volume"
          />
        </Slider.Root>
      </div>
    </div>
  );
};

const PlayerProgressBar = ({
  audioBarContainerRef,
  handleSeek,
  progressBarWidth,
}) => {
  return (
    <div
      css={css`
        width: 100%;
        height: 0.25rem;
        border-radius: 9999px;
        cursor: pointer;
        background-color: var(--playerBg);
      `}
      ref={audioBarContainerRef}
      onClick={handleSeek}
    >
      <div
        style={{ width: `${progressBarWidth}%` }}
        css={css`
          height: 0.25rem;
          border-radius: 9999px;
          background-color: var(--primary);
        `}
      />
    </div>
  );
};

const PlayerButtons = ({ audioIconList }) => {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        gap: 1rem;
      `}
    >
      {audioIconList.map((item) => (
        <button key={item.icon} onClick={item.handleClick}>
          <Icon
            name={item.icon}
            size={item.iconSize}
            css={css`
              ${item.className} color: var(--playerBg);
            `}
          />
        </button>
      ))}
    </div>
  );
};

const QueueButton = ({ setOpenQueue, openQueue }) => {
  return (
    <IconButton
      name="HiOutlineQueueList"
      onClick={() => setOpenQueue(!openQueue)}
    />
  );
};

export default function TrackPlayer() {
  const {
    usePlayerInit,
    currentTrack,
    tracklist,
    handlePlayPause,
    handleNext,
    handlePrev,
    handleSetVolume,
    handleVolumeMute,
    handleSeek,
    handleLoop,
    handleShuffle,
    volume,
    progressBarWidth,
    getTimer,
    audioBarContainerRef,
    isLooping,
    isShuffle,
  } = usePlayer();

  const [miniPlayer, setMiniPlayer] = useState(false);
  const [openQueue, setOpenQueue] = useState(false);
  const { playing, duration, muted } = useGlobalAudioPlayer();

  const [theme] = useTheme();

  const { player, isMobile } = theme || {};

  usePlayerInit();

  useEffect(() => {
    if (isMobile) {
      setMiniPlayer(true);
    } else {
      setMiniPlayer(false);
    }
  }, [isMobile]);

  useEffect(() => {
    if (miniPlayer) {
      setOpenQueue(false);
    }
  }, [miniPlayer]);

  const { name, artistName, image } = currentTrack || {};

  const audioIconList = [
    {
      icon: "TbArrowsShuffle2",
      handleClick: handleShuffle,
      iconSize: 18,
      className: isShuffle ? "" : "opacity: 0.5;",
    },
    {
      icon: "BiSkipPrevious",
      handleClick: handlePrev,
      iconSize: 28,
      className: "opacity: 0.8;  &:hover { opacity:1; };",
    },
    {
      icon: !playing ? "BsFillPlayCircleFill" : "BsFillPauseCircleFill",
      iconSize: 32,
      handleClick: handlePlayPause,
      className:
        " &:hover { --tw-scale-x: 1.05; --tw-scale-y: 1.05; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }",
    },
    {
      icon: "BiSkipNext",
      handleClick: handleNext,
      iconSize: 28,
      className: "opacity: 0.8; &:hover { opacity: 1; };",
    },
    {
      icon: "CgRepeat",
      handleClick: handleLoop,
      iconSize: 25,
      className: isLooping ? "opacity:1;" : "opacity: 0.5;",
    },
  ];

  const playPauseBtn = audioIconList[2];

  const isPlayerBoxed = player === "boxed" || isMobile;

  const getQueueTracks = tracklist.slice(
    currentTrack?.index + 1,
    currentTrack?.index + 4
  );

  if (duration === Infinity) return null;

  return (
    <>
      {currentTrack && (
        <div
          css={css`
            position: fixed;
            bottom: 0px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            z-index: 30;
            transition-duration: 500ms;
            transition-property: max-height;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transition-duration: 150ms;
            background-color: var(--neutralBgAlt);
            ${isPlayerBoxed
              ? `padding: 0.5rem;
             width: 250px;
             right: 0px;
             @media (min-width: 450px) {
                    width: 280px;
            };
            --tw-shadow: rgba(0, 0, 0, 0.2) 0 8px 10px -5px, rgba(0, 0, 0, 0.14) 0 16px 24px 2px, rgba(0, 0, 0, 0.12) 0 6px 30px 5px;
            --tw-shadow-colored: 0 8px 10px -5px var(--tw-shadow-color), 0 16px 24px 2px var(--tw-shadow-color), 0 6px 30px 5px var(--tw-shadow-color);
            box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
            @media (min-width: 1280px) {
                    right: var(--aside-width);
            }
            border-radius: var(--border-radius);
            max-height: 100%;
            border-width: 0px;
            border-color: var(--onNeutralBgDivider);
            gap: 2rem;
             `
              : `
              width: var(--main-width);
              height: var(--player-height);
              left: var(--sidebar-width);
              `}
          `}
        >
          <div
            css={css`
              position: absolute;
              right: 0px;
              transition-duration: 500ms;
              border-top-left-radius: var(--border-radius);
              border-top-right-radius: var(--border-radius);
              --tw-shadow: rgba(0, 0, 0, 0.2) 0 8px 10px -5px,
                rgba(0, 0, 0, 0.14) 0 16px 24px 2px,
                rgba(0, 0, 0, 0.12) 0 6px 30px 5px;
              --tw-shadow-colored: 0 8px 10px -5px var(--tw-shadow-color),
                0 16px 24px 2px var(--tw-shadow-color),
                0 6px 30px 5px var(--tw-shadow-color);
              box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
                var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
              width: 250px;
              @media (min-width: 450px) {
                width: 280px;
              }
              ${openQueue
                ? isPlayerBoxed
                  ? `
                bottom: 0px;
                background-color: var(--cardSkeletonBg);
                z-index: 50;
                  `
                  : `
                  bottom: var(--player-height);
                  background-color: var(--neutralBgAlt);
                      `
                : `bottom: -500px;`}
            `}
          >
            <p
              css={css`
                padding: 1rem;
                font-weight: 600;
                border-bottom-width: 1px;
                border-color: var(--onNeutralBgDivider);
              `}
            >
              Queue List
            </p>
            <ul
              css={css`
                list-style-type: none;
                --tw-divide-y-reverse: 0;
                border-top-width: calc(
                  1px * calc(1 - var(--tw-divide-y-reverse))
                );
                border-bottom-width: calc(1px * var(--tw-divide-y-reverse));
                border-color: var(--onNeutralBgDivider);
              `}
            >
              {getQueueTracks ? (
                getQueueTracks?.map((item, index) => (
                  <li
                    key={item?.id}
                    css={css`
                      display: flex;
                      align-items: center;
                      gap: 1rem;
                      padding: 1rem;
                      font-size: 0.875rem;
                      line-height: 1.25rem;
                    `}
                  >
                    <span>{formatIndexToDouble(index + 1)}</span>
                    <span>{item?.name}</span>
                    <span
                      css={css`
                        color: var(--onNeutralBgSecondary);
                      `}
                    >
                      {item?.artistName}
                    </span>
                  </li>
                ))
              ) : (
                <li
                  css={css`
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1rem;
                    font-size: 0.875rem;
                    line-height: 1.25rem;
                  `}
                >
                  <span
                    css={css`
                      color: var(--onNeutralBgSecondary);
                    `}
                  >
                    End of queue
                  </span>
                </li>
              )}
            </ul>
          </div>

          <div
            css={css`
              background-color: var(--neutralBgAlt);
              height: 100%;
              ${!isMobile ? `position:relative;` : ``}
            `}
          >
            {isPlayerBoxed ? (
              <div
                css={css`
                  border-width: 1px;
                  border-radius: var(--border-radius);
                  background-color: var(--cardSkeletonBg);
                  border-color: var(--onNeutralBgDivider);
                  ${miniPlayer ? "padding:0px;" : "padding: 1rem"}
                `}
              >
                <div
                  css={css`
                    position: absolute;
                    border-width: 0px;
                    right: 0.5rem;
                    top: 0.5rem;
                    z-index: 50;
                    ${!miniPlayer
                      ? `
                        --tw-rotate: 180deg;
                        transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
                                      `
                      : ``}
                  `}
                >
                  <IconButton
                    name="MdKeyboardArrowUp"
                    onClick={() => {
                      setMiniPlayer(!miniPlayer);
                      setOpenQueue(false);
                    }}
                  />
                </div>

                {!miniPlayer && (
                  <div
                    css={css`
                      position: absolute;
                      z-index: 50;
                      border-width: 0px;
                      left: 1rem;
                      top: 0.5rem;
                    `}
                  >
                    <QueueButton {...{ openQueue, setOpenQueue }} />
                  </div>
                )}
                <div
                  css={css`
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    color: var(--onNeutralBg);
                    position: relative;
                    ${miniPlayer
                      ? `margin-bottom: 0.5rem;`
                      : `margin-bottom: 2rem;`}
                  `}
                >
                  {!miniPlayer && (
                    <img
                      src={image}
                      css={css`
                        object-fit: cover;
                        width: 8rem;
                        height: 8rem;
                        border-radius: var(--border-radius);
                        aspect-ratio: 1 / 1;
                        --tw-shadow: 0 3px 5px -1px rgb(0 0 0 / 10%),
                          0 6px 10px 0 rgb(0 0 0 / 10%),
                          0 1px 18px 0 rgb(0 0 0 / 12%);
                        --tw-shadow-colored: 0 3px 5px -1px var(--tw-shadow-color),
                          0 6px 10px 0 var(--tw-shadow-color),
                          0 1px 18px 0 var(--tw-shadow-color);
                        box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
                          var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
                      `}
                      alt="player-image"
                    />
                  )}
                  <div
                    css={css`
                      flex-direction: column;
                      margin-top: 0.5rem;
                      font-size: 0.875rem;
                      line-height: 1.25rem;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                    `}
                  >
                    <span>{truncate(name, 20)}</span>
                    <span
                      css={css`
                        color: var(--onNeutralBgSecondary);
                      `}
                    >
                      {truncate(artistName, 20)}
                    </span>
                  </div>
                </div>

                {!miniPlayer ? (
                  <div
                    css={css`
                      position: relative;
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                      gap: 0.5rem;
                    `}
                  >
                    <div
                      css={css`
                        position: absolute;
                        top: -3rem;
                        left: -1rem;
                      `}
                    >
                      <PlayerVolume
                        {...{
                          muted,
                          volume,
                          handleVolumeMute,
                          handleSetVolume,
                        }}
                      />
                    </div>

                    <PlayerProgressBar
                      {...{
                        audioBarContainerRef,
                        handleSeek,
                        progressBarWidth,
                      }}
                    />

                    <div
                      css={css`
                        font-size: 0.875rem;
                        line-height: 1.25rem;
                        color: var(--onNeutralBgSecondary);
                      `}
                    >
                      {getTimer}
                    </div>

                    <PlayerButtons
                      audioIconList={audioIconList}
                      miniPlayer={miniPlayer}
                    />
                  </div>
                ) : (
                  <div
                    css={css`
                      padding-bottom: 0.5rem;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                    `}
                  >
                    <button
                      key={playPauseBtn.icon}
                      onClick={playPauseBtn.handleClick}
                    >
                      <Icon
                        name={playPauseBtn.icon}
                        size={playPauseBtn.iconSize}
                        css={css`
                          ${playPauseBtn.className}
                        `}
                      />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <PlayerProgressBar
                  {...{
                    audioBarContainerRef,
                    handleSeek,
                    progressBarWidth,
                  }}
                />

                <div
                  css={css`
                    height: 100%;
                    gap: 1rem;
                    padding-left: 1rem;
                    padding-right: 1rem;
                    padding-top: 0.5rem;
                    padding-bottom: 0.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  `}
                >
                  <div
                    css={css`
                      width: 30%;
                      display: flex;
                      align-items: center;
                      justify-content: flex-start;
                      color: var(--onNeutralBg);
                    `}
                  >
                    <img
                      src={image}
                      css={css`
                        object-fit: cover;
                        width: 3rem;
                        height: 3rem;
                        border-radius: var(--border-radius);
                        aspect-ratio: 1 / 1;
                      `}
                      width="50"
                      height="50"
                      alt=""
                    />
                    <div
                      css={css`
                        display: flex;
                        flex-direction: column;
                        margin-left: 0.5rem;
                        font-size: 0.875rem;
                        line-height: 1.25rem;
                      `}
                    >
                      <span>{truncate(name, 15)}</span>
                      <span
                        css={css`
                          color: var(--onNeutralBgSecondary);
                        `}
                      >
                        {truncate(artistName, 15)}
                      </span>
                    </div>
                  </div>

                  <PlayerButtons audioIconList={audioIconList} />

                  <div
                    css={css`
                      position: relative;
                      width: 30%;
                      display: flex;
                      align-items: center;
                      justify-content: space-between;
                    `}
                  >
                    <div
                      css={css`
                        font-size: 0.875rem;
                        line-height: 1.25rem;
                        color: var(--onNeutralBgSecondary);
                      `}
                    >
                      {getTimer}
                    </div>
                    <div
                      css={css`
                        display: flex;
                        flex-direction: row;
                        gap: 0.5rem;
                      `}
                    >
                      <PlayerVolume
                        {...{
                          muted,
                          volume,
                          handleVolumeMute,
                          handleSetVolume,
                        }}
                      />

                      <QueueButton {...{ openQueue, setOpenQueue }} />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
