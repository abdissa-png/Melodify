import { useMemo } from "react";

import { getRandomList, getFormatData } from "@/lib/utils";

import {
  PatternBg,
  ShowMoreButton,
  Title,
  Skeletons,
  Cards,
} from "@/components";

import { css } from "@emotion/react";
const grid = {
  1: "grid-template-columns: repeat(1, minmax(0, 1fr));",
  2: "grid-template-columns: repeat(1, minmax(0, 1fr)); @media (min-width: 640px) { grid-template-columns: repeat(2, minmax(0, 1fr));  }",
  3: "grid-template-columns: repeat(1, minmax(0, 1fr)); @media (min-width: 640px) { grid-template-columns: repeat(2, minmax(0, 1fr));  } @media (min-width: 1024px) { grid-template-columns: repeat(3, minmax(0, 1fr));  }",
  4: "grid-template-columns: repeat(1, minmax(0, 1fr)); @media (min-width: 640px) { grid-template-columns: repeat(2, minmax(0, 1fr));  } @media (min-width: 1024px) { grid-template-columns: repeat(4, minmax(0, 1fr));  }",
  5: "grid-template-columns: repeat(1, minmax(0, 1fr)); @media (min-width: 640px) { grid-template-columns: repeat(3, minmax(0, 1fr));  } @media (min-width: 1024px) { grid-template-columns: repeat(5, minmax(0, 1fr));  }",
};

export default function MediaSectionMinified({
  data,
  title,
  subTitle,
  titleType = "extra-large",
  titleDivider = true,
  type,
  gridNumber = 5,
  cardItemNumber,
  skeletonItemNumber = gridNumber * 2,
  bgColor,
  randomListNumber,
  showMoreLink,
  imageDims,
  isMyPlaylist,
  CreatePlaylistComp,
  noDataText,
  showPattern,
  isLoading,
  isSuccess,
}) {
  const getCardItemNumber = cardItemNumber || data?.length;

  const listFormatted = useMemo(() => {
    if (randomListNumber) {
      return getFormatData(
        getRandomList(data, randomListNumber, 1, data?.length)
      );
    }
    return getFormatData(data?.slice(0, getCardItemNumber));
  }, [getCardItemNumber, data, randomListNumber]);

  return (
    <>
      {isLoading && (
        <div>
          <Skeletons.TitleSkeleton />
          <ul
            css={css`
              display: grid;
              gap: 1rem;
              ${grid?.[gridNumber]}
            `}
          >
            <Skeletons.TrackCardSkeleton
              number={skeletonItemNumber}
              type={type}
              imageDims={imageDims}
            />
          </ul>
        </div>
      )}
      {isSuccess && (
        <>
          {data?.length && listFormatted?.length ? (
            <section>
              <div>
                <div
                  css={css`
                    position: relative;
                    ${bgColor
                      ? `
                      padding: 1.5rem;
                      border-radius: var(--border-radius);
                      background-color: var(--cardBg);
                      overflow: hidden;
                      `
                      : `
                      `}
                  `}
                >
                  {showPattern && <PatternBg />}

                  <Title
                    name={title}
                    type={titleType}
                    desc={subTitle}
                    divider={titleDivider}
                  />
                  <ul
                    css={css`
                      display: grid;
                      ${grid?.[gridNumber]}
                      ${isMyPlaylist ? `gap: 1.5rem;` : `gap: 0.5rem;`}
                    `}
                  >
                    {listFormatted?.length &&
                      listFormatted?.map((item) => (
                        <Cards.MediaCardMinified
                          key={item.id}
                          item={item}
                          type={item?.type || type}
                          imageDims={imageDims}
                          isMyPlaylist={isMyPlaylist}
                        />
                      ))}
                    {CreatePlaylistComp && <CreatePlaylistComp />}
                  </ul>
                  {showMoreLink && <ShowMoreButton onClick={showMoreLink} />}
                </div>
              </div>
            </section>
          ) : (
            <div>
              <Title
                name={title}
                type={titleType}
                desc={subTitle}
                divider={titleDivider}
              />
              {noDataText && (
                <div
                  css={css`
                    padding: 1rem;
                    margin-bottom: 1rem;
                    border-radius: 0.25rem;
                    width: fit-content;
                    --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
                      0 4px 6px -4px rgb(0 0 0 / 0.1);
                    --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color),
                      0 4px 6px -4px var(--tw-shadow-color);
                    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
                      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
                    background-color: var(--cardBg);
                    width: fit-content;
                  `}
                >
                  <Title name={noDataText} type="small" divider={false} />
                </div>
              )}
              {CreatePlaylistComp && (
                <ul
                  css={css`
                    display: grid;
                    ${grid?.[gridNumber]}
                    ${isMyPlaylist ? `gap: 1.5rem;` : `gap: 0.5rem;`}
                  `}
                >
                  {<CreatePlaylistComp />}
                </ul>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}
