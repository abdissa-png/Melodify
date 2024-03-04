import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { truncate } from "lodash";
import { css } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { addTrackToMyPlaylistRequest } from "@/lib/store/slices";
import { useFetchSearch } from "@/lib/actions";
import { formatIndexToDouble, formatDuration } from "@/lib/utils";
import { useDebounce } from "@/hooks";

import { Icon, Title } from "@/components";

const ModalContent = ({
  item,
  playlistId,
  index,
  isSubmittingAddToPlaylist,
  setGetId,
  addToMyPlaylist,
  getId,
  close,
}) => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((store) => store.currentUser);
  const { userId } = currentUser;
  return (
    <li
      key={item.id}
      css={css`
        position: relative;
        padding: 0.75rem;
        display: flex;
        align-items: center;
        font-size: 1rem;
        line-height: 1.5rem;
        color: var(--onNeutralBg) !important;
        &:hover {
          background-color: var(--onNeutralBgDivider);
          border-radius: var(--border-radius);
        }
        border-color: var(--onNeutralBgDivider);
        cursor: pointer;
        &:focus-within {
          background-color: var(--onNeutralBgDivider);
          border-radius: var(--border-radius);
        }
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        ${index !== 0 ? `border-top-width: 1px;` : ``}
      `}
    >
      <div
        css={css`
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          gap: 1rem;
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 0.5rem;
          `}
        >
          <span
            css={css`
              display: block;
              font-size: 0.875rem;
              line-height: 1.25rem;
              font-weight: 700;
            `}
          >
            {formatIndexToDouble(index + 1)}
          </span>
          <div
            css={css`
              border-radius: var(--border-radius);
              height: 3.5rem;
              width: 3.5rem;
              background-color: var(--neutralBgAlt);
            `}
          >
            <img
              src={item?.album?.cover_medium}
              alt={item?.album?.name}
              width={70}
              height={70}
              css={css`
                height: 100%;
                width: 100%;
                border-radius: var(--border-radius);
                aspect-ratio: 1 / 1;
              `}
            />
          </div>
          <div
            css={css`
              display: flex;
              flex-direction: column;
              flex: 1 1 0%;
              gap: 0.5rem;
              color: var(--onNeutralBg);
            `}
          >
            <div
              css={css`
                display: flex;
                flex-direction: column;
              `}
            >
              <span
                css={css`
                  font-size: 15px;
                `}
              >
                {truncate(item.title, 15)}
              </span>
              <button
                onClick={() => {
                  close();
                  navigate(`/artist/${item?.artist?.id}`);
                }}
                css={css`
                  text-align: left;
                  color: var(--onNeutralBgSecondary);
                  &:hover {
                    text-decoration-line: underline;
                  }
                  text-underline-offset: 4px;
                  cursor: pointer;
                  font-size: 14px;
                `}
              >
                {item?.artist?.name}
              </button>
            </div>
            <button
              onClick={() => {
                close();
                navigate(`/album/${item?.album?.id}`);
              }}
              css={css`
                font-size: 15px;
                text-align: left;
                cursor: pointer;
                text-decoration-line: underline;
                text-underline-offset: 4px;
              `}
            >
              {truncate(item?.album?.title, 15)}
            </button>
          </div>
        </div>
        <div
          css={css`
            top: 0px;
            right: 0px;
            margin-left: 2rem;
          `}
        >
          <div
            css={css`
              display: flex;
              align-items: flex-end;
              justify-content: flex-end;
              font-size: 0.875rem;
              line-height: 1.25rem;
              text-align: right;
            `}
          >
            {formatDuration(item.duration)}
          </div>
          <button
            css={css`
              padding: 0.5rem;
              font-size: 0.875rem;
              line-height: 1.25rem;
              font-weight: 600;
              border-width: 1px;
              border-radius: 0.75rem;
            `}
            disabled={isSubmittingAddToPlaylist}
            onClick={() => {
              setGetId(item?.id);

              addToMyPlaylist({
                userId,
                trackD: {
                  [item?.id]: {
                    id: item?.id,
                    type: "track",
                  },
                },
                id: playlistId,
                imageUrl: item?.album?.cover_medium,
              });
            }}
          >
            {isSubmittingAddToPlaylist && getId == item?.id
              ? "Adding ..."
              : "Add"}
          </button>
        </div>
      </div>
    </li>
  );
};

