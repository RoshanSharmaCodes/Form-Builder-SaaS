"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FieldEdit from "./FieldEdit";

export default function FormUI({ data, handleFieldUpdate, handleDeleteField }) {
  const [formData, setFormData] = useState(data);

  useEffect(() => {
    console.log("Data",data)
    if(typeof data === "string"){
      setFormData(JSON.parse(data));
    } else{
      setFormData(data)
    }
    
  }, [data]);

  useEffect(() => {
    console.log("Form inside UI", formData);
  }, [formData]);

  return (
    <div className="border p-5 md:w-[600px]">
      <h2 className="font-bold text-center text-2xl">{formData.formTitle}</h2>
      <h2 className="text-sm text-gray-400 text-center">
        {formData.formSubheading}
      </h2>
      {formData?.fields?.length > 0 &&
        formData?.fields.map((item, index) => (
          <div key={index} className="flex items-center gap-2 justify-center">
            <div className="my-3 w-full">
              {item.type == "select" ? (
                <div className="my-3">
                  <label className="text-xs text-gray-500">{item.label}</label>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={item.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {item.options.length > 0 &&
                        item.options.map((option, key) => (
                          <SelectItem key={key} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              ) : item.type === "radio" ? (
                <div className="my-3 w-full">
                  <label className="text-xs text-gray-500">{item.label}</label>
                  <RadioGroup defaultValue={item.options[0].label}>
                    {item.options.map((option, key) => (
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          key={key}
                          value={option.label}
                          id={option.label}
                        />
                        <Label htmlFor={option.label}>{option.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ) : item.type === "checkbox" ? (
                <div className="my-3 w-full">
                  <label className="text-xs text-gray-500">{item.label}</label>
                  {item.options.length > 0 ? (
                    item?.options.map((option, key) => (
                      <div className="gap-2">
                        <Checkbox />
                        <h2>{option.label}</h2>
                      </div>
                    ))
                  ) : (
                    <div className="flex gap-2">
                      <Checkbox />
                      <h2>{item.label}</h2>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <label className="text-xs text-gray-500">{item.label}</label>
                  <Input
                    type={item.type}
                    placeholder={item.placeholder}
                    name={item.fieldName}
                  />
                </div>
              )}
            </div>
            <FieldEdit
              defaultValue={item}
              fieldIndex={index}
              handleFieldUpdate={handleFieldUpdate}
              handleDeleteField={handleDeleteField}
            />
          </div>
        ))}
    </div>
  );
}
