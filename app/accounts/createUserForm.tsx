"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, useState } from "react";
import httpClient, { handleValidationError } from "@/lib/httpClient";
import axios from "axios";
import { AccountType } from "@/types";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";

const userFormschema = z.object({
  name: z.string().min(2, { message: "name is required" }),
  email: z.string().min(2, { message: "name is required" }),
  password: z.string().min(2, { message: "name is required" }),
  role: z.string().min(2, { message: "name is required" }),
});

const CreateUserForm = () => {
  const [isopen, setIsopen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof userFormschema>>({
    resolver: zodResolver(userFormschema),
  });

  // sunbmit request
  const createUser = async (data: z.infer<typeof userFormschema>) => {
    try {
      await createUser(data);
      setIsopen(false);
    } catch (error) {
      if (axios.isAxiosError(error) && error?.response?.status === 422)
        handleValidationError(error, form.setError);
      console.log(error);
    }
  };

  return (
    <Dialog open={isopen} onOpenChange={() => setIsopen(!isopen)}>
      <DialogTrigger className="h-fit">
        <Button>Create Account</Button>
      </DialogTrigger>
      <DialogContent className="p-4">
        <DialogHeader>
          <DialogTitle>Create a New Account</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(createUser)}>
            <FormField
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Name:</FormLabel>
                  <Input id="name" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email:</FormLabel>
                  <Input id="email" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">Password:</FormLabel>
                  <Input id="password" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="role">Role:</FormLabel>
                  <Select onValueChange={field.onChange} {...field}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent id="role">
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="teacher">Teacher</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full mt-4">Create</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserForm;
