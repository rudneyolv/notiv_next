/** @format */

import { decryptPayload, encryptPayload } from "./tags-encryption";

export const tagsEncryptionUtils = {
  encrypt: encryptPayload,
  decrypt: decryptPayload,
};
