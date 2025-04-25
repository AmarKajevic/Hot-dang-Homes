import { getTextAlign } from "utlis/fonts";
import { relativeToAbsoluteUrls } from "utlis/relativeToAbsoluteUrls";

export const Paragraph = ({textAlign ="left", content, textColor}) => {
    return <p 
    className={`max-w-5xl mx-auto ${getTextAlign(textAlign)}` }
    style ={{color:textColor}}
    dangerouslySetInnerHTML={{__html: relativeToAbsoluteUrls(content) }}/>;
};