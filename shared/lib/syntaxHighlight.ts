import { codeToHtml } from "shiki";

/**
 * Highlights code using Shiki at build time.
 *
 * @param code - The code to highlight
 * @param lang - Programming language (default: "typescript")
 * @returns Pre-rendered highlighted HTML
 *
 * @example
 * const html = await highlightCode('const x = 1;', 'typescript');
 */
export async function highlightCode(
  code: string,
  lang: string = "typescript"
): Promise<string> {
  try {
    const html = await codeToHtml(code, {
      lang,
      theme: "github-dark",
      structure: "inline",
    });
    return html;
  } catch (error) {
    console.error(`Failed to highlight code: ${error}`);
    // Fallback: return plain code wrapped in <pre><code>
    return `<pre><code class="language-${lang}">${escapeHtml(
      code
    )}</code></pre>`;
  }
}

/**
 * Escapes HTML special characters.
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
