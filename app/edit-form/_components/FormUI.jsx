"use client";
import React, { useEffect, useState } from "react";

export default function FormUI({ data }) {
  const [formData, setFormData] = useState(data);

  // Update formData when data prop changes
  useEffect(() => {
    setFormData(JSON.parse(data)); // Sync formData with the latest data prop
  }, [data]);

  useEffect(() => {
    console.log("Form inside UI", formData);
  }, [formData]);

  return (
    <div>
      <h1>Form Data</h1>
      <h2>Hello {formData.formTitle}</h2>
    </div>
  );
}
