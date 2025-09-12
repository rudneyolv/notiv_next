/** @format */
"use server";

import { apiRequest } from "@/lib/api/api-request";
import { UpdateProfileDto } from "@/schemas/users/update-profile-schema";
import { User } from "@/types/users-types";

export const getCurrentUser = async () => {
  const result: User = await apiRequest({
    endpoint: "/users/me",
    requestConfig: {
      method: "GET",
    },
    fallbackMessage: "Erro ao buscar o seu perfil",
  });

  return result;
};

export const updateProfile = async (updateProfileDto: UpdateProfileDto) => {
  const result: User = await apiRequest({
    endpoint: "/users/me",
    requestConfig: {
      method: "PATCH",
      body: JSON.stringify(updateProfileDto),
      headers: {
        "Content-Type": "application/json",
      },
    },
    fallbackMessage: "Erro ao editar perfil",
  });

  return result;
};
