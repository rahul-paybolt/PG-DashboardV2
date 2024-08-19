import { type AxiosResponse } from "axios";
import { safeAny } from "@/lib/interfaces/global.interface";
import { NO_DATA_FOUND_MSG } from "@/lib/constants/global-constants";
import { useToast } from "../components/Toast/ToastContext";

export const resolvePBApi = async <T = safeAny>(
  aPromiseFn: () => Promise<AxiosResponse<T>>,
  showSpinner = true,
  showError = true,
  handle401 = true
): Promise<[T | null, safeAny, number]> => {
  let apiResponse: AxiosResponse<T> | null = null;
  // const { showToast } = useToast();

  let errorResponse: safeAny = null;

  try {
    if (showSpinner) {
      // globalStore.update((val) => ({ ...val, showSpinner: true }));
    }

    const response = await aPromiseFn();
    apiResponse = response;
  } catch (e: safeAny) {
    if (handle401 && e?.response?.status === 401) {
      // clearAuthenticatedUserDetails();
      window.location.pathname = "/login";
    }
    errorResponse = e?.response?.data || { message: "Something went wrong" };
    if (
      errorResponse?.message &&
      showError &&
      errorResponse?.message !== NO_DATA_FOUND_MSG &&
      !errorResponse.is_check_box
    ) {
      // try to find out how errors key behaves and try to generalize
      // showErrorToast(errorResponse.message);

      // showToast("getting error", "error");
      console.log("errr...");
    }
  } finally {
    if (showSpinner) {
      // globalStore.update((val) => ({ ...val, showSpinner: false }));
    }
  }
  return [apiResponse?.data ?? null, errorResponse, apiResponse?.status ?? 200];
};

export const isIosOrSafariDevice = () =>
  typeof navigator !== "undefined" &&
  (/iPad|iPhone|iPod|Safari/.test(navigator.userAgent || "") ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1));

export const isValidAndNonEmptyString = (str: string) =>
  str && typeof str === "string" && str.length > 0;

export const parseJsonString = <T>(jsonString: string): T | null => {
  let jsonStringToParse = `${jsonString}`;
  if (!isValidAndNonEmptyString(jsonStringToParse)) {
    return null;
  }
  jsonStringToParse = jsonStringToParse.trim();
  try {
    const parsedJson = JSON.parse(jsonStringToParse);
    return parsedJson;
  } catch (e) {
    console.error(`error parsing json string: ${jsonStringToParse}`, e);
    return null;
  }
};

export const isNonNumericKeyPressed = (e: KeyboardEvent) =>
  (!e.ctrlKey && !e.metaKey && e.key !== "Backspace" && !/\d/.test(e.key)) ||
  e.key === " ";

export const rightPadArray = (
  arrayToPad: safeAny[],
  requiredArrayLength: number,
  value: safeAny
) => {
  if (arrayToPad.length >= requiredArrayLength) {
    return arrayToPad.slice(0, requiredArrayLength);
  }
  const arrayToConcat = Array(requiredArrayLength - arrayToPad.length).fill(
    value
  );
  return arrayToPad.concat(arrayToConcat);
};

export const getRandomColor = (value: string | undefined) => {
  if (!value) {
    return "#EFEFEF";
  }
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash);
  }

  const color = "#" + (hash & 0x00ffffff).toString(16).toUpperCase();
  return color;
};

export const getNumberOfFiltersApplied = (
  filter: Record<safeAny, safeAny> | null
) => {
  let numberOfFilters = 0;
  if (!filter) {
    return numberOfFilters;
  }
  Object.keys(filter ?? {}).forEach((aFilterKey) => {
    if (filter?.[aFilterKey]) {
      numberOfFilters += 1;
    }
  });
  return numberOfFilters;
};

export const formatSeconds = (duration: number, showSeconds = true) => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const remainingSeconds = duration % 60;

  let formattedTime = `${hours.toString().padStart(2, "0")}hr ${minutes
    .toString()
    .padStart(2, "0")}m ${remainingSeconds.toString().padStart(2, "0")}s`;

  if (!showSeconds) {
    formattedTime = `${hours.toString().padStart(2, "0")}hr ${minutes
      .toString()
      .padStart(2, "0")}m`;
  }

  return formattedTime;
};

export const loadScript = (src: string, successCallback: () => void) => {
  const script: safeAny = document.createElement("script");
  // script.type = 'text/javascript';
  // if (script.readyState) {
  //   // only required for IE <9
  //   script.onreadystatechange = function () {
  //     if (script.readyState === 'loaded' || script.readyState === 'complete') {
  //       script.onreadystatechange = null;
  //       successCallback();
  //     }
  //   };
  // } else {
  //   //Others
  //   script.onload = () => {
  //     successCallback();
  //   };
  // }

  script.src = src;
  script.async = true;
  script.defer = true;
  // document.getElementsByTagName('head')[0].appendChild(script);
};

export const convertToTitleCase = (value: string) => {
  return value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const formatPathWithTrailingSlash = (data: string | undefined) => {
  const path = data || "/";
  if (path.endsWith("/")) {
    return path;
  }
  return `${path}/`;
};

export const parsePathSegments = (data: string | undefined) => {
  const path = data || "";
  return path.split("/").filter(Boolean);
};

export const transformStringFromSnakeCase = (val: string) => {
  const abbreviations = ["gst", "mca", "tds"];

  for (const abbreviation of abbreviations) {
    if (val.toLowerCase().startsWith(abbreviation)) {
      const restOfTheString = val.substring(abbreviation.length).toLowerCase();
      const transformedString = abbreviation.toUpperCase() + restOfTheString;
      const words = transformedString.split(/[_\s]+/);
      const capitalizedWords = words.map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1)
      );
      return capitalizedWords.join(" ");
    }
  }

  const words = val.split(/[_\s]+/);
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  return capitalizedWords.join(" ");
};
