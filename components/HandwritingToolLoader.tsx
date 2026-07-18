import { HandwritingTool } from "./HandwritingTool";
import type { ToolProfile } from "@/lib/tool-profiles";

export function HandwritingToolLoader({ profile = "default" }: { profile?: ToolProfile }) {
  return (
    <div id="tool">
      <HandwritingTool profile={profile} />
    </div>
  );
}
