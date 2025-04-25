import { BlockRenderer } from "components/BlockRenderer"
import { MainMenu } from "components/MainMenu/MainMenu"
import Head from "next/head";

export const Page = (props) =>{
    return(
    <div>
        <MainMenu items= {props.mainMenuItems} 
        callToActionDestination = {props.callToActionDestination}
        callToActionLabel={props.callToActionLabel}/>
        <BlockRenderer blocks={props.blocks}/>
        <Head>
          <title>{props.seo.title}</title>
          <meta name="description" content={props.seo.metaDesc}/>
        </Head>
      </div>
    );
};