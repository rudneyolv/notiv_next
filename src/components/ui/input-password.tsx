/** @format */

"use client";

import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cva } from "class-variance-authority";

const ButtonStyles = cva(`
  text-muted-foreground/80 hover:text-foreground transition-[color,box-shadow]
  outline-none focus:z-10 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
  absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md
  disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50
`);

type InputWithoutType = Omit<React.ComponentProps<"input">, "type">;

export default function InputPassword({ className, ...props }: InputWithoutType) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  return (
    <div className="relative">
      <Input className={className} type={isVisible ? "text" : "password"} {...props} />

      <button
        className={ButtonStyles()}
        type="button"
        onClick={toggleVisibility}
        aria-label={isVisible ? "Esconder senha" : "Mostrar senha"}
        aria-pressed={isVisible}
        aria-controls="password"
      >
        {isVisible ? (
          <EyeOffIcon size={16} aria-hidden="true" />
        ) : (
          <EyeIcon size={16} aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
