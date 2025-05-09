import Image from "next/image";
import { PostImageContainerStyles, PostImageStyles } from "./PostImage-Styles";
import { PostImageProps } from "@/interfaces/posts/post-interface";

export const PostImage = ({ src, alt, priority }: PostImageProps) => {
  return (
    <div className={PostImageContainerStyles()}>
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={720}
        className={PostImageStyles()}
        priority={priority}
      />
    </div>
  );
};
