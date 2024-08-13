import { AuthenticatedUser } from "@/interfaces/authentication.interface";
import { createGlobalState } from "./global-store";

const initialValues: AuthenticatedUser = {
  fullName: "",
  email: "",
  mobile: "",
  designation: "",
  businessName: "",
  is2FAEnabled: false,
  onboardingStatus: 0,
};

export const AuthStore = createGlobalState<AuthenticatedUser>("authUser", {
  ...initialValues,
});
