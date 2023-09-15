"use client";

import Sidebar from "@/components/sidebar";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import Navbar from "./navbar";
import {
  BookOpenCheck,
  GraduationCap,
  LayoutDashboard,
  Presentation,
  Users,
} from "lucide-react";
import Loader from "../ui/loader";

const navigations = {
  admin: [
    { title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { title: "Accounts", path: "/accounts", icon: Users },
  ],
  student: [
    { title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { title: "Quizzes", path: "/quizzes/code", icon: Presentation },
    { title: "Results", path: "/results", icon: GraduationCap },
  ],
  teacher: [
    { title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { title: "Qestion Bank", path: "/questions", icon: BookOpenCheck },
    { title: "Quizzes", path: "/quizzes", icon: Presentation },
    { title: "Results", path: "/results", icon: GraduationCap },
    { title: "zzzzz", path: "/results", icon: GraduationCap },
  ],
};

const DashboardLayout = ({ children }: React.PropsWithChildren) => {
  const [display, setDisplay] = useState("w-0");
  const { logout, user } = useAuth({ middleware: "auth" });

  const collaspe = () => {
    if (display == "w-0") {
      setDisplay("w-full");
    } else {
      setDisplay("w-0");
    }
  };

  if (!user) {
    return <Loader />;
  }

  return (
    <div className="">
      <main className="flex">
        <Sidebar navigations={navigations[user.role]} />
        <section className="w-full bg-background">
          <Navbar logout={logout} />
          <header className="h-56 bg-primary w-full"></header>
          <div className="mx-auto px-2 py-5 md:px-4 lg:px-12 -translate-y-48">
            {children}
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardLayout;
