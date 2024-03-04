import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { css } from "@emotion/react";
import { fileBlob } from "@/lib/utils";
import { ImageUploader, IconButton, Button } from "@/components";

const FormMessage = ({ errorMessage }) => {
  const message = errorMessage?.message || String(errorMessage || "");

  return (
    <>
      {message && (
        <p
          css={css`
            margin-top: 0.25rem;
            font-size: 0.875rem;
            line-height: 1.25rem;
            --tw-text-opacity: 1;
            color: rgb(239 68 68 / var(--tw-text-opacity));
          `}
        >
          {message}
        </p>
      )}
    </>
  );
};

function AppForm({
  list,
  btnTxt,
  files,
  setFiles,
  isSubmitting,
  isSubmitted,
  schema,
  onSubmit,
  defaultValues,
}) {
  const [showPass, setShowPass] = useState(null);
  const imageRef = useRef(null);

  const blob = useMemo(() => {
    return fileBlob(files);
  }, [files]);

  const handleImage = (e) => {
    e.preventDefault();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;
    }
  };

  const {
    register: form,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues && !isSubmitting) {
      Object.entries(defaultValues).forEach(([name, value]) => {
        setValue(name, value);
      });
    }
  }, [setValue, defaultValues, isSubmitting]);

  useEffect(() => {
    if (isSubmitted) {
      reset(defaultValues);
    }
  }, [defaultValues, isSubmitted, reset]);

  return (
    <form
      css={css`
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
      `}
      onSubmit={handleSubmit(onSubmit)}
    >
      {list.map((formItem) => {
        return (
          <Fragment key={formItem.name}>
            {["input", "textarea"].includes(formItem.type) && (
              <fieldset>
                <div
                  css={css`
                    display: flex;
                    align-items: baseline;
                    justify-content: space-between;
                  `}
                >
                  <label
                    css={css`
                      margin-bottom: 0.5rem;
                      font-size: 0.75rem;
                      line-height: 1rem;
                      font-weight: 600;
                      color: var(--onNeutralBgSecondary);
                    `}
                    htmlFor={formItem?.name}
                  >
                    {formItem?.label}
                  </label>
                </div>
                <div
                  css={css`
                    position: relative;
                    padding-left: 0.5rem;
                    padding-right: 0.5rem;
                    padding-top: 0.25rem;
                    padding-bottom: 0.25rem;
                    border-width: 1px;
                    border-radius: var(--border-radius);
                    border-color: var(--onNeutralBgDivider);
                    &:focus-within {
                      border-color: var(--primary);
                    }
                  `}
                >
                  {formItem.type === "input" && (
                    <div
                      css={css`
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                      `}
                    >
                      <input
                        {...form(formItem.name)}
                        css={css`
                          width: 100%;
                          height: 2.5rem;
                          font-size: 0.875rem;
                          line-height: 1.25rem;
                          background-color: transparent;
                          color: var(--onNeutralBg);
                          border-color: var(--onNeutralBgDivider);
                          outline-width: 0px;
                          &:disabled {
                            color: var(--onNeutralBgSecondary);
                          }
                        `}
                        {...formItem.props}
                        placeholder={
                          formItem.props.placeholder || formItem.label
                        }
                        disabled={formItem.props.disabled || isSubmitting}
                        type={
                          formItem.props.type === "password"
                            ? showPass?.[formItem.name]
                              ? "text"
                              : "password"
                            : formItem.props.type
                        }
                      />
                      {formItem.props.type === "password" && (
                        <span
                          css={css`
                            position: absolute;
                            right: 0.5rem;
                            top: 50%;
                            --tw-translate-y: -50%;
                            transform: translate(
                                var(--tw-translate-x),
                                var(--tw-translate-y)
                              )
                              rotate(var(--tw-rotate)) skewX(var(--tw-skew-x))
                              skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x))
                              scaleY(var(--tw-scale-y));
                          `}
                        >
                          <IconButton
                            name={
                              !showPass?.[formItem.name]
                                ? "AiFillEyeInvisible"
                                : "AiFillEye"
                            }
                            iconColor="color: var(--onNeutralBg);"
                            onClick={() =>
                              setShowPass((prevS) => ({
                                ...prevS,
                                [formItem.name]: !prevS?.[formItem.name],
                              }))
                            }
                          />
                        </span>
                      )}
                    </div>
                  )}
                  {formItem.type === "textarea" && (
                    <textarea
                      {...form(formItem.name)}
                      placeholder={formItem.name}
                      rows={5}
                      css={css`
                        width: 100%;
                        font-size: 0.875rem;
                        line-height: 1.25rem;
                        background-color: transparent;
                        color: var(--onNeutralBg);
                        outline-width: 0px;
                      `}
                      {...formItem.props}
                    />
                  )}
                </div>
                <FormMessage errorMessage={errors?.[formItem.name]?.message} />
              </fieldset>
            )}

            {formItem.type === "image_dropzone" && (
              <fieldset
                css={css`
                  display: flex;
                  flex-direction: column;
                `}
              >
                {formItem?.label && (
                  <label
                    css={css`
                      margin-bottom: 0.5rem;
                      font-size: 0.875rem;
                      line-height: 1.25rem;
                      font-weight: 600;
                      color: var(--onNeutralBgSecondary);
                    `}
                    htmlFor={formItem?.name}
                  >
                    {formItem?.label || "Upload Image"}
                  </label>
                )}

                <input
                  type="file"
                  accept="image/*"
                  css={css`
                    display: none;
                  `}
                  onChange={(e) => handleImage(e)}
                  ref={imageRef}
                />

                <ImageUploader
                  blobUrl={blob.blobUrl || defaultValues?.image}
                  onImageDelete={() => {}}
                  imageRef={imageRef}
                  containerDims={formItem.containerDims}
                  borderType={formItem.borderType}
                />
                <FormMessage />
              </fieldset>
            )}
          </Fragment>
        );
      })}
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: flex-start;
          width: 100%;
        `}
      >
        <Button
          type="submit"
          label={btnTxt}
          variant="contained"
          isSubmitting={isSubmitting}
          disabled={!isValid || isSubmitting}
          css={css`
            width: fit-content;
          `}
          onClick={() => handleSubmit(onSubmit)}
        />
      </div>
    </form>
  );
}

export default AppForm;
