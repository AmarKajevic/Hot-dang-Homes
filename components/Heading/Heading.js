import React from "react";
import { getFontSizeForHeading, getTextAlign } from "utlis/fonts";

export const Heading = ({textAlign, content, level = 2 }) => {
    const tag = React.createElement(`h${level}`, {
        dangerouslySetInnerHTML: {__html: content},
        className: `font-heading max-w-5xl mx-auto my-5 ${getFontSizeForHeading(level)}
         ${getTextAlign(textAlign)}}`
    });

    return tag;
}
