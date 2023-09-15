"use client";

import React, { ChangeEvent, useState } from "react";
import { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import z from "zod";
import useAuth from "@/hooks/useAuth";
import { LoginCredentials, LoginCredentialsError } from "@/types";
import ValidationError from "@/components/ui/validation-error";

function Page() {
  const [form, setForm] = useState<LoginCredentials>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<LoginCredentialsError>();

  const { login } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/dashboard",
  });

  const handleFormUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const onSubmit = (data: typeof form) => {
    login({ setErrors, data });
  };

  return (
    <div className="grid h-screen place-items-center">
      <div className="w-full max-w-xl">
        <Card className="p-8">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Enter your credentials to login</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit(form);
              }}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="email" title="Email" />
                <Input
                  value={form?.email}
                  onChange={handleFormUpdate}
                  name="email"
                  placeholder="Email Address"
                />
                <ValidationError message={errors?.email} />
              </div>
              <div>
                <Label htmlFor="password" title="Password" />
                <Input
                  value={form?.password}
                  onChange={handleFormUpdate}
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                <ValidationError message={errors?.password} />
              </div>

              <div>
                <Button>Login</Button>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <p className="ml-auto text-xs">
              Powered By <strong>Skulmina</strong>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Page;
