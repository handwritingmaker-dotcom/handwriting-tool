import { ActionForm } from "@/components/admin/ActionForm";
import { saveToolAction } from "@/app/admin/actions";
import { csrfToken } from "@/lib/cms/admin-data";
import { query } from "@/lib/cms/db";
import { requireUser } from "@/lib/cms/auth";

const builtIn = [
  ["tools/handwriting-worksheet-generator", "Worksheet Generator"],
  ["cursive-text-generator", "Cursive Text Generator"],
  ["sentence-scramble-generator", "Sentence Scramble Generator"],
  ["word-search-maker", "Word Search Maker"],
  ["signature-generator", "Signature Generator"],
  ["word-scramble-generator", "Word Scramble Generator"],
  ["assignment-maker", "Assignment Maker"],
  ["invitation-maker", "Invitation Maker"],
] as const;

type Tool = { slug:string; display_name:string; intro:string; description:string; instructions:string[]; features:string[]; faqs:string[]; related_tools:string[]; card_description:string; seo_title:string; meta_description:string; featured:boolean; published:boolean; noindex:boolean };

export default async function ToolsAdminPage({searchParams}:{searchParams:Promise<{slug?:string}>}) {
  await requireUser("EDITOR");
  const chosen=(await searchParams).slug||builtIn[0][0];
  const existing=(await query<Tool>(`SELECT * FROM cms_tools WHERE slug=$1`,[chosen]))[0];
  const fallbackName=builtIn.find(([slug])=>slug===chosen)?.[1]||chosen;
  const tool=existing||{slug:chosen,display_name:fallbackName,intro:"",description:"",instructions:[],features:[],faqs:[],related_tools:[],card_description:"",seo_title:"",meta_description:"",featured:false,published:true,noindex:false};
  const csrf=await csrfToken();
  return <div className="space-y-6"><header><h1 className="text-3xl font-bold">Tool content</h1><p className="mt-2 text-slate-600">Edit safe explanatory and SEO content. The tool controls and export logic remain code-protected.</p></header><div className="grid gap-6 xl:grid-cols-[250px,1fr]"><nav className="rounded-2xl border bg-white p-3">{builtIn.map(([slug,name])=><a key={slug} href={`/admin/tools?slug=${encodeURIComponent(slug)}`} className={`block rounded-lg px-3 py-2 text-sm font-semibold ${slug===chosen?"bg-blue-50 text-blue-700":"hover:bg-slate-50"}`}>{name}</a>)}</nav><ActionForm action={saveToolAction} className="grid gap-5 rounded-2xl border bg-white p-6"><input type="hidden" name="csrf" value={csrf}/><input type="hidden" name="slug" value={tool.slug}/><Field label="Display name" name="displayName" value={tool.display_name}/><Field label="Short introduction" name="intro" value={tool.intro}/><Area label="Full description" name="description" value={tool.description}/><Field label="Tool card description" name="cardDescription" value={tool.card_description}/><Area label="Instructions (one per line)" name="instructions" value={tool.instructions.join("\n")}/><Area label="Features (one per line)" name="features" value={tool.features.join("\n")}/><Area label="FAQs (one question/answer line)" name="faqs" value={tool.faqs.join("\n")}/><Area label="Related tool slugs (one per line)" name="relatedTools" value={tool.related_tools.join("\n")}/><Field label="SEO title" name="seoTitle" value={tool.seo_title}/><Area label="Meta description" name="metaDescription" value={tool.meta_description}/><div className="flex flex-wrap gap-5"><Check name="featured" label="Featured" checked={tool.featured}/><Check name="published" label="Published" checked={tool.published}/><Check name="noindex" label="Noindex" checked={tool.noindex}/></div><button className="w-fit rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white">Save tool content</button></ActionForm></div></div>;
}
function Field({label,name,value}:{label:string;name:string;value:string}){return <label className="grid gap-2 text-sm font-semibold">{label}<input name={name} defaultValue={value} className="rounded-xl border px-3 py-2.5 font-normal"/></label>}
function Area({label,name,value}:{label:string;name:string;value:string}){return <label className="grid gap-2 text-sm font-semibold">{label}<textarea name={name} defaultValue={value} rows={4} className="rounded-xl border px-3 py-2.5 font-normal"/></label>}
function Check({name,label,checked}:{name:string;label:string;checked:boolean}){return <label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" name={name} defaultChecked={checked}/>{label}</label>}
