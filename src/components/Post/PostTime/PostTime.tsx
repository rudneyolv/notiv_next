import { PostTimeStyles } from "./PostTime-Styles";

export const PostTime = () => {
  return (
    <time className={PostTimeStyles()} dateTime="2025-05-20">
      20/05/2025 22:22
    </time>
  );
};
