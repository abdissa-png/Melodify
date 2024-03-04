import { useEffect, useState } from "react";

import { getToggleGenres } from "@/lib/store/slices";
import { useSelector, useDispatch } from "react-redux";
import { useFetchGenres } from "@/lib/actions";
import { Overlay } from "@/components";
import { css } from "@emotion/react";
import Genre from "./Genre";

export default function Page() {
  const [getGenre, setGenre] = useState();
  const dispatch = useDispatch();
  const { toggleGenres } = useSelector((state) => state.appUtil);

  const { data: genres } = useFetchGenres();

  useEffect(() => {
    if (genres) setGenre(genres?.[0]?.id);
  }, [genres]);

  return (
    <div>
      <div
        css={css`
          position: relative;
          gap: 1.5rem;
        `}
      >
        <Overlay
          isOpen={toggleGenres}
          handleIsOpen={(value) => {
            dispatch(getToggleGenres(value));
          }}
          transparent
          style="z-index: 800;"
        />
        {getGenre && (
          <div
            css={css`
              margin-bottom: 1.5rem;
            `}
          >
            <button
              css={css`
                gap: 0.5rem;
                padding: 0.75rem;
                font-size: 0.875rem;
                line-height: 1.25rem;
                font-weight: 600;
                border-width: 1px;
                border-radius: var(--border-radius);
                border-color: var(--primary);
                color: var(--primary);
                display: flex;
                align-items: center;
                justify-content: space-between;
              `}
              onClick={() => dispatch(getToggleGenres(true))}
            >
              Select Genre
            </button>
          </div>
        )}
        <div
          css={css`
            position: fixed;
            height: 100vh;
            z-index: 900;
            padding-top: var(--main-margin-top);
            top: 0px;
            width: 200px;
            transition-property: all;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transition-duration: 500ms;
            ${toggleGenres
              ? `
              left: var(--sidebar-horizontal-width);
              `
              : `
              left: -500px;
              `}
          `}
        >
          <ul
            css={css`
              list-style-type: none;
              color: var(--onNeutralBg);
              font-size: 0.875rem;
              line-height: 1.25rem;
              background-color: var(--neutralBg);
              overflow: auto;
              width: 100%;
              transition-property: all;
              transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
              transition-duration: 150ms;
              --tw-shadow: rgba(0, 0, 0, 0.2) 0 8px 10px -5px,
                rgba(0, 0, 0, 0.14) 0 16px 24px 2px,
                rgba(0, 0, 0, 0.12) 0 6px 30px 5px;
              --tw-shadow-colored: 0 8px 10px -5px var(--tw-shadow-color),
                0 16px 24px 2px var(--tw-shadow-color),
                0 6px 30px 5px var(--tw-shadow-color);
              box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
                var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
              height: 100%;
            `}
            className="hide_scrollbar"
          >
            {genres &&
              genres?.map((genre) => (
                <li
                  key={genre.id}
                  css={css`
                    border-bottom-width: 1px;
                    border-color: var(--neutralBg);
                    color: var(--primary);
                    ${getGenre == genre?.id ? `color: var(--primary);` : ``}
                  `}
                >
                  <button
                    css={css`
                      width: 100%;
                      height: 100%;
                      padding: 1rem;
                      font-weight: 600;
                      text-align: left;
                    `}
                    onClick={() => {
                      setGenre(genre?.id);
                      dispatch(getToggleGenres(false));
                    }}
                  >
                    {genre?.name}
                  </button>
                </li>
              ))}
          </ul>
        </div>
        {getGenre && <Genre id={getGenre} />}
      </div>
    </div>
  );
}
