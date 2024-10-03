import i18n from "@/app/i18n";
import { siteConfig } from "@/app/siteConfig";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { changeLanguage } from "i18next";
import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { useTranslation } from "react-i18next";
import { Logo } from "../icons/Logo";
import { handleDemoLogin } from "@/lib/utils";

export const LandingHeader = () => {
  const { t } = useTranslation();
  const [headerBg, setHeaderBg] = useState("bg-transparent");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHeaderBg("bg-gb-secondary-600 shadow-md");
      } else {
        setHeaderBg("bg-transparent");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (

    <div
      className={`fixed top-0 z-40 w-full h-16 flex items-center justify-between px-2 sm:gap-x-6 sm:px-4 transition-colors duration-300 ${headerBg}`}
    >
      <div className="text-gray-200 font-extrabold ml-4 max-w-xs">
        <Logo className="!text-2xl" />
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary">
              🌍
              <span className="hidden min-[520px]:inline">
                {i18n.language === "nl" ? "Nederlands" : "English"}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white p-2 rounded-lg">
            <DropdownMenuItem className=" p-2 " onClick={() => changeLanguage("nl")}>
              🇳🇱 Nederlands
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className=" p-2 " onClick={() => changeLanguage("en")}>
              🇺🇸 English
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          className="group text-gray-200 !text-lg"
          variant="ghost"
          asChild
        >
          <a href="/pricing">{t("landing.pricing")}</a>
        </Button>
        <Button
          className="group text-gray-200 !text-lg"
          variant="primary"
          asChild
        >
          <a href={siteConfig.baseLinks.login}>{t("landing.signin")}</a>
        </Button>
        <Button
          className="group !text-lg hidden md:block"
          variant="accent"
          asChild
        >
          <a href="#" onClick={handleDemoLogin}>
            {t("landing.demo_button")}
          </a>
        </Button>
      </div>
    </div>
  );
};