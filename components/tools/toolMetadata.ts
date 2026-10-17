import type { Metadata } from "next";
import { editorSocialImage } from "@/lib/seo";
import { newTool, type NewToolSlug } from "@/lib/new-tools";

export function toolMetadata(slug: NewToolSlug): Metadata {
  const tool = newTool(slug); const path = `/${slug}`; const title = `${tool.name} Free Online | HandwritingTool`;
  return { title, description: tool.description, alternates: { canonical: path }, openGraph: { title, description: tool.description, url: path, type: "website", images: [editorSocialImage] }, twitter: { card: "summary_large_image", title, description: tool.description, images: [editorSocialImage.url] } };
}

export function toolSchema(slug: NewToolSlug) { const tool=newTool(slug),url=`https://www.handwritingtool.com/${slug}`; return [{"@context":"https://schema.org","@type":"WebApplication",name:tool.name,url,description:tool.description,applicationCategory:"UtilitiesApplication",operatingSystem:"Web",isAccessibleForFree:true},{"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:"https://www.handwritingtool.com"},{"@type":"ListItem",position:2,name:"Tools",item:"https://www.handwritingtool.com/tools"},{"@type":"ListItem",position:3,name:tool.name,item:url}]}] }
