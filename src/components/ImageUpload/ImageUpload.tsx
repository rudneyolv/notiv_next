/** @format */
"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Text } from "../Text/Text";
import { Button } from "../ui/button";
import {
  CloseButton,
  ImageUploadStyles,
  PreviewContainer,
  PreviewImage,
  PreviewText,
} from "./ImageUpload-Styles";
import { X } from "lucide-react";

enum UploadStatus {
  Idle = "idle",
  Hover = "hover",
  Error = "error",
  Ready = "ready",
}

interface ImageUploadState {
  status?: UploadStatus;
  previewUrl?: string | null;
  message?: string;
}

interface ImageUploadProps {
  onChange: (file: File | null) => void;
  maxSizeInKb?: number;
  value: File | null;
}

const getMessages = (maxSizeInKb: number) => ({
  Idle: `Envie a imagem do seu post (Max: ${maxSizeInKb} KB)`,
  Error: {
    MaxSizeExceed: `A imagem enviada ultrapassa o limite de ${maxSizeInKb} KB.`,
    InvalidType: "Tipo de arquivo inválido. Por favor, envie uma imagem",
  },
});

export function ImageUpload({ onChange, value, maxSizeInKb = 900 }: ImageUploadProps) {
  // maxSizeInKb transformado em bytes
  const IMAGE_UPLOAD_MAX_SIZE = maxSizeInKb * 1024;

  // Refs utilizados no componente
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const previousUrlRef = useRef<string | null>(null);

  // Mensagens utilizadas no status do imageState
  const Messages = useMemo(() => getMessages(maxSizeInKb), [maxSizeInKb]);

  // Estado geral do upload
  const [imageState, setImageState] = useState<ImageUploadState>({
    status: UploadStatus.Idle,
    message: Messages.Idle,
    previewUrl: null,
  });

  // Atualiza status do upload
  const updateStatus = useCallback((status: UploadStatus) => {
    setImageState((prev) => ({ ...prev, status }));
  }, []);

  // Atualiza mensagem exibida
  const updateMessage = useCallback((message: string) => {
    setImageState((prev) => ({ ...prev, message }));
  }, []);

  // Valida e processa arquivo selecionado
  const processFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) {
        updateStatus(UploadStatus.Error);
        updateMessage(Messages.Error.InvalidType);
        onChange(null);
        return;
      }

      if (file.size > IMAGE_UPLOAD_MAX_SIZE) {
        updateStatus(UploadStatus.Error);
        updateMessage(Messages.Error.MaxSizeExceed);
        onChange(null);
        return;
      }

      onChange(file);
    },
    [onChange, updateStatus, updateMessage, IMAGE_UPLOAD_MAX_SIZE, Messages.Error]
  );

  // Dispara o seletor de arquivos
  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  // Lida com mudança do input file
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processFile(file);
      if (e.target) {
        e.target.value = "";
      }
    },
    [processFile]
  );

  // Lida com drop de arquivo via drag and drop
  const handleAddImage = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  // Remove imagem atual
  const handleRemoveImage = useCallback(() => {
    onChange(null);
  }, [onChange]);

  // Atualiza o estado do componente com base no value recebido
  useEffect(() => {
    if (previousUrlRef.current) {
      URL.revokeObjectURL(previousUrlRef.current);
    }

    if (value) {
      const previewUrl = URL.createObjectURL(value);
      previousUrlRef.current = previewUrl;

      setImageState({
        status: UploadStatus.Ready,
        previewUrl: previewUrl,
        message: value.name,
      });
    } else {
      setImageState({
        status: UploadStatus.Idle,
        previewUrl: null,
        message: Messages.Idle,
      });
    }

    return () => {
      if (previousUrlRef.current) {
        URL.revokeObjectURL(previousUrlRef.current);
        previousUrlRef.current = null;
      }
    };
  }, [value, Messages]);

  return (
    // Container principal do dropzone com handlers de drag & drop e status visual
    <div
      onDrop={handleAddImage}
      onDragOver={(e) => e.preventDefault()} // Necessário pra permitir drop
      onDragEnter={() => updateStatus(value ? UploadStatus.Ready : UploadStatus.Hover)}
      onDragLeave={() => {
        if (value) {
          updateStatus(UploadStatus.Ready);
        } else {
          updateStatus(UploadStatus.Idle);
        }
      }}
      data-status={imageState.status}
      className={ImageUploadStyles()}
    >
      {/* Input file escondido que abre seletor ao clicar no botão */}
      <input
        name="file"
        type="file"
        className="hidden"
        accept="image/*"
        aria-label="Adicionar imagem"
        ref={fileInputRef}
        onChange={handleInputChange}
      />

      {/* Container de preview */}
      <div className={PreviewContainer()}>
        {/* Preview da imagem + botão de remover */}
        {imageState.previewUrl && (
          <>
            <Image
              src={imageState.previewUrl}
              alt={value?.name ?? "Imagem enviada"}
              width={200}
              height={100}
              className={PreviewImage()}
            />

            <button
              className={CloseButton()}
              aria-label="Remover imagem"
              onClick={handleRemoveImage}
              type="button"
            >
              <X />
            </button>
          </>
        )}

        {/* Mensagem dinâmica exibida para o usuário */}
        <Text className={PreviewText()} aria-live="polite">
          {imageState.message}
        </Text>

        {/* Botão para adicionar imagem, mostrado só se não há preview */}
        {!imageState.previewUrl && (
          <Button type="button" variant="outline" onClick={handleClick}>
            Adicionar Imagem
          </Button>
        )}
      </div>
    </div>
  );
}
