import{c as i}from"./client-DzL0ZR3D.js";function u(s){const c=s.trim(),e=c.match(/```(?:json)?\s*([\s\S]*?)```/);let t=e?e[1].trim():c;const r=t.indexOf("["),a=t.lastIndexOf("]"),n=t.indexOf("{"),o=t.lastIndexOf("}");r>=0&&a>r&&(n<0||r<n)?t=t.slice(r,a+1):n>=0&&o>n&&(t=t.slice(n,o+1));try{return JSON.parse(t)}catch{return null}}async function m(s,c,e){if(!e.apiKey||!s.trim())return null;const t=[{role:"system",content:`你是一个文本结构化助手。把用户提供的内容**完整无损**地整理成符合要求的 JSON。
${c}
要求：
- 只输出 JSON 本身，不要 markdown 代码块，不要任何解释文字
- 完整保留原文的所有条目和信息，不要遗漏、不要合并、不要自行增删内容
- 字段名严格按要求，缺失的可选字段留空字符串或空数组`},{role:"user",content:s}];try{const r=await i(t,e,{category:"ai.restructure"});return u(r)}catch{return null}}export{m as a};
