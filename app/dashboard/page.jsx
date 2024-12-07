import { Button } from "@/components/ui/button";
import React from "react";
import CreateForm from "./_component/CreateForm";
import FormList from "./_component/FormList";

export default function page() {
  return (
    <div className="p-10">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-3xl">Dashboard</h2>
        <CreateForm />
      </div>
      <FormList />
    </div>
  );
}
