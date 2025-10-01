/** @format */

"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export function RetryButton() {
  const { pending } = useFormStatus();

  return (
    <Button variant="outline" type="submit" isLoading={pending} aria-disabled={pending}>
      Tentar novamente
    </Button>
  );
}