const SearchModal = ({ playlistId, title, close }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.myPlaylist);
  const isSubmittingAddToPlaylist = isLoading.addTrack;
  const addToMyPlaylist = (value) => {
    dispatch(addTrackToMyPlaylistRequest(value));
  };
  const [searchTerm, setSearchTerm] = useState("");
  const [getId, setGetId] = useState(null);

  const searchValue = useDebounce(searchTerm, 2000);

  const {
    isPending: searchDataPending,
    isSuccess: searchDataSuccess,
    data: searchResult,
  } = useFetchSearch({ searchText: searchValue });

  return (
    <div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: fit-content;
        `}
      >
        <Title
          name={title}
          desc={"Let's find a new addition for your playlist!"}
          type="medium"
          divider={false}
        />
        <div
          css={css`
            position: relative;
            width: 100%;
            padding: 0.5rem;
            border-radius: var(--border-radius);
            --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
            --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
            box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
              var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
            background-color: var(--neutralBgAlt);
            height: 3.5rem;
          `}
        >
          <div
            css={css`
              display: flex;
              align-items: center;
              width: 100%;
              height: 100%;
              gap: 0.5rem;
              padding-left: 0.5rem;
              padding-right: 0.5rem;
              border-width: 0px;
              border-radius: var(--border-radius);
              border-color: var(--onNeutralBgDivider);
            `}
          >
            <Icon name="BiSearch" />
            <input
              css={css`
                width: 100%;
                height: 100%;
                font-size: 0.875rem;
                line-height: 1.25rem;
                background-color: transparent;
                outline: 2px solid transparent;
                outline-offset: 2px;
                &:placeholder {
                  color: var(--onNeutralBgSecondary);
                }
                color: var(--onNeutralBg);
              `}
              placeholder="Search for songs or tracks ..."
              value={searchTerm || ""}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      {searchDataPending && (
        <div
          css={css`
            padding: 1rem;
            margin-top: 1rem;
            border-radius: var(--border-radius);
            --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
              0 4px 6px -4px rgb(0 0 0 / 0.1);
            --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color),
              0 4px 6px -4px var(--tw-shadow-color);
            box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
              var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
            background-color: var(--neutralBgAlt);
            width: fit-content;
          `}
        >
          <Title name="Loading Search ..." divider={false} />
        </div>
      )}
      {searchDataSuccess && searchResult && (
        <div
          css={css`
            width: 100%;
            margin-top: 1.5rem;
            font-size: 0.875rem;
            line-height: 1.25rem;
            border-collapse: separate;
            color: var(--onNeutralBg);
            --tw-border-spacing-y: 1rem;
            border-spacing: 0px var(--tw-border-spacing-y);
          `}
        >
          <div>
            {searchResult?.tracks?.data ? (
              searchResult?.tracks?.data.map((item, index) => (
                <ModalContent
                  key={index}
                  {...{
                    item,
                    playlistId,
                    index,
                    isSubmittingAddToPlaylist,
                    setGetId,
                    addToMyPlaylist,
                    getId,
                    close,
                  }}
                />
              ))
            ) : (
              <div
                css={css`
                  padding: 1rem;
                  margin-top: 1rem;
                  border-radius: var(--border-radius);
                  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
                    0 4px 6px -4px rgb(0 0 0 / 0.1);
                  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color),
                    0 4px 6px -4px var(--tw-shadow-color);
                  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
                    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
                  background-color: var(--neutralBgAlt);
                  width: fit-content;
                `}
              >
                <Title name="No result found!" divider={false} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchModal;
