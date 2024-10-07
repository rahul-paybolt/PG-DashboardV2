import { extendVariants, Input } from "@nextui-org/react";
import { useEffect } from "react";

const CustomInputBe = extendVariants(Input, {
  variants: {
    // <- modify/add variants
    color: {
      stone: {
        // <- add a new color variant
        inputWrapper: [
          // <- Input wrapper slot
          "bg-white",
          "border",
          "transition-colors",
          "focus-within:bg-blue-100",
          "data-[hover=true]:border-primary-600",
          "data-[hover=true]:bg-white",
          "group-data-[focus=true]:border-primary-600",
          "data-[focus=true]: bg-white",
          "focus-within:!bg-white",
          // white theme
          "white:bg-white",
          "white:border-primary-600",
          "white:data-[hover=true]:bg-white",
          "white:focus-within:bg-white",
          "data-[invalid=true]:border-red-500",
          "data-[invalid=true]:bg-none",
          // dark theme
          // "dark:bg-zinc-900",
          // "dark:border-zinc-800",
          // "dark:data-[hover=true]:bg-zinc-900",
          // "dark:focus-within:bg-zinc-900",
        ],
        input: [
          // <- Input element slot
          "text-blue-800",
          "placeholder:text-zinc-600",

          // white theme
          "white:text-black",
          "white:placeholder:text-black",
          "autofill:text-black", // Change this to desired text color
          "autofill:bg-white",
          // dark theme
          // "dark:text-zinc-400",
          // "dark:placeholder:text-zinc-600",

        ],
      },
    },
    size: {
      xs: {
        inputWrapper: "h-6 min-h-6 px-1",
        input: "text-tiny",
      },
      md: {
        inputWrapper: "h-10 min-h-10",
        input: "text-small",
      },
      xl: {
        inputWrapper: "h-14 min-h-14",
        input: "text-medium",
      },
    },
    radius: {
      xs: {
        inputWrapper: "rounded",
      },
      sm: {
        inputWrapper: "rounded-[4px]",
      },
    },
    textSize: {
      base: {
        input: "text-base",
      },
    },
    removeLabel: {
      true: {
        label: "hidden",
      },
      false: {
        label: "text-base hover:text-primary-600",
      },
    },
    errorMessage: {
      true: {
        errorMessage: "text-red-600",
      },
      false: {
        errorMessage: "text-red-600 hidden",
      },
    },

    // variant: {
    //   flat: {
    //     mainWrapper: "border border-primary-600",
    //   },
    //   bordered: {
    //     mainWrapper: "border border-primary-600",
    //   },
    // },
  },
  defaultVariants: {
    color: "stone",
    textSize: "base",
    removeLabel: false,
    errorMessage: false,
    variant: "flat",
  },
});

const autofillStyles = `
  input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 30px #ffffff inset; /* Change to input background color */
      -webkit-text-fill-color: #000000; /* Change to desired text color */
  }

  input:-webkit-autofill:focus {
      -webkit-box-shadow: 0 0 0 30px #ffffff inset; /* Maintain background when focused */
      -webkit-text-fill-color: #000000; /* Ensure text color is visible */
  }
`;


const CustomInput = (props: any) => {
  useEffect(() => {
    const style = document.createElement("style");
    style.appendChild(document.createTextNode(autofillStyles));
    document.head.appendChild(style);

    // Clean up by removing the style element on component unmount
    return () => {
      document.head.removeChild(style);
    };
  }, []); // Empty dependency array to run only once after mount

  return <CustomInputBe {...props} />;
};

export default CustomInput;
