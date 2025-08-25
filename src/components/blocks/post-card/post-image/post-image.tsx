/** @format */

import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { PostImageContainerStyles, PostImageStyles } from "./post-image-styles";

interface PostImageProps {
  src: string;
  alt: string;
  priority?: boolean;
}

export const PostImage = ({ src, alt, priority }: PostImageProps) => {
  return (
    <div className={PostImageContainerStyles()}>
      <AspectRatio ratio={3 / 2}>
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={720}
          className={PostImageStyles()}
          priority={priority}
        />
      </AspectRatio>
    </div>
  );
};
