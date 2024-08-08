"use client";
import React, { useState, useEffect } from "react";

import RegisterForm from "@/components/Registration/RegisterFlow";
import { initiateGoogleSignIn } from "@/utils/google-auth.utils";
import UsersBasicDetails from "@/components/Registration/UsersBasicDetails";
const Register = () => {
  let buttonRef: HTMLDivElement | null = null;

  // useEffect(() => {
  //   if (buttonRef) {
  //     initiateGoogleSignIn(buttonRef, true);
  //   }
  // }, [buttonRef]);
  return <UsersBasicDetails />;
};

export default Register;
