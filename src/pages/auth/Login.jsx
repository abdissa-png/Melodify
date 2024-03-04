import { useMemo } from "react";
import { Link } from "react-router-dom";

import { loginRequest } from "@/lib/store/slices";
import { useSelector, useDispatch } from "react-redux";
import { loginValidation } from "@/lib/validations";
import { css } from "@emotion/react";
import { Form } from "@/components";

export default function Login() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.currentUser);

  const handleSubmit = (values) => {
    dispatch(loginRequest(values));
  };

  const list = useMemo(() => {
    return [
      {
        type: "input",
        name: "email",
        label: "Email address",
        props: {
          type: "email",
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
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-top: 1.5rem;
          margin-bottom: 1.5rem;
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
        btnTxt="Login"
        isSubmitting={isLoading.login}
        schema={loginValidation}
        onSubmit={handleSubmit}
        defaultValues={{
          email: "demo@melodify.com",
          password: "password@123",
        }}
      />
      <div
        css={css`
          display: flex;
          color: var(--onNeutralBg);
          margin-top: 1rem;
          flex-direction: column;
          gap: 0.5rem;
          justify-content: center;
          align-items: center;
          font-size: 0.875rem;
          line-height: 1.25rem;
        `}
      >
        <div>
          Have no account?{" "}
          <Link
            to="/register"
            css={css`
              text-underline-offset: 2px;
              color: var(--primary);
              &:hover {
                text-decoration: underline;
              }
            `}
          >
            Sign up
          </Link>
        </div>
      </div>
    </section>
  );
}
