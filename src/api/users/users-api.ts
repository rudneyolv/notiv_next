/** @format */
"use server";

import { apiRequest } from "@/lib/api/api-request";
import { ApiError } from "@/schemas/api/api-error-schema";
import { UpdateProfileDto } from "@/schemas/users/update-profile-schema";
import { User } from "@/types/users-types";

export const getCurrentUser = async (): Promise<User | ApiError> => {
  return apiRequest({
    endpoint: "/users/me",
    requestConfig: {
      method: "GET",
    },
    fallbackMessage: "Erro ao buscar o seu perfil",
  });
};

export const updateProfile = async (
  updateProfileDto: UpdateProfileDto
): Promise<User | ApiError> => {
  return apiRequest({
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
};
