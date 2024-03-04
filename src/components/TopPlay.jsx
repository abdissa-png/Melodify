import { useId, useMemo } from "react";

import { getRandomList } from "@/lib/utils";
import { useFetchChartBySection } from "@/lib/actions";
import { css } from "@emotion/react";
import { Sections } from "@/components";

const TopPlay = () => {
  const {
    data: tracks,
    isPending: chartsDataPending,
    isSuccess: chartsDataSuccess,
  } = useFetchChartBySection({
    id: "0",
    section: "tracks",
  });

  const topPickId = useId();

  const randomTopPicks = useMemo(() => {
    const topTracks = tracks?.data || [];
    return topTracks?.length
      ? getRandomList(topTracks, 5, 1, topTracks?.length)
      : [];
  }, [tracks?.data]);

  return (
    <section
      css={css`
        width: var(--main-width);
        left: var(--sidebar-horizontal-width);
        transition: all;
        transition-duration: 500ms;
        @media (min-width: 1280px) {
          position: fixed;
          height: 100vh;
          width: var(--aside-width);
          left: auto;
          margin-bottom: 0px;
          padding: 0px;
          display: block;
        }
        @media (min-width: 640px) {
          padding: 1.5rem;
        }
        top: 0px;
        right: 0px;
        overflow: auto;
        min-width: var(--aside-width);
        position: relative;
        margin-bottom: 100px;
        height: auto;
        padding: 0.75rem;
      `}
    >
      <div
        css={css`
          width: 100%;
          height: 100%;
          background-color: var(--switchBg);
        `}
      >
        <div
          css={css`
            position: sticky;
            top: 0px;
            padding: 1rem;
            border-radius: var(--border-radius);
            background-color: var(--switchBg);
            @media (min-width: 1280px) {
              border-radius: 0px;
            }
          `}
        >
          <div className="top_picks_content">
            <Sections.TrackSection
              data={randomTopPicks}
              details={{
                id: topPickId,
                type: "chart",
              }}
              disableHeader
              disableRowList={[
                "no",
                "album",
                "duration",
                "more_button",
                "like_button",
                "dateCreated",
              ]}
              imageDims="11"
              enableTitle
              titleName="Top Picks"
              titleType="medium"
              titleDivider={false}
              isLoading={chartsDataPending}
              isSuccess={chartsDataSuccess}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopPlay;
