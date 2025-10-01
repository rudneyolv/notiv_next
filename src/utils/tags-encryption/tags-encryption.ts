/** @format */
"use server";

// /lib/crypto.ts (pode ser o mesmo arquivo de antes, mas com estas funções)
import { env } from "@/constants/env";
import { createCipheriv, createDecipheriv, createHash, randomBytes } from "crypto";

const secret = env.NEXT_REVALIDATION_SECRET;
const algorithm = "aes-256-gcm";
const ivLength = 16;

// MELHORIA 1: Derivação de chave robusta com SHA-256.
// Isso transforma seu segredo de qualquer tamanho em uma chave de 32 bytes de forma segura.
const key = createHash("sha256").update(secret).digest();

/**
 * Criptografa uma tag.
 * @param tag A string a ser criptografada.
 * @returns Uma string que contém o IV e o texto cifrado, separados por ':'.
 */
export async function encryptTag(tag: string): Promise<string> {
  const iv = randomBytes(ivLength);
  const cipher = createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([cipher.update(tag, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag(); // GCM inclui uma tag de autenticação

  // Retorna tudo junto em um formato que podemos separar depois
  return `${iv.toString("hex")}:${authTag.toString("hex")}:${encrypted.toString("hex")}`;
}

/**
 * Descriptografa uma tag.
 * @param encryptedTag A string criptografada recebida do cliente.
 * @returns A tag original se a descriptografia for bem-sucedida, ou null se falhar.
 */
export async function decryptTag(encryptedTag: string): Promise<string | null> {
  try {
    const parts = encryptedTag.split(":");
    if (parts.length !== 3) return null;

    const [ivHex, authTagHex, encryptedHex] = parts;
    const iv = Buffer.from(ivHex, "hex");
    const authTag = Buffer.from(authTagHex, "hex");
    const encrypted = Buffer.from(encryptedHex, "hex");

    const decipher = createDecipheriv(algorithm, key, iv);
    decipher.setAuthTag(authTag);

    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return decrypted.toString("utf8");
  } catch (error) {
    // Se qualquer parte falhar (formato errado, chave errada, etc.), a descriptografia é inválida.
    console.warn("Falha ao descriptografar payload de revalidação:", error);
    return null;
  }
}
