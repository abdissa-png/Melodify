import { useEffect, useMemo, useState } from "react";

import {
  editMyPlaylistRequest,
  removeMyPlaylistRequest,
} from "@/lib/store/slices";
import { useSelector, useDispatch } from "react-redux";
import { getFormatData } from "@/lib/utils";
import { editMyPlaylistValidation } from "@/lib/validations";
import { usePlayer } from "@/hooks";
import { css } from "@emotion/react";
import {
  Icon,
  Dialog,
  Form,
  DropdownMenu,
  PatternBg,
  Title,
  IconButton,
  Genres,
  Contributors,
  MetaDetails,
  Skeletons,
} from "@/components";
import { useNavigate } from "react-router-dom";

const EditMyPlaylist = ({ details, editMyPlaylist, isSubmitting }) => {
  const [files, setFiles] = useState(null);

  const handleSubmit = async (values) => {
    editMyPlaylist({
      ...values,
      files,
      id: details.id,
      imagePath: details.imagePath,
    });
  };

  const list = useMemo(() => {
    return [
      {
        type: "image_dropzone",
        name: "image",
        label: "Cover Image",
        containerDims: "height: 10rem;  width: 10rem; ",
        props: {
          type: "file",
          placeholder: "",
        },
      },
      {
        type: "input",
        name: "title",
        label: "Title",
        props: {
          type: "text",
          placeholder: "",
        },
      },

      {
        type: "textarea",
        name: "desc",
        label: "Description",

        props: { type: "textarea", placeholder: "" },
      },
    ];
  }, []);

  return (
    <div>
      <Title name="Edit Details" type="medium" />
      <Form
        list={list}
        btnTxt="Save"
        isSubmitting={isSubmitting}
        schema={editMyPlaylistValidation}
        onSubmit={handleSubmit}
        files={files}
        setFiles={setFiles}
        defaultValues={{
          title: details?.name,
          desc: details?.desc,
          image: details?.image,
        }}
      />
    </div>
  );
};

