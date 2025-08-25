/** @format */

import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export const formatDatetime = (rawDate: string): string => {
  const date = new Date(rawDate);

  return format(date, "dd/MM/yyyy 'às' HH'h'mm", {
    locale: ptBR,
  });
};

export const formatRelativeDateToNow = (rawDate: string): string => {
  const date = new Date(rawDate);

  return formatDistanceToNow(date, {
    locale: ptBR,
    addSuffix: true,
  });
};
