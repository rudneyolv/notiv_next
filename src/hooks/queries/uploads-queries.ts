/** @format */

import { api } from "@/api";
import { ApiError } from "@/types/api-types";
import { useMutation } from "@tanstack/react-query";

const useUploadFile = () => {
  return useMutation<string, ApiError, FormData, void>({
    mutationFn: api.uploads.uploadFile,
  });
};

export const useUploads = {
  uploadFile: useUploadFile,
};