const RemovePlaylistDropdown = ({ myPlaylistId }) => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.myPlaylist);
  const { currentUser } = useSelector((store) => store.currentUser);
  const { userId } = currentUser;
  const navigate = useNavigate();
  const deleteMyPlaylist = (value) => {
    dispatch(removeMyPlaylistRequest(value));
  };
  return (
    <DropdownMenu
      DropdownTrigger={() => (
        <div
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 9999px;
            width: 2.5rem;
            height: 2.5rem;
            transition-duration: 300ms;
            transition-timing-function: linear;
            --tw-scale-x: 1;
            --tw-scale-y: 1;
            transform: translate(var(--tw-translate-x), var(--tw-translate-y))
              rotate(var(--tw-rotate)) skewX(var(--tw-skew-x))
              skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x))
              scaleY(var(--tw-scale-y));
            border-radius: 9999px;
            &:hover {
              background-color: var(--neutralBgAlt);
              --tw-scale-x: 1.05;
              --tw-scale-y: 1.05;
              transform: translate(var(--tw-translate-x), var(--tw-translate-y))
                rotate(var(--tw-rotate)) skewX(var(--tw-skew-x))
                skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x))
                scaleY(var(--tw-scale-y));
            }
          `}
        >
          <Icon
            name="HiOutlineDotsHorizontal"
            css={css`
              color: var(--onNeutralBg);
            `}
          />
        </div>
      )}
      DropdownContent={() => (
        <div>
          {[
            {
              label: isLoading.remove
                ? "Removing playlist ..."
                : "Remove playlist",
              onClick: () => {
                deleteMyPlaylist({ userId, id: myPlaylistId, navigate });
              },
            },
          ].map((item) => (
            <button
              key={item.label}
              css={css`
                display: flex;
                padding: 1rem;
                width: 100%;
                text-align: left;

                &:hover {
                  background-color: var(--cardBgHover);
                }
                &:disabled {
                  opacity: 0.5;
                  background-color: var(--cardBgHover);
                }
              `}
              onClick={() => item.onClick()}
              disabled={isLoading.remove}
            >
              <span
                css={css`
                  white-space: nowrap;
                `}
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>
      )}
    />
  );
};

export default function MyPlaylistBannerSection(props) {
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.currentUser);
  const { userId } = currentUser || {};
  const {
    details,
    hideActionButtons,
    tracks,
    type: typeAlt,
    showPattern,
  } = props;

  const { isLoading, error } = useSelector((state) => state.myPlaylist);
  const editMyPlaylist = (value) => {
    dispatch(editMyPlaylistRequest({ userId, ...value }));
  };
  const { playlistId, playlistType } = useSelector((state) => state.player);

  const {
    image,
    name,
    type,
    desc,
    genres,
    contributors,
    tracksNo,
    fansNo,
    user,
    duration,
    releaseDate,
  } = details || {};

  const { handlePlayPause, handleGetPlaylist, isPlaying } = usePlayer();

  const isCurrentPlaylist = useMemo(
    () => playlistId === details?.id && playlistType === details?.type,
    [details, playlistId, playlistType]
  );

  const trackFormatted = useMemo(() => getFormatData(tracks), [tracks]);

  const handleGetPlaylistFunc = () => {
    handleGetPlaylist({
      tracklist: trackFormatted,
      playlistId: details?.id,
      playlistType: details?.type,
    });
  };

  useEffect(() => {
    if (isLoading.edit) {
      setOpenDialog(false);
    }
  }, [isLoading.edit]);

  return (
    <div
      css={css`
        position: relative;
      `}
    >
      {!details && (
        <div>
          <Skeletons.HeaderBannerSectionSkeleton type={typeAlt} />
        </div>
      )}
      {details && (
        <div
          css={css`
            display: flex;
            position: relative;
            z-index: 10;
            padding: 1rem;
            flex-direction: column;
            gap: 1.5rem;
            align-items: center;
            border-radius: var(--border-radius);
            @media (min-width: 450px) {
              flex-direction: row;
            }
            background-color: var(--primary-opacity);
            min-height: 250px;
          `}
        >
          <div
            css={css`
              overflow: hidden;
              position: absolute;
              top: 0;
              right: 0;
              left: 0;
              border-radius: var(--border-radius);
              width: 100%;
              height: 100%;
              background-color: transparent;
            `}
          >
            {showPattern && <PatternBg />}
          </div>

          {details?.type && (
            <>
              <button
                css={css`
                  aspect-ratio: 1 / 1;
                  z-index: 50;
                  background-color: var(--neutralBg);
                  border-radius: var(--border-radius);
                  height: 180px;
                  width: 180px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  --tw-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
                    0 8px 10px -6px rgb(0 0 0 / 0.1);
                  --tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color),
                    0 8px 10px -6px var(--tw-shadow-color);
                  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
                    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
                `}
                onClick={() => setOpenDialog(true)}
              >
                {image ? (
                  <img
                    src={image}
                    width={200}
                    height={200}
                    alt=""
                    css={css`
                      width: 100%;
                      height: 100%;
                      border-radius: var(--border-radius);
                    `}
                  />
                ) : (
                  <Icon
                    name="BsMusicNoteBeamed"
                    size={60}
                    css={css`
                      color: var(--onNeutralBgSecondary) !important;
                    `}
                  />
                )}
              </button>
              <div
                css={css`
                  display: flex;
                  z-index: 50;
                  flex-direction: column;
                  justify-content: space-between;
                  align-items: flex-start;
                  width: 100%;
                  color: var(--onNeutralBg);
                `}
              >
                <div
                  css={css`
                    gap: 0.5rem;
                  `}
                >
                  <div
                    css={css`
                      display: flex;
                      align-items: center;
                    `}
                  >
                    <div
                      css={css`
                        display: block;
                        text-transform: capitalize;
                      `}
                    >
                      {type}
                    </div>
                    <Genres genres={genres?.data} />
                  </div>
                  <button
                    onClick={() => setOpenDialog(true)}
                    css={css`
                      text-align: left;
                    `}
                  >
                    <Title
                      name={name}
                      type="extra-large"
                      divider={false}
                      desc={
                        desc || <Contributors contributors={contributors} />
                      }
                    />
                  </button>

                  <div
                    css={css`
                      display: flex;
                      gap: 0.75rem;
                      align-items: center;
                    `}
                  >
                    <MetaDetails
                      {...{ user, tracksNo, fansNo, duration, releaseDate }}
                    />
                  </div>
                </div>
                {!hideActionButtons && (
                  <div
                    css={css`
                      display: flex;
                      gap: 1rem;
                    `}
                  >
                    {tracks?.length ? (
                      <IconButton
                        name={
                          isCurrentPlaylist
                            ? !isPlaying
                              ? "BsFillPlayFill"
                              : "BsFillPauseFill"
                            : "BsFillPlayFill"
                        }
                        style="width: 2.5rem; 
                        height: 2.5rem; "
                        iconColor=" --tw-text-opacity: 1 !important;
                        color: rgb(255 255 255 / var(--tw-text-opacity)) !important;"
                        size={25}
                        onClick={() => {
                          if (isCurrentPlaylist) {
                            handlePlayPause();
                          } else {
                            handleGetPlaylistFunc();
                          }
                        }}
                      />
                    ) : null}
                    {typeAlt !== "search" && (
                      <RemovePlaylistDropdown myPlaylistId={details?.id} />
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
      <Dialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        Content={() => (
          <EditMyPlaylist
            details={details}
            editMyPlaylist={editMyPlaylist}
            isSubmitting={isLoading.edit}
          />
        )}
      />
    </div>
  );
}
