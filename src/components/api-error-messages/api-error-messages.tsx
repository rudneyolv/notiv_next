/** @format */

import { Text } from "../text/text";

export function ApiErrorMessages({ messages }: { messages: string[] }) {
  if (!messages?.length) {
    return <Text>Não há erros a serem exibidos</Text>;
  }

  return (
    <div className="flex flex-col gap-0">
      {messages.map((message, index) => (
        <Text className="text-destructive" key={`${index}-${message}`}>
          {message}
        </Text>
      ))}
    </div>
  );
}
