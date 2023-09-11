"use client";

import DashboardLayout from "@/components/layout.tsx/dashboardLayout";
import CreateUserForm from "./createUserForm";
import UserCard from "@/components/user/user-card";
import { Users } from "@/src/constant";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import useSwr from "swr";
import httpClient from "@/lib/httpClient";
import { getUsers } from "@/src/api/user";
import { AccountType, ApiResponse } from "@/types";

const page = () => {
  const { data: users, isLoading } = useSwr<ApiResponse<AccountType[]>>(
    "users",
    () => getUsers()
  );

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <DashboardLayout>
      <section className="p-4 md:px-12 md:py-8 w-full">
        <header className="flex items-center py-4 gap-4 mb-8">
          <h2 className="font-medium text-xl">ALL USERS</h2>
          <form className="relative">
            <Input className="w-full pr-8" type="text" placeholder="Search.." />
            <Button variant="ghost" className="top-0 right-0 absolute">
              <Search size={24} />
            </Button>
          </form>
          <div className="ml-auto">
            <CreateUserForm />
          </div>
        </header>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {users?.data?.map((user) => {
            return (
              <UserCard name={user.name} email={user.email} role={user.role} />
            );
          })}
        </div>
      </section>
    </DashboardLayout>
  );
};

export default page;
