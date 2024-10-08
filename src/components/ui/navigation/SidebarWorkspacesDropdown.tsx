/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/Dropdown";
import { cx, focusInput } from "@/lib/utils";
import { RiArrowRightSLine, RiExpandUpDownLine } from "@remixicon/react";
import React from "react";
import { useAppData } from "@/app/contexts/AppProvider";
import { useTranslation } from "react-i18next";

const workspaces = [
  {
    value: "bol-analytics",
    name: "Bol.com analytics",
    initials: "BOL",
    role: "",
    color: "bg-gb-brands-bol dark:bg-gb-brands-bol",
  },
  // {
  //   value: "amzn-analytics",
  //   name: "Amazon analytics",
  //   initials: "AZN",
  //   role: "?? tracked",
  //   color: "bg-gb-amazon dark:bg-gb-amazon",
  // },
  // // Add more workspaces...
];

export const WorkspacesDropdownDesktop = () => {
  const { products } = useAppData();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  // const [hasOpenDialog, setHasOpenDialog] = React.useState(false)
  // const dropdownTriggerRef = React.useRef<null | HTMLButtonElement>(null)
  const focusRef = React.useRef<null | HTMLButtonElement>(null);
  const { t } = useTranslation();

  // const handleDialogItemSelect = () => {
  //   focusRef.current = dropdownTriggerRef.current
  // }

  // const handleDialogItemOpenChange = (open: boolean) => {
  //   setHasOpenDialog(open)
  //   if (open === false) {
  //     setDropdownOpen(false)
  //   }
  // }
  return (
    <>
      {/* sidebar (lg+) */}
      <DropdownMenu
        open={dropdownOpen}
        onOpenChange={setDropdownOpen}
        modal={false}
      >
        <DropdownMenuTrigger asChild>
          <button
            className={cx(
              "flex w-full items-center gap-x-2.5 rounded-md bg-gb-secondary-600 p-2 text-sm shadow-sm transition-all hover:bg-gb-secondary-800 dark:border-gray-800  hover:dark:bg-gray-900",
              focusInput,
            )}
          >
            <span
              className="flex aspect-square size-8 items-center justify-center rounded bg-gb-brands-bol dark:bg-gb-brands-bol p-2 text-xs font-medium text-white "
              aria-hidden="true"
            >
              BOL
            </span>
            <div className="flex w-full items-center justify-between gap-x-4 truncate">
              <div className="truncate">
                <p className="text-left truncate whitespace-nowrap text-sm font-medium text-gray-200 dark:text-gray-50">
                  Bol.com
                </p>
                <p className="whitespace-nowrap text-left text-xs text-gray-300 dark:text-gray-300">
                  {products.length} {t("sidebar.workspace.tracked_products")}
                </p>
              </div>
              <RiExpandUpDownLine
                className="size-5 shrink-0 text-gray-500"
                aria-hidden="true"
              />
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          // hidden={hasOpenDialog}
          onCloseAutoFocus={(event) => {
            if (focusRef.current) {
              focusRef.current.focus();
              focusRef.current = null;
              event.preventDefault();
            }
          }}
        >
          <DropdownMenuGroup>
            <DropdownMenuLabel>
              {t("sidebar.workspace.title")} ({workspaces.length})
            </DropdownMenuLabel>
            {workspaces.map((workspace) => (
              <DropdownMenuItem key={workspace.value}>
                <div className="flex w-full items-center gap-x-2.5">
                  <span
                    className={cx(
                      workspace.color,
                      "flex aspect-square size-8 items-center justify-center rounded p-2 text-xs font-medium text-white",
                    )}
                    aria-hidden="true"
                  >
                    {workspace.initials}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                      {workspace.name}
                    </p>
                    <p className="text-xs text-gray-700 dark:text-gray-400">
                      {workspace.role}
                    </p>
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          {/* <DropdownMenuSeparator />
          <ModalAddProduct
            onSelect={handleDialogItemSelect}
            onOpenChange={handleDialogItemOpenChange}
            itemName="Track new product"
          /> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export const WorkspacesDropdownMobile = () => {
  // const [dropdownOpen, setDropdownOpen] = React.useState(false)
  // const [hasOpenDialog, setHasOpenDialog] = React.useState(false)
  // const dropdownTriggerRef = React.useRef<null | HTMLButtonElement>(null)
  // const focusRef = React.useRef<null | HTMLButtonElement>(null)

  const { t } = useTranslation();

  // const handleDialogItemSelect = () => {
  //   focusRef.current = dropdownTriggerRef.current
  // }

  // const handleDialogItemOpenChange = (open: boolean) => {
  //   setHasOpenDialog(open)
  //   if (open === false) {
  //     setDropdownOpen(false)
  //   }
  // }
  return (
    <>
      {/* sidebar (xs-lg) */}
      <DropdownMenu
        // open={dropdownOpen}
        // onOpenChange={setDropdownOpen}
        modal={false}
      >
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-x-1.5 rounded-md p-2 hover:bg-gray-100 focus:outline-none hover:dark:bg-gray-900">
            <span
              className="flex aspect-square size-8 items-center justify-center rounded bg-gb-brands-bol dark:bg-gb-brands-bol p-2 text-xs font-medium text-white "
              aria-hidden="true"
            >
              BOL
            </span>
            <RiArrowRightSLine
              className="size-4 shrink-0 text-gray-500"
              aria-hidden="true"
            />
            <div className="flex w-full items-center justify-between gap-x-3 truncate">
              <p className="truncate whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-50">
                Bol.com
              </p>
              <RiExpandUpDownLine
                className="size-4 shrink-0 text-gray-500"
                aria-hidden="true"
              />
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="!min-w-72"
        // hidden={hasOpenDialog}
        // onCloseAutoFocus={(event) => {
        //   if (focusRef.current) {
        //     focusRef.current.focus()
        //     focusRef.current = null
        //     event.preventDefault()
        //   }
        // }}
        >
          <DropdownMenuGroup>
            <DropdownMenuLabel>
              {t("sidebar.workspace.title")} ({workspaces.length})
            </DropdownMenuLabel>
            {workspaces.map((workspace) => (
              <DropdownMenuItem key={workspace.value}>
                <div className="flex w-full items-center gap-x-2.5">
                  <span
                    className={cx(
                      workspace.color,
                      "flex size-8 items-center justify-center rounded p-2 text-xs font-medium text-white",
                    )}
                    aria-hidden="true"
                  >
                    {workspace.initials}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                      {workspace.name}
                    </p>
                    <p className="text-xs text-gray-700 dark:text-gray-300">
                      {workspace.role}
                    </p>
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
