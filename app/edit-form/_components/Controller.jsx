import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { daisyUIThemes } from "@/app/_data/Theme";
import formBackgroundThemes from "@/app/_data/BgTheme";

export default function Controller({
  selectedTheme,
  selectedBg,
  handleFormUpdate,
}) {
  return (
    <div>
      <h2 className="my-2">Select Themes</h2>
      <Select
        defaultValue="light"
        onValueChange={(value) => {
          selectedTheme(value);
          handleFormUpdate(value, "theme");
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          {daisyUIThemes.map((item, index) => (
            <div>
              {" "}
              <SelectItem
                value={item.themeName}
                key={index}
                className="cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <div
                      style={{ backgroundColor: item.primary }}
                      className="h-5 w-5 rounded-l-md"
                    ></div>
                    <div
                      style={{ backgroundColor: item.secondary }}
                      className="h-5 w-5"
                    ></div>
                    <div
                      style={{ backgroundColor: item.info }}
                      className="h-5 w-5"
                    ></div>
                    <div
                      style={{ backgroundColor: item.accent }}
                      className="h-5 w-5 rounded-r-md"
                    ></div>
                  </div>
                  <h2>
                    {item.themeName[0].toUpperCase()}
                    {item.themeName.slice(1).toLowerCase()}
                  </h2>
                </div>
              </SelectItem>
            </div>
          ))}
        </SelectContent>
      </Select>

      <h2 className="my-1 mt-8">Select Background</h2>
      <div className="grid grid-cols-3 gap-3">
        {formBackgroundThemes.map((item, index) => (
          <div
            key={index}
            onClick={(value) => {
              selectedBg(item.linearGradient);
              handleFormUpdate(item.linearGradient, "background");
            }}
            className="w-full h-[70px] rounded-lg hover:border-black hover:border cursor-pointer flex items-center justify-center"
            style={{ background: item.linearGradient }}
          >
            {index == 0 && "None"}
          </div>
        ))}
      </div>
    </div>
  );
}
