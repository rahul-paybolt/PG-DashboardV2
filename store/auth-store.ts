"use client"
import { AuthenticatedUser, GoogleUserdata } from "@/interfaces/authentication.interface";
import { useStore } from "@tanstack/react-store";
import { Store } from "@tanstack/store";
// import { useState } from "react";

// Define initial values
const initialValues: AuthenticatedUser = {
  fullName: '',
  email: '',
  mobile: '',
  designation: '',
  businessName: ''
};

// Create a store for authenticatedUser

const authUserStore = new Store({
  ...initialValues
});

const setAuthenticatedUser = (newUser: AuthenticatedUser) => {
  console.log("new user coming",newUser)
  authUserStore.setState(prev=> console.log("prev", prev))
  authUserStore.setState((prev) => ({ ...prev, ...newUser }));
};

const resetAuthenticatedUser = () => {
  authUserStore.setState(()=>initialValues );
};

export {
  authUserStore,
  setAuthenticatedUser,
  resetAuthenticatedUser,
  // gAuthUser,
  // setGAuthUser,
  // resetGAuthUser,
};
