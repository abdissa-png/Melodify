import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { startCase } from "lodash";

import { classNames } from "@/lib/utils";
import { css } from "@emotion/react";
import { Icon } from "@/components";

export const AppTooltip = ({
  children,
  id,
  tooltipType = "hover",
  TooltipComp,
  arrowPos = "left-center",
  arrowClassName = "text-primary",
  disabled,
  hideTooltipFunc,
}) => {
  const [tooltipState, setTooltipState] = useState({
    isVisible: false,
    position: { top: 0, left: 0, right: 0 },
  });

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        tooltipState?.isVisible &&
        event.target.closest(`.dropdown_${id}`) === null
      ) {
        setTooltipState({
          isVisible: false,
          position: { top: 0, left: 0 },
        });
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [id, tooltipState]);

  const toggleTooltip = (event) => {
    if (tooltipState.isVisible) {
      setTooltipState({ isVisible: false, position: { top: 0, left: 0 } });
    } else {
      const { top, right } = event.target.getBoundingClientRect();

      setTooltipState({
        isVisible: true,
        position: { top: top, left: right },
      });
    }
  };

  const hideTooltip = () => {
    if (tooltipState.isVisible) {
      setTooltipState({ isVisible: false, position: { top: 0, left: 0 } });
      if (hideTooltipFunc) hideTooltipFunc();
    }
  };

  const arrowClass = {
    "left-top": "left-[-13px] top-[2%] rotate-[90deg]",
    "left-center": "left-[-13px] top-[50%] translate-y-[-50%] rotate-[90deg]",
    "left-bottom": "left-[-13px] bottom-[2%] rotate-[90deg]",
    "bottom-left": "bottom-[-13px] left-[2%] rotate-[0deg]",
    "bottom-center":
      "bottom-[-13px] left-[50%] translate-x-[-50%] rotate-[0deg]",
    "bottom-right": "bottom-[-13px] right-[2%] rotate-[0deg]",
  };

  return (
    <>
      {React.cloneElement(
        <div
          css={css`
            width: 100%;
            height: 100%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
          `}
        >
          {children}
        </div>,
        {
          ...(tooltipType === "click"
            ? {
                onClick: toggleTooltip,
              }
            : { onMouseEnter: toggleTooltip, onMouseLeave: hideTooltip }),
        }
      )}
      {tooltipState.isVisible &&
        !disabled &&
        ReactDOM.createPortal(
          <>
            {tooltipType === "click" && (
              <div
                css={css`
                  position: fixed;
                  top: 0px;
                  left: 0px;
                  right: 0px;
                  width: 100vw;
                  height: 100vh;
                  cursor: pointer;
                  background-color: rgba(0, 0, 0, 0.5);
                `}
                onClick={hideTooltip}
              />
            )}
            <div
              className="tooltip"
              css={css`
                position: absolute;
                z-index: 2000;
                --tw-shadow: rgba(0, 0, 0, 0.2) 0 8px 10px -5px,
                  rgba(0, 0, 0, 0.14) 0 16px 24px 2px,
                  rgba(0, 0, 0, 0.12) 0 6px 30px 5px;
                --tw-shadow-colored: 0 8px 10px -5px var(--tw-shadow-color),
                  0 16px 24px 2px var(--tw-shadow-color),
                  0 6px 30px 5px var(--tw-shadow-color);
                box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
                  var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
              `}
              style={{
                top: tooltipState.position.top,
                left: tooltipState.position.left,
                right: tooltipState.position.right,
              }}
            >
              <Icon
                name="TiArrowSortedDown"
                css={css`
                  position: absolute;
                `}
                className={classNames(arrowClass[arrowPos], arrowClassName)}
              />
              {TooltipComp ? (
                <TooltipComp hideTooltip={hideTooltip} />
              ) : (
                <div
                  css={css`
                    padding: 0.5rem;
                    font-size: 0.875rem;
                    line-height: 1.25rem;
                    text-transform: capitalize;
                    border-radius: var(--border-radius);
                    background-color: var(--primary);
                  `}
                >
                  {startCase(id)}
                </div>
              )}
            </div>
          </>,
          document.body
        )}
    </>
  );
};

export default AppTooltip;
