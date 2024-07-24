"use client";

import Link from "next/link";
import { Input } from "@nextui-org/input";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";

const SignUp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-x-hidden">
      <div className="bg-effect">
        <div className="first" />
        <div className="second" />
      </div>
      <Card className="max-w-md w-full space-y-5 px-10 py-8">
        <CardHeader>
          <div className="w-full">
            <img
              alt="PayBolt"
              className="mx-auto h-12 w-auto"
              src="/icon.png"
            />
            <h2 className="mt-5 text-center text-3xl leading-9 font-extrabold text-zinc-900">
              Create your account
            </h2>
          </div>
        </CardHeader>
        <CardBody>
          <form
            className="flex flex-col gap-5"
            onSubmit={e => e.preventDefault()}>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="name">Name</label>
                <Input
                  autoComplete="name"
                  classNames={{
                    inputWrapper: "appearance-none w-full rounded-md border",
                  }}
                  id="name"
                  name="name"
                  placeholder="Name"
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email-address">Email address</label>
                <Input
                  autoComplete="email"
                  classNames={{
                    inputWrapper: "appearance-none w-full rounded-md border",
                  }}
                  id="email-address"
                  name="email"
                  placeholder="Email address"
                  type="email"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password">Password</label>

                <Input
                  autoComplete="current-password"
                  classNames={{
                    inputWrapper: "appearance-none w-full rounded-md border",
                  }}
                  id="password"
                  name="password"
                  placeholder="Password"
                  type="password"
                />
              </div>
            </div>
            <div className="flex items-center">
              <input
                className="h-3 w-3 text-primary focus:ring-primary/80 border-gray-300 rounded"
                id="remember_me"
                name="remember_me"
                type="checkbox"
              />
              <label
                className="ml-2 block text-sm text-gray-900"
                htmlFor="remember_me">
                Accept the{" "}
                <Link className="text-primary hover:text-primary/80" href="#">
                  terms & conditions
                </Link>{" "}
                and{" "}
                <Link className="text-primary hover:text-primary/80" href="#">
                  privacy policy
                </Link>
              </label>
            </div>
            <div>
              <button
                className="transition-all group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:primary/80"
                type="submit">
                Sign up
              </button>
            </div>
          </form>
        </CardBody>
        <CardFooter>
          <div className="text-center">
            <p className="text-sm text-gray-600 flex items-center gap-1 justify-center">
              <span>Already have an account?</span>
              <Link
                className="font-medium text-primary hover:text-primary/80"
                href="/sign-in">
                Sign in
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
