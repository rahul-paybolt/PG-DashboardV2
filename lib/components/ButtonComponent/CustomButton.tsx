import { extendVariants, Button } from "@nextui-org/react";

export const CustomButton = extendVariants(Button, {
  variants: {
    color: {
      primary: " text-white bg-primary-600 hover:bg-primary-700",
      secondary: " text-white bg-secondary-600 hover:bg-secondary-700",
      danger: " text-white bg-red-600 hover:bg-red-700",
      success: " text-white bg-green-600 hover:bg-green-700",
      warning: " text-white bg-yellow-600 hover:bg-yellow-700",
      info: " text-white bg-blue-600 hover:bg-blue-700",
      light: " text-black bg-white hover:bg-gray-100",
      dark: " text-white bg-gray-800 hover:bg-gray-900",
    },
    isDisabled: {
      true: "bg-[#eaeaea] text-[#000] opacity-50 cursor-not-allowed",
    },
    size: {
      xs: "px-2 min-w-12 h-6 text-tiny gap-1 rounded-small",
      md: "px-4 min-w-20 h-10 text-small gap-2 rounded-small",
      xl: "px-8 min-w-28 h-14 text-large gap-4 rounded-medium",
    },
    defaultVariants: {
      // <- modify/add default variants
      color: "primary",
      size: "xl",
    },
    compoundVariants: [
      // <- modify/add compound variants
      {
        isDisabled: true,
        color: "olive",
        class: "bg-[#84cc16]/80 opacity-100",
      },
    ],
  },
});
