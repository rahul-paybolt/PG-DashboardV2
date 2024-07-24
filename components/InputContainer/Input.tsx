import React, { forwardRef } from "react";
import { useInput } from "@nextui-org/input";
import { CloseFilledIcon } from "@/public/assests/Icon/ClosedFilledIcon";

const styles = {
  // label: "text-black/50 dark:text-white/90",
  // input: [
  //   "bg-transparent",
  //   "text-black/90 dark:text-white/90",
  //   "placeholder:text-default-700/50 dark:placeholder:text-white/60",
  // ],
  // innerWrapper: "bg-transparent",
  // inputWrapper: [
  //   "shadow-xl",
  //   "bg-default-200/50",
  //   "dark:bg-default/60",
  //   "backdrop-blur-xl",
  //   "backdrop-saturate-200",
  //   "hover:bg-default-200/70",
  //   "focus-within:!bg-default-200/50",
  //   "dark:hover:bg-default/70",
  //   "dark:focus-within:!bg-default/60",
  //   "!cursor-text",
  // ],

  label: "text-purple-600/50 dark:text-white/90",
  base: [
    "flex item-center justify-center  px-2 py-2 rounded-md ",
  ],
  innerWrapper: "bg-none",
  inputWrapper: [
    "bg-white",
    "shadow-large",
    "hover:bg-white",
    "focus-within:!bg-white/50",

    //   "bg-default-200/50",
    //   "dark:bg-default/60",
    //   "backdrop-blur-xl",
    //   "backdrop-saturate-200",
    //   "hover:bg-default-200/70",
    //   "focus-within:!bg-default-200/50",
    //   "dark:hover:bg-default/70",
    //   "dark:focus-within:!bg-default/60",
    "!cursor-text",
  ],
};
interface InputProps {
  label: string;
  type: string;
  placeholder: string;
  startContent: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue?: string;
  onInputChange?: (filterText: string) => void;
  loadingState?:
    | "loading"
    | "sorting"
    | "loadingMore"
    | "error"
    | "idle"
    | "filtering";
  // Other props as needed
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    Component,
    label,
    domRef,
    description,
    isClearable,
    startContent,
    endContent,
    shouldLabelBeOutside,
    shouldLabelBeInside,
    errorMessage,
    getBaseProps,
    getLabelProps,
    getInputProps,
    getInnerWrapperProps,
    getInputWrapperProps,
    getDescriptionProps,
    getErrorMessageProps,
    getClearButtonProps,
  } = useInput({
    ...props,
    ref,
    classNames: {
      ...styles,
    },
  });

  const labelContent = <label {...getLabelProps()}>{label}</label>;

  const end = React.useMemo(() => {
    if (isClearable) {
      return (
        <span {...getClearButtonProps()}>
          {endContent || <CloseFilledIcon />}
        </span>
      );
    }

    return endContent;
  }, [isClearable, getClearButtonProps]);

  const innerWrapper = React.useMemo(() => {
    if (startContent || end) {
      return (
        <div {...getInnerWrapperProps()}>
          {startContent}
          <input {...getInputProps()} />
          {end}
        </div>
      );
    }

    return <input {...getInputProps()} />;
  }, [startContent, end, getInputProps, getInnerWrapperProps]);

  return (
    <div className="w-[300px]">
      <Component {...getBaseProps()}>
        {shouldLabelBeOutside ? labelContent : null}
        <div
          {...getInputWrapperProps()}
          role="button"
          onClick={() => {
            domRef.current?.focus();
          }}
        >
          {shouldLabelBeInside ? labelContent : null}
          {innerWrapper}
        </div>
        {description && <div {...getDescriptionProps()}>{description}</div>}
        {errorMessage && <div {...getErrorMessageProps()}>{errorMessage}</div>}
      </Component>
    </div>
  );
});

Input.displayName = "Input";

export default Input;
