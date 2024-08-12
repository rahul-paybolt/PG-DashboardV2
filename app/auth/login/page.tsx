"use client";
import React, { useState, useEffect } from "react";
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
