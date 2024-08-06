import React, { forwardRef } from "react";
import { useInput } from "@nextui-org/input";
import { CloseFilledIcon } from "@/public/assests/Icon/ClosedFilledIcon";

const styles = {
  label: "text-secondary dark:text-white/90",
  base: ["flex item-center justify-center rounded-md "],
  innerWrapper: "bg-none",
  inputWrapper: [
    "bg-white",
    "dark:bg-default/60",
    "shadow-large",
    "hover:bg-white",
    "dark:hover:bg-default/70",
    "focus-within:!bg-white/50",
    "dark:focus-within:!bg-default/60",
    "!cursor-text",
    "data-hover: bg-white"
  ],
};
interface InputProps {
  label: string;
  type: string;
  placeholder?: string;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;

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
  variant?: "flat" | "bordered" | "faded" | "underlined";
  className?: string;
  isInvalid?: boolean;
  color?: string;
  errorMessage?: string;
  onValueChange?:	(value: string) => void;
  isRequired?: boolean;
  name: string;
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
    <div>
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
