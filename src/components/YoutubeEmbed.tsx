import React from "react";
import { AspectRatio } from "./ui/aspect-ratio";

type Props = {
  embedId: string;
  title: string;
};

function YoutubeEmbed({ embedId, title }: Props) {
  return (
    <AspectRatio ratio={16 / 9} className="video-responsive">
      <iframe
        width="853"
        height="480"
        src={`https://www.youtube.com/embed/${embedId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={title}
      />
    </AspectRatio>
  );
}

export default YoutubeEmbed;
