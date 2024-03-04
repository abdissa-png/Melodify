import { useMemo } from "react";

import { getRandomList, getFormatData } from "@/lib/utils";

import { css } from "@emotion/react";

import { Title, Cards, Skeletons } from "@/components";

const grid = {
  2: "grid-template-columns: repeat(2, minmax(0, 1fr)); ",
  3: "grid-template-columns: repeat(2, minmax(0, 1fr));  @media (min-width: 450px) { grid-template-columns: repeat(3, minmax(0, 1fr));  }",
  4: "grid-template-columns: repeat(2, minmax(0, 1fr));  @media (min-width: 450px) { grid-template-columns: repeat(3, minmax(0, 1fr));  } @media (min-width: 640px) { grid-template-columns: repeat(3, minmax(0, 1fr));  } @media (min-width: 768px) { grid-template-columns: repeat(4, minmax(0, 1fr));  }",
  5: "grid-template-columns: repeat(2, minmax(0, 1fr));  @media (min-width: 450px) { grid-template-columns: repeat(3, minmax(0, 1fr));  } @media (min-width: 640px) { grid-template-columns: repeat(3, minmax(0, 1fr));  } @media (min-width: 768px) { grid-template-columns: repeat(4, minmax(0, 1fr));  } @media (min-width: 1024px) { grid-template-columns: repeat(5, minmax(0, 1fr));  }",
};

export default function MediaSection({
  data,
  title,
  subTitle,
  titleType = "extra-large",
  titleDivider = true,
  enableTitle = true,
  showMoreLink,
  type,
  gridNumber = 5,
  cardItemNumber,
  skeletonItemNumber = gridNumber * 2,
  randomListNumber,
  isLoading,
  isSuccess,
}) {
  const getCardItemNumber = cardItemNumber || data?.length;

  const listFormatted = useMemo(() => {
    if (data) {
      if (randomListNumber) {
        return getFormatData(
          getRandomList(data, randomListNumber, 1, data?.length)
        );
      }
      return getFormatData(data?.slice(0, getCardItemNumber));
    }
  }, [getCardItemNumber, data, randomListNumber]);

  return (
    <>
      {isLoading && (
        <div>
          {enableTitle && <Skeletons.TitleSkeleton />}
          <div
            css={css`
              display: grid;
              gap: 1rem;
              ${grid?.[gridNumber]}
            `}
          >
            <Skeletons.MediaCardSkeleton
              number={skeletonItemNumber}
              type={type}
            />
          </div>
        </div>
      )}
      {isSuccess && data?.length ? (
        <section>
          <div>
            {enableTitle && (
              <Title
                name={title || ""}
                type={titleType}
                desc={subTitle}
                divider={titleDivider}
                showMoreLink={showMoreLink}
              />
            )}
            <div
              css={css`
                display: grid;
                gap: 1rem;
                ${grid?.[gridNumber]}
              `}
            >
              {listFormatted?.length &&
                listFormatted?.map((item) => (
                  <Cards.MediaCard key={item.id} item={item} type={type} />
                ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
