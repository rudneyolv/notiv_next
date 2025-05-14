import { Text } from "../Text/Text";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-zinc-950 text-center p-8">
      <Text>{`Copyright © ${currentYear} - Notiv Project`}</Text>
    </div>
  );
};
