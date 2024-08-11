import { AuthenticatedUser } from "@/interfaces/authentication.interface";
import { createGlobalState } from "./global-store";

const initialValues: AuthenticatedUser = {
  fullName: '',
  email: '',
  mobile: '',
  designation: '',
  businessName: ''
};



export const AuthStore = createGlobalState<AuthenticatedUser>('authUser', {
  ...initialValues
});