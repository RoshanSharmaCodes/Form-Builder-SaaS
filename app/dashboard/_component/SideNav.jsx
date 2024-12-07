"use client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { db } from "@/config";
import { jsonForm } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import {
  BarChart,
  LibraryBig,
  MessageSquare,
  SettingsIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function SideNav() {
  const MENU_ITEM = [
    { id: 1, name: "Forms", icon: LibraryBig, path: "/dashboard" },
    {
      id: 2,
      name: "Submissions",
      icon: MessageSquare,
      path: "/dashboard/submissions",
    },
    { id: 3, name: "Analytics", icon: BarChart, path: "/dashboard/analytics" },
    { id: 4, name: "Upgrade", icon: SettingsIcon, path: "/dashboard/upgrade" },
  ];
  const pathName = usePathname();
  const { user } = useUser();
  const [formList, setFormList] = useState();
  const [progressPercent, setProgressPercent] = useState(0);

  const handleGetAllForms = async () => {
    const result = await db
      .select()
      .from(jsonForm)
      .where(eq(jsonForm?.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(jsonForm.id));
    setFormList(result);
    const percent = (result.length / 5) * 100;
    setProgressPercent(percent)
  };

  useEffect(() => {
    user && handleGetAllForms();
  }, [user]);

  return (
    <div className="h-screen shadow-md border">
      <div className="p-5">
        {MENU_ITEM.map((menu, index) => (
          <Link
            href={menu.path}
            key={index}
            className={`flex items-center mb-3 gap-3 p-3 border-b-2 hover:bg-primary hover:text-white rounded-md hover:cursor-pointer ${
              pathName == menu.path ? "bg-primary text-white" : "text-gray-700"
            }`}
          >
            {" "}
            <menu.icon /> {menu.name}
          </Link>
        ))}
      </div>
      <div className="fixed w-64 bottom-7 p-6">
        <Button className="w-full">+ Create AI Form</Button>
        <div className="my-5">
          <Progress value={progressPercent} />
          <h2 className="text-gray-600 mt-2 text-center">
            <strong>{formList?.length}</strong> Out of <strong>5</strong> Limit
          </h2>
          <h2 className="text-sm text-gray-600 mt-2 text-center">
            Upgrade Your Plan For More
          </h2>
        </div>
      </div>
    </div>
  );
}
