import { css } from "@emotion/react";
import { Icon } from "@/components";

export default function ImageUploader({
  blobUrl,
  imageRef,
  containerDims = "height: 8rem; width: 100%;",
  borderType = "border-radius: var(--border-radius);",
}) {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        position: relative;
        padding: 0.5rem;
        ${containerDims}
        ${borderType}
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          width: 100%;
          border-width: 2px;
          border-style: dashed;
          -tw-border-opacity: 1;
          border-color: rgb(75 85 99 / var(--tw-border-opacity));
          cursor: pointer;
          ${borderType}
        `}
        onClick={() => imageRef?.current?.click()}
      >
        {blobUrl ? (
          <img
            src={blobUrl}
            alt="image"
            width={96}
            height={96}
            css={css`
              height: 100%;
              width: 100%;
              object-fit: contain;
              padding: 0.75rem;
              ${borderType}
            `}
          />
        ) : (
          <div
            css={css`
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 0.5rem;
              color: var(--onNeutralBgSecondary) !important;
            `}
          >
            <Icon name="AiOutlineCloudUpload" size={25} />
            <div
              css={css`
                font-size: 0.875rem;
                line-height: 1.25rem;
                font-weight: 600;
                text-align: center;
                color: var(--onNeutralBgSecondary);
              `}
            >
              Browse file to upload
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
