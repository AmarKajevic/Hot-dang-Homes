import { CallToActionButton } from "components/CallToActionButton/CallToActionButton";
import { Column } from "components/Column/Column";
import { Columns } from "components/Columns";
import { Cover } from "components/Cover";
import { FormspreeForm } from "components/FormspreeForm/FormspreeForm";
import { Gallery } from "components/Gallery/Gallery";
import { Heading } from "components/Heading";
import { Paragraph } from "components/Paragraph/Paragraph";
import { PropertyFeatures } from "components/PropertyFeatures";
import { PropertySearch } from "components/PropertySearch/PropertySearch";
import { TickItem } from "components/TickItem/TickItem";
import Image from "next/image";
import { theme } from "theme";

export const BlockRenderer = ({blocks}) =>{
    return blocks.map(block => {
        switch(block.name){
            case "acf/tick-item":{
                return <TickItem key={block.id}>
                    <BlockRenderer blocks={block.innerBlocks}/>
                </TickItem>
            }
            case "core/gallery": {
                return <Gallery key={block.id}
                    columns={block.attributes.columns || 3}
                    cropImages={block.attributes.imageCrop}
                    items={block.innerBlocks}
                />
            }
            case "acf/property-features": {
                return <PropertyFeatures 
                key={block.id} 
                price={block.attributes.price} 
                bathrooms={block.attributes.bathrooms}
                bedrooms={block.attributes.bedrooms}
                hasParking={block.attributes.has_parking}
                petFriendly={block.attributes.pet_friendly}
                />
            }
            case "acf/formspree-form":{
                return <FormspreeForm key={block.id} formId={block.attributes.data.form_id}/>
            }
            case "acf/cta-button":{
                return (
                <CallToActionButton 
                key={block.id}
                 buttonLabel={block.attributes.data.label}
                 destination ={block.attributes.data.destination || "/"}
                 align = {block.attributes.data.align}
                 />
                );
                
            }
            case "core/paragraph":{
                return <Paragraph key={block.id} 
                textAlign={block.attributes.textAlign} 
                textColor=
                {theme[block.attributes.textColor] ||
                     block.attributes.style?.color?.text}
                content={block.attributes.content}/>
            }
            case "core/post-title":
            case 'core/heading':    {
                return <Heading key={block.id}
                content={block.attributes.content} 
                level={block.attributes.level} 
                textAlign={block.attributes.textAlign} />
            }
            case "acf/property-search": {
                return <PropertySearch key={block.id} />
            }
            case 'core/cover' : {
                console.log("BLOCK", block);

                return ( 
                    <Cover key={block.id} background={block.attributes.url}>
                        <BlockRenderer blocks={block.innerBlocks}/>
                    </Cover>
                );
            }
            case "core/columns": {
                console.log("Columns: " , block.attributes)
                return  <Columns key={block.id} 
                isStackedOnMobile={block.attributes.isStackedOnMobile}
                textColor={
                    theme[block.attributes.textColor] ||
                     block.attributes.style?.color?.text}
                content={block.attributes.content
                }
                backgroundColor= {
                    theme[block.attributes.backgroundColor]  || block.attributes.style?.color?.background
                }
                >
                <BlockRenderer blocks={block.innerBlocks} />
                </Columns>
            }
            case "core/column": {
                
                return (<Column key={block.id} 
                width={block.attributes?.width || ''}
                textColor={
                    block.attributes?.textColor && theme[block.attributes.textColor]
                      ? theme[block.attributes.textColor]
                      : block.attributes?.style?.color?.text || ''
                  }
                  backgroundColor={
                    block.attributes?.backgroundColor && theme[block.attributes.backgroundColor]
                      ? theme[block.attributes.backgroundColor]
                      : block.attributes?.style?.color?.background || ''
                  }
                >
                    <BlockRenderer blocks={block.innerBlocks} />
                </Column>
                )
            }
            case "core/block":
            case "core/group":{
                return <BlockRenderer key={block.id} blocks={block.innerBlocks}/>
            }
            
            case "core/image": {
                return (
                    <Image 
                    key={block.id} 
                    src={block.attributes.url}  
                    height={block.attributes.height}
                    width={block.attributes.width}
                    alt={block.attributes.alt || ""}
                    />
                )
            }

            default: {
                console.log('UNKNOWN: ', block);
                return null;
            }
                
        }
});
}