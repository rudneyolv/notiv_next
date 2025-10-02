/** @format */
"use server";

// /lib/crypto.ts
import { env } from "@/constants/env";
import { createCipheriv, createDecipheriv, createHash, randomBytes } from "crypto";

export interface RevalidateData {
  tag: string;
  path: string;
}

const secret = env.NEXT_REVALIDATION_SECRET;
const algorithm = "aes-256-gcm";
const ivLength = 16;

const key = createHash("sha256").update(secret).digest();

/**
 * Criptografa um objeto RevalidateData.
 * @param data O objeto { tag, path } a ser criptografado.
 * @returns Uma string criptografada, pronta para ser enviada ao cliente.
 */
export async function encryptPayload(data: RevalidateData): Promise<string> {
  // PONTO-CHAVE 2: Convertemos o objeto em uma string JSON antes de criptografar.
  const plaintext = JSON.stringify(data);

  const iv = randomBytes(ivLength);
  const cipher = createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();

  return `${iv.toString("hex")}:${authTag.toString("hex")}:${encrypted.toString("hex")}`;
}

/**
 * Descriptografa um payload para um objeto RevalidateData.
 * @param encryptedPayload A string criptografada recebida do cliente.
 * @returns O objeto RevalidateData original se a descriptografia for bem-sucedida, ou null se falhar.
 */
export async function decryptPayload(encryptedPayload: string): Promise<RevalidateData | null> {
  try {
    const parts = encryptedPayload.split(":");
    if (parts.length !== 3) return null;

    const [ivHex, authTagHex, encryptedHex] = parts;
    const iv = Buffer.from(ivHex, "hex");
    const authTag = Buffer.from(authTagHex, "hex");
    const encrypted = Buffer.from(encryptedHex, "hex");

    const decipher = createDecipheriv(algorithm, key, iv);
    decipher.setAuthTag(authTag);

    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);

    // Convertemos a string JSON de volta para um objeto.
    const decryptedData: RevalidateData = JSON.parse(decrypted.toString("utf8"));

    // Verificação extra de segurança para garantir que o objeto tem a forma esperada.
    if (typeof decryptedData.tag !== "string" || typeof decryptedData.path !== "string") {
      console.warn("Payload descriptografado não corresponde à estrutura esperada.");
      return null;
    }

    return decryptedData;
  } catch (error: unknown) {
    console.warn(
      "Falha ao descriptografar ou parsear o payload de revalidação.",
      error instanceof Error && error.message
    );
    return null;
  }
}
