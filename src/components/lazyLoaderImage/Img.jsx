 import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Img = ({ src, className, height, width, alt }) => {
    return (
        <LazyLoadImage
            className={className || ""}
            alt={alt}
            effect="blur"
            src={src}
            height={height}
            width={width}
        />
    );
};

export default Img;
