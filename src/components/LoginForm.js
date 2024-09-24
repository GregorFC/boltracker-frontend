"use client";
import LoginService from "@/services/LoginService";
import { Button, Card, TextInput, Divider } from "@tremor/react";
import React, { useEffect } from "react";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { useAppData } from "@/app/contexts/AppProvider";
import { useTranslation } from "react-i18next";
import { siteConfig } from "@/app/siteConfig";


export default function LoginForm() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const { t } = useTranslation();

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-4 py-10 lg:px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h3 className="text-center text-gb-title font-semibold text-gb-primary-400 dark:text-gb-primary-300">
            {t("login.header")}
          </h3>
          <form
            action="#"
            method="post"
            onSubmit={handleLogin}
            className="mt-6 space-y-4"
          >
            <div>
              <label
                htmlFor="email"
                className="text-gb-default font-medium text-gb-content-strong dark:text-gray-300"
              >
                {t("login.email")}
              </label>
              <TextInput
                // type="email"
                error={error}
                errorMessage={errorMessage}
                id="email"
                name="email"
                autoComplete="email"
                placeholder={t("login.email_placeholder")}
                className="mt-2 rounded-md"
                onValueChange={(value) => {
                  setError(false);
                  setUsername(value);
                }}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-gb-default font-medium text-gb-content-strong dark:text-gray-300"
              >
                {t("login.password")}
              </label>
              <TextInput
                type="password"
                id="password"
                name="password"
                autoComplete="password"
                placeholder={t("login.password").toLowerCase()}
                className="mt-2 rounded-md"
                onValueChange={(value) => setPassword(value)}
              />
            </div>
            <div className="flex justify-between">
              <a href={siteConfig.baseLinks.forgottenPassword} className="ml-auto">
                {t("login.forgot_password")}
              </a>
            </div>
            <button
              type="submit"
              className="mt-4 w-full whitespace-nowrap rounded-gb-default py-2 text-center text-gb-default font-medium text-gb-primary-100 rounded-sm hover:text-gb-secondary-100 shadow-gb-input bg-gb-primary hover:bg-gb-secondary-600 dark:hover:bg-gb-secondary-700 dark:bg-gb-primary dark:text-gb-primary-100 dark:hover:text-gb-secondary-100"
            >
              {t("login.login")}
            </button>
          </form>
          <p className="mt-4 text-gb-label text-gb-content dark:text-dark-gb-content">
            {t("login.terms")}
            <a href="#" className="underline underline-offset-4">
              {t("login.terms2")}
            </a>{" "}
            {t("login.and")}{" "}
            <a href="#" className="underline underline-offset-4">
              {t("login.privacy")}
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );

  async function handleLogin(event) {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      // Regex check if username is email
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username)) {
        setError(true);
        setErrorMessage("Invalid email");
        // alert('Invalid email format');
        return;
      }
      await LoginService.logout(); // Logout the user if they are already logged in
      const response = await LoginService.checkUser(
        username.toLowerCase(),
        password,
      );

      if (response.status === 200) {
        // setUser(response.data);
        window.location.href = siteConfig.baseLinks.dashboard;
      }
    } catch (error) {
      // In case of no response
      if (error.code === "ERR_NETWORK") {
        setError(true);
        setErrorMessage(t("unknown.server"));
        // In case of 403 response (Unauthorized)
      } else if (error.response.status === 403) {
        setError(true);
        setErrorMessage(t("login.failed"));
      } else {
        setError(true);
        setErrorMessage(t("unknown.error"));
      }
    }
  }
}
