/** @format */
"use client";

import { UpdateProfileForm } from "@/components/forms/update-profile-form/update-profile-form";
import { useApiQueries } from "@/hooks/queries";
import { Loader2 } from "lucide-react";

export function UpdateProfile() {
  const { data: currentUser, isLoading } = useApiQueries.users.current.get();

  if (isLoading) return <Loader2 className="size-5 animate-spin" />;

  return <UpdateProfileForm userData={currentUser} />;
}
