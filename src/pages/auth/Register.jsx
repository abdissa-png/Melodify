import { useMemo } from "react";
import { Link } from "react-router-dom";

import { registerRequest } from "@/lib/store/slices";
import { useSelector, useDispatch } from "react-redux";
import { registerValidation } from "@/lib/validations";
import { css } from "@emotion/react";

import { Form } from "@/components";

export default function Register() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.currentUser);

  const handleSubmit = (values) => {
    dispatch(registerRequest(values));
  };

  const list = useMemo(() => {
    return [
      {
        type: "input",
        name: "email",
        label: "Email Address",
        props: {
          type: "email",
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
        name: "password",
        label: "Password",
        props: { type: "password", placeholder: "" },
      },
    ];
  }, []);

  return (
    <section>
      <div
        css={css`
          gap: 1rem;
          margin-top: 1.5rem;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        <div
          css={css`
            height: 1px;
            background-color: var(--onNeutralBgDivider);
            flex: 1 1 0%;
          `}
        />
        <span
          css={css`
            font-size: 0.875rem;
            line-height: 1.25rem;
            color: var(--onNeutralBg);
          `}
        >
          or
        </span>
        <div
          css={css`
            height: 1px;
            background-color: var(--onNeutralBgDivider);
            flex: 1 1 0%;
          `}
        />
      </div>
      <Form
        list={list}
        btnTxt="Register"
        isSubmitting={isLoading.register}
        schema={registerValidation}
        onSubmit={handleSubmit}
      />
      <div
        css={css`
          flex-direction: column;
          gap: 0.5rem;
          margin-top: 1rem;
          font-size: 0.875rem;
          line-height: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--onNeutralBg);
        `}
      >
        <div>
          Have an account?{" "}
          <Link
            to="/login"
            css={css`
              text-underline-offset: 2px;
              color: var(--primary);
              &:hover {
                text-decoration: underline;
              }
            `}
          >
            Sign in
          </Link>
        </div>
      </div>
    </section>
  );
}
