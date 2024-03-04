import { useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { useUpdatePassword, useUpdateProfile } from "@/lib/actions";
import {
  editProfileValidation,
  updatePasswordValidation,
} from "@/lib/validations";
import { Form, Icon, Title, PatternBg } from "@/components";
import { css } from "@emotion/react";
const EditProfile = ({ details }) => {
  const { updateUserProfile, isSubmitting } = useUpdateProfile();
  const [files, setFiles] = useState(null);

  const handleSubmit = async (values) => {
    updateUserProfile({
      username: values.username,
      files,
    });
  };

  const list = useMemo(() => {
    return [
      {
        type: "image_dropzone",
        name: "imageUrl",
        label: "",
        containerDims: "height:8rem; width:8rem;",
        borderType: "border-radius:9999px",
        props: {
          type: "file",
          placeholder: "",
        },
      },
      {
        type: "input",
        name: "username",
        label: "Username",
        props: {
          type: "text",
          placeholder: "",
        },
      },
      {
        type: "input",
        name: "email",
        label: "Email",
        props: {
          disabled: true,
          type: "text",
          placeholder: "",
        },
      },
    ];
  }, []);

  return (
    <div
      css={css`
        position: relative;
        padding: 1rem;
        overflow: hidden;
        border-radius: var(--border-radius);
        background-color: var(--cardBg);
        @media (min-width: 450px) {
          padding: 1.5rem /* 24px */;
        }
      `}
    >
      <PatternBg />
      <div
        css={css`
          margin-bottom: 1rem;
        `}
      >
        <h5
          css={css`
            font-size: 1.125rem;
            line-height: 1.75rem;
            font-weight: 600;
          `}
        >
          Profile
        </h5>
      </div>
      <Form
        list={list}
        btnTxt="Save"
        isSubmitting={isSubmitting}
        schema={editProfileValidation}
        onSubmit={handleSubmit}
        files={files}
        setFiles={setFiles}
        defaultValues={{
          username: details?.username,
          email: details?.email,
          image: details?.imageUrl,
        }}
      />
    </div>
  );
};

const ChangePassword = ({ isPasswordEnabled }) => {
  const { updatePass, isSubmitting, isSubmitted } = useUpdatePassword();
  const [files, setFiles] = useState(null);

  const handleSubmit = async (values) => {
    updatePass(values);
  };

  const list = useMemo(() => {
    return [
      {
        type: "input",
        name: "currentPassword",
        label: "Current Password",
        props: {
          disabled: !isPasswordEnabled,
          type: "password",
          placeholder: "",
        },
      },
      {
        type: "input",
        name: "newPassword",
        label: "New Password",
        props: {
          disabled: !isPasswordEnabled,
          type: "password",
          placeholder: "",
        },
      },
      {
        type: "input",
        name: "confirmNewPassword",
        label: "Confirm New Password",
        props: {
          disabled: !isPasswordEnabled,
          type: "password",
          placeholder: "",
        },
      },
    ];
  }, [isPasswordEnabled]);

  return (
    <div
      css={css`
        position: relative;
        padding: 1rem;
        overflow: hidden;
        border-radius: var(--border-radius);
        background-color: var(--cardBg);
        @media (min-width: 450px) {
          padding: 1.5rem /* 24px */;
        }
      `}
    >
      <PatternBg />
      <div
        css={css`
          margin-bottom: 1rem;
        `}
      >
        <h5
          css={css`
            font-size: 1.125rem;
            line-height: 1.75rem;
            font-weight: 600;
          `}
        >
          Change Password
        </h5>
        {!isPasswordEnabled && (
          <span
            css={css`
              display: flex;
              align-items: center;
              gap: 0.25rem;
              font-size: 0.875rem;
              line-height: 1.25rem;
              --tw-text-opacity: 1;
              color: rgb(234 179 8 / var(--tw-text-opacity));
            `}
          >
            <Icon
              name="PiWarningCircleBold"
              className="!text-yellow-500"
              size={16}
            />
            Accounts authenticated with Google Oauth cannot update password!
          </span>
        )}
      </div>
      <Form
        list={list}
        btnTxt="Update Password"
        isSubmitting={isSubmitting}
        isSubmitted={isSubmitted}
        schema={updatePasswordValidation}
        onSubmit={handleSubmit}
        files={files}
        setFiles={setFiles}
        defaultValues={{
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        }}
      />
    </div>
  );
};

export default function Profile() {
  const { currentUser } = useSelector((store) => store.currentUser);
  const { user } = currentUser || {};
  return (
    <>
      {currentUser && (
        <>
          {!user ? (
            <Navigate to="/" replace={true} />
          ) : (
            <section>
              <Title
                name="Account"
                desc="Discover your sound identity. Share your musical journey in a vibrant profile."
                type="large"
              />
              <div
                css={css`
                  display: flex;
                  flex-direction: column;
                  row-gap: 2.5rem;
                  color: var(--onNeutralBg);
                `}
              >
                <EditProfile
                  details={{
                    email: user?.email,
                    username: user?.username,
                    imageUrl: user?.imageUrl,
                  }}
                />
                <ChangePassword isPasswordEnabled={user?.isPasswordEnabled} />
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
}
