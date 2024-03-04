import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import {
  formatDateString,
  formatNumberWithCommas,
  formatTime,
  pluralize,
} from "@/lib/utils";

export const Genres = ({ genres }) => {
  return (
    <>
      {genres?.length ? (
        <div
          css={css`
            display: flex;
            align-items: center;
            gap: 0.5rem;
          `}
        >
          {genres && <>&nbsp;|</>}
          {genres?.map((genre) => (
            <Link
              key={genre.id}
              to={`/genre/${genre.id}`}
              css={css`
                padding: 0.5rem;
                font-size: 0.875rem;
                line-height: 1.25rem;
                border-radius: 9999px;
                background-color: var(--neutralBg);
              `}
            >
              {genre.name}
            </Link>
          ))}
        </div>
      ) : null}
    </>
  );
};

export const Contributors = ({ contributors }) => {
  return (
    <>
      {contributors?.length ? (
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          {contributors?.map((contributor, index) => (
            <>
              <Link
                key={contributor.id}
                to={`/artist/${contributor.id}`}
                css={css`
                  font-size: 1rem;
                  line-height: 1.5rem;
                  color: var(--onNeutralBg);
                  &:hover {
                    text-decoration-line: underline;
                    text-underline-offset: 4px;
                  }
                `}
              >
                {contributor.name}
              </Link>
              {contributors.length - 1 !== index && <>,&nbsp;</>}
            </>
          ))}
        </div>
      ) : null}
    </>
  );
};

export const MetaDetails = ({
  user,
  tracksNo,
  albumsNo,
  fansNo,
  duration,
  releaseDate,
}) => {
  return (
    <div
      css={css`
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin-bottom: 1rem;
        margin-top: -0.5rem;
        font-size: 0.875rem;
        line-height: 1.25rem;
        letter-spacing: 0.05em;
        color: var(--onNeutralBgSecondary);
      `}
    >
      {user && <span>{user} &nbsp;.&nbsp;&nbsp;</span>}

      {fansNo && (
        <span>
          {formatNumberWithCommas(fansNo)} {pluralize("fan", fansNo)}
          &nbsp;|&nbsp;
        </span>
      )}
      {tracksNo ? (
        <span>
          {tracksNo} {pluralize("track", tracksNo)}&nbsp;|&nbsp;
        </span>
      ) : null}
      {albumsNo ? (
        <span>
          {albumsNo} {pluralize("album", albumsNo)}
        </span>
      ) : null}
      {duration && <span>{formatTime(duration)}&nbsp;|&nbsp;</span>}
      {releaseDate && <span>{formatDateString(releaseDate)}</span>}
    </div>
  );
};

export const MetaDetailsMediaCard = ({
  tracksNo,
  fansNo,
  albumsNo,
  releaseDate,
  type,
}) => {
  return (
    <>
      {(tracksNo || releaseDate || fansNo || albumsNo) && (
        <>
          {["artist"].includes(type) ? (
            <p
              css={css`
                margin-top: 0.25rem;
                font-size: 0.75rem;
                line-height: 1rem;
                font-weight: 400;
                color: var(--onNeutralBgSecondary);
              `}
            >
              {fansNo && <span>{formatNumberWithCommas(fansNo)} fans</span>}
              {albumsNo && <span>&nbsp;&nbsp;{albumsNo} albums</span>}
            </p>
          ) : (
            <p
              css={css`
                margin-top: 0.25rem;
                font-size: 0.75rem;
                line-height: 1rem;
                font-weight: 400;
                color: var(--onNeutralBgSecondary);
              `}
            >
              {tracksNo && <span>{tracksNo} tracks &nbsp;&nbsp;</span>}
              {releaseDate && <span>{formatDateString(releaseDate)}</span>}
            </p>
          )}
        </>
      )}
    </>
  );
};
