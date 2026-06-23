import{c as V,i as C}from"./index-Coa1rWGZ.js";import{c as X}from"./client-DzL0ZR3D.js";import{u as Y}from"./ai-config-D0f8_5Vf.js";import{e as W}from"./import-adapter-C0PyFhFU.js";/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pt=V("CircleStop",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["rect",{x:"9",y:"9",width:"6",height:"6",rx:"1",key:"1ssd4o"}]]),Q=3e4,Z=500,A=/^[\s　]*第\s*[一二三四五六七八九十百千万零〇两\d０-９]+\s*[章回节卷部篇][\s　\S]{0,30}$/gm;function tt(t,e={}){const n=Math.max(5e3,e.targetChars??Q),o=Math.max(0,Math.min(2e3,e.overlapChars??Z));if(!t||t.length===0)return[];if(t.length<=n)return[{index:0,startChar:0,endChar:t.length,charCount:t.length,label:"全文",text:t}];const s=nt(t);if(s.length>=2)return et(t,s,n);const i=at(t,n);return i.length>=2?i:ot(t,n,o)}function nt(t){const e=[];A.lastIndex=0;let n;for(;(n=A.exec(t))!==null;)e.push({start:n.index,title:n[0].trim()}),n.index===A.lastIndex&&A.lastIndex++;return e}function et(t,e,n){const o=e.map((f,y)=>({start:f.start,end:y+1<e.length?e[y+1].start:t.length,title:f.title})),s=e[0].start>0?t.slice(0,e[0].start).trim():"",i=[];let l=s?0:o[0].start,g=l,h=s?["（前言）"]:[];const u=()=>{if(g<=l)return;const f=t.slice(l,g);i.push({index:i.length,startChar:l,endChar:g,charCount:f.length,label:h.length>3?`${h[0]} … ${h[h.length-1]}（共 ${h.length} 节）`:h.join(" · "),text:f}),l=g,h=[]};for(const f of o)f.end-l>n&&g>l&&u(),g=f.end,h.push(f.title.slice(0,24)),g-l>=n&&u();return u(),i}function at(t,e){const n=t.split(/\n{2,}/),o=[];let s=0,i=0,l=0;const g=(h,u)=>{if(u<=h)return;const f=t.slice(h,u);o.push({index:o.length,startChar:h,endChar:u,charCount:f.length,label:`段落 ${o.length+1}`,text:f})};for(const h of n){const u=h.length+2;i+u>e&&i>0&&(g(s,l),s=l,i=0),l+=u,i+=u}return g(s,t.length),o}function ot(t,e,n){const o=[];let s=0;for(;s<t.length;){const i=Math.min(s+e,t.length),l=t.slice(s,i);if(o.push({index:o.length,startChar:s,endChar:i,charCount:l.length,label:`区段 ${o.length+1}`,text:l}),i>=t.length)break;s=i-n}return o}function st(t){let e=3735928559,n=1103547991;for(let s=0;s<t.length;s++){const i=t.charCodeAt(s);e=Math.imul(e^i,2654435761),n=Math.imul(n^i,1597334677)}e=Math.imul(e^e>>>16,2246822507)^Math.imul(n^n>>>13,3266489909),n=Math.imul(n^n>>>16,2246822507)^Math.imul(e^e>>>13,3266489909);const o=s=>(s>>>0).toString(16).padStart(8,"0");return o(n)+o(e)+"-"+t.length.toString(36)}const J={quick:{targetChars:4e4,maxTokens:4096},deep:{targetChars:15e3,maxTokens:8192}},b=3,rt=1500;let $=null,E={value:!1},a={};function yt(t){a=t||{}}function mt(){var t;E.value=!0,$==null||$.abort(),(t=a.onActivity)==null||t.call(a,"warn","✕ 用户取消分析")}const K={};function Ct(t,e){K[t]=e}async function wt(t,e){await C.referenceChunkAnalysis.where("referenceId").equals(t).delete();const n=e||{},o=Object.values(n).some(s=>typeof s=="string"&&s.trim());if(o){const s={referenceId:t,chunkIndex:0,label:"全书",narrativeStyle:r(n.narrativeStyle),openingTechnique:r(n.openingTechnique),plotStructure:r(n.plotStructure),pacingControl:r(n.pacingControl),climaxDesign:r(n.climaxDesign),conflictEscalation:r(n.conflictEscalation),characterCraft:r(n.characterCraft),dialogueTechnique:r(n.dialogueTechnique),proseStyle:r(n.proseStyle),emotionalBeats:r(n.emotionalBeats),foreshadowing:r(n.foreshadowing),worldBuilding:r(n.worldBuilding),otherTechniques:r(n.otherTechniques),createdAt:Date.now()};await C.referenceChunkAnalysis.add(s)}await m(t,{analysisDepth:"quick",analysisStatus:o?"done":"failed",analysisProgress:100,analysisError:o?void 0:"解析未产出写作技法,无法生成浅层分析"})}async function $t(t){var f,y,k,x,q,D,P,M,B,R,L,O,_,j,H,N,z;const e=await C.references.get(t);if(!e){(f=a.onActivity)==null||f.call(a,"error",`参考 #${t} 不存在`),(y=a.onDone)==null||y.call(a,t,!1);return}const n=K[t];if(!n||n.length===0){await m(t,{analysisStatus:"failed",analysisError:"找不到分块原文（可能页面刷新过，请重新上传文件）"}),(k=a.onActivity)==null||k.call(a,"error","找不到分块原文，需要重新上传"),(x=a.onDone)==null||x.call(a,t,!1);return}const o=e.analysisDepth||"quick";$=new AbortController,E={value:!1},await m(t,{analysisStatus:"analyzing",analysisProgress:0,analysisError:void 0}),(q=a.onActivity)==null||q.call(a,"info",`▶ 开始分析「${e.title}」共 ${n.length} 块（${o}）`);const s=await C.referenceChunkAnalysis.where("referenceId").equals(t).toArray(),i=new Set(s.map(d=>d.chunkIndex));let l="";const g=J[o];let h=i.size;const u=n.length;try{for(const p of n){if(E.value){(D=a.onActivity)==null||D.call(a,"warn","⏸ 分析已中止"),await m(t,{analysisStatus:"failed",analysisError:"用户取消"}),(P=a.onDone)==null||P.call(a,t,!1);return}if(i.has(p.index))continue;let F=!1,v="";for(let S=0;S<b&&!E.value;S++){(M=a.onActivity)==null||M.call(a,"info",`▶ 块 ${p.index+1}/${u} 分析中（第 ${S+1} 次）`);try{const c=await it({ref:e,depth:o,chunk:p,totalChunks:u,knownContext:l,maxTokens:g.maxTokens,signal:$.signal}),G={referenceId:t,chunkIndex:p.index,label:p.label,startOffset:p.startChar,endOffset:p.endChar,narrativeStyle:r(c.narrativeStyle),openingTechnique:r(c.openingTechnique),plotStructure:r(c.plotStructure),pacingControl:r(c.pacingControl),climaxDesign:r(c.climaxDesign),conflictEscalation:r(c.conflictEscalation),characterCraft:r(c.characterCraft),dialogueTechnique:r(c.dialogueTechnique),proseStyle:r(c.proseStyle),emotionalBeats:r(c.emotionalBeats),foreshadowing:r(c.foreshadowing),worldBuilding:r(c.worldBuilding),otherTechniques:r(c.otherTechniques),historicalContext:r(c.historicalContext),socialInstitutions:r(c.socialInstitutions),dailyLife:r(c.dailyLife),materialCulture:r(c.materialCulture),languageCustoms:r(c.languageCustoms),rawExcerpt:r(c.rawExcerpt),createdAt:Date.now()};await C.referenceChunkAnalysis.add(G),h++;const I=Math.min(100,Math.round(h/u*100));await m(t,{analysisProgress:I}),(B=a.onProgress)==null||B.call(a,I,`块 ${p.index+1} 完成`),(R=a.onActivity)==null||R.call(a,"success",`✓ 块 ${p.index+1} 完成`),l=lt(l,G),F=!0;break}catch(c){if(c.name==="AbortError")return;v=c instanceof Error?c.message:String(c),(L=a.onActivity)==null||L.call(a,"warn",`块 ${p.index+1} 第 ${S+1} 次失败：${v.slice(0,80)}`),S<b-1&&await ut(rt)}}F||(O=a.onActivity)==null||O.call(a,"error",`✗ 块 ${p.index+1} 重试 ${b} 次仍失败：${v.slice(0,80)}`)}const d=await C.referenceChunkAnalysis.where("referenceId").equals(t).toArray(),w=u>0?d.length/u:0,T=w>0?"done":"failed",U=w<1?`共 ${u} 块，成功 ${d.length}，失败 ${u-d.length}`:void 0;await m(t,{analysisStatus:T,analysisProgress:Math.round(w*100),analysisError:U}),(_=a.onActivity)==null||_.call(a,T==="done"?"success":"warn",`分析结束：${d.length} / ${u} 块已入库`),(j=a.onDone)==null||j.call(a,t,T==="done")}catch(d){const w=d instanceof Error?d.message:String(d);d.name==="AbortError"?((H=a.onActivity)==null||H.call(a,"warn","已中止"),await m(t,{analysisStatus:"failed",analysisError:"用户取消"})):(await m(t,{analysisStatus:"failed",analysisError:w}),(N=a.onActivity)==null||N.call(a,"error",`分析异常：${w}`)),(z=a.onDone)==null||z.call(a,t,!1)}finally{$=null}}async function it(t){const{ref:e,depth:n,chunk:o,totalChunks:s,knownContext:i}=t,l=n==="deep"?"【深层·拆成模板】请逐维度详尽论述（每维 300-500 字），并引用原文片段佐证。":"【浅层·快速摸底】请快速提炼，每维 50-100 字抓核心套路，不必引用原文。",u=[{role:"system",content:e.type==="historical"?`你是一位极其严谨、精通全球物质文化史、社会制度史和文学创作的历史学家与小说考证顾问。你正在逐块分析一部【历史考证资料/文献】，提炼其中可用于小说创作的时代细节与方法论。

**资料信息**：
- 标题：${e.title}
- 作者：${e.author||"未知"}
- 类型：历史考证资料 / 文献

**当前进度**：第 ${o.index+1}/${s} 块（${o.label||""}，约 ${o.charCount} 字）

${i?`**前文已识别的关键信息**：
${i}
`:""}

**分析要求**：
${l}

请从以下 18 个维度分析本块文本（前 13 个为文学创作维度，后 5 个为历史考证维度），输出**纯 JSON**（不要 markdown 包裹）：

{
  "narrativeStyle": "叙事视角与手法 —— 叙事视角、时间线安排、POV 切换（若为纯史料，分析其史料叙述视角与可信度）",
  "openingTechnique": "开篇技法 / 黄金三章 —— 本块的场景切入方式、信息引入节奏",
  "plotStructure": "情节结构与套路 —— 本块所记录历史事件的起承转合、因果布局",
  "pacingControl": "节奏控制 —— 张弛有度的处理、信息释放速率",
  "climaxDesign": "高潮设计 —— 历史事件的高潮/转折点的铺垫与呈现",
  "conflictEscalation": "冲突设计与升级 —— 历史事件中外在冲突（政治/战争/阶级）与内在冲突（心理/道德）、冲突升级节奏",
  "characterCraft": "人物塑造 —— 历史人物的多维刻画、关系动态、性格特征提炼",
  "dialogueTechnique": "对话技巧 —— 历史人物的言论/对话风格、潜台词",
  "proseStyle": "文笔风格 —— 史料的修辞、叙述密度、氛围营造",
  "emotionalBeats": "爽点 / 情绪节拍 —— 历史叙述中的情绪张力与读者代入",
  "foreshadowing": "伏笔与回收 —— 历史事件的因果链条、前兆与后续影响、历史悬念",
  "worldBuilding": "世界观构建 —— 历史设定如何融入叙事、细节沉浸感、文化/政治/经济体系暗示",
  "otherTechniques": "其他值得学习的技巧 —— 上述未覆盖的史料写作手法",

  "historicalContext": "历史背景与时代特征 —— 提炼本块中体现的时代大势、历史转折点、政治气候、重大历史事件的真实背景",
  "socialInstitutions": "社会制度与等级 —— 提炼本块中体现的官制、科举、法律、阶层划分、社会流动性、行会/组织运作机制",
  "dailyLife": "日常生活细节 —— 提炼本块中体现的衣食住行、岁时节日、娱乐消遣、民间信仰、日常消费水平",
  "materialCulture": "物质文化（器物/科技） —— 提炼本块中体现的器物、工具、建筑、科技水平、生产工艺、武器装备细节",
  "languageCustoms": "语言习惯与称谓 —— 提炼本块中体现的时代特色词汇、避讳、人际称谓、书面/口语风格、行话",
  
  "rawExcerpt": "（选取本块中最具历史质感或写作技巧的精彩片段，约100-200字原文引用）"
}

**注意**：
- 如果某个维度在本块中无明显体现，写"本块未涉及"即可
- 重点提炼真实、地道、能直接丰富小说细节的历史考证内容，而非简单复述情节
- 分析应当具体、可操作，让作者能直接作为写作素材使用`:`你是一位资深文学评论家和网文创作方法论研究者。你正在逐块分析一部小说，从 13 个维度提炼创作方法论。

**作品信息**：
- 标题：${e.title}
- 作者：${e.author||"未知"}
- 流派：${e.genre||"未知"}

**当前进度**：第 ${o.index+1}/${s} 块（${o.label||""}，约 ${o.charCount} 字）

${i?`**前文已识别的关键信息**：
${i}
`:""}

**分析要求**：
${l}

请从以下 13 个维度分析本块文本，输出**纯 JSON**（不要 markdown 包裹）：

{
  "narrativeStyle": "叙事视角与手法 —— 第几人称、全知/限知、时间线安排、POV 切换、叙事距离调控",
  "openingTechnique": "开篇技法 / 黄金三章 —— 若为开头：钩子设计、角色引入、世界展示节奏、信息密度；否则：本块的段落/场景切入技巧",
  "plotStructure": "情节结构与套路 —— 起承转合、伏笔回收布局、悬念设置、情节推进的动力机制",
  "pacingControl": "节奏控制 —— 快慢交替、张弛有度、信息释放速率、章末钩子",
  "climaxDesign": "高潮设计 —— 爽点/高潮的铺垫与引爆、情绪峰值的制造",
  "conflictEscalation": "冲突设计与升级 —— 外在冲突（人vs人/环境/势力）与内在冲突（心理/道德）、冲突升级节奏、压力曲线",
  "characterCraft": "人物塑造 —— 多维刻画（行为/对话/内心/他人视角）、弧线推进、标签化与去标签化、关系动态",
  "dialogueTechnique": "对话技巧 —— 对话的个性化与功能性（推动情节/揭示人物/传递信息）、潜台词、节奏",
  "proseStyle": "文笔风格 —— 修辞手法、句式变化、叙述密度、语言特色、氛围营造",
  "emotionalBeats": "爽点 / 情绪节拍 —— 情绪起伏的设计、读者代入与情绪出口、节拍布置",
  "foreshadowing": "伏笔与回收 —— 本块埋设的伏笔、回收的前文伏笔、悬念管理、读者预期的建立与打破",
  "worldBuilding": "世界观构建 —— 设定如何融入叙事（而非 info-dump）、规则展示时机、细节沉浸感、文化/政治/经济体系暗示",
  "otherTechniques": "其他值得学习的技巧 —— 上述未覆盖但有特色的写作手法",
  "rawExcerpt": "（选取本块中最能体现写作技巧的精彩片段，约100-200字原文引用）"
}

**注意**：
- 如果某个维度在本块中无明显体现，写"本块未涉及"即可
- 重点分析有特色、值得学习的写作手法，而非简单复述情节
- 分析应当具体、可操作，让读者能学以致用`},{role:"user",content:`请分析以下文本：

${o.text}`}],y={...Y.getState().config,maxTokens:t.maxTokens};if(!y.apiKey)throw new Error("未配置 AI API Key（请先到「系统设置 → AI 配置」填写）");const k=await ct(u,y,t.signal,{category:"reference.analysis",projectId:t.ref.projectId});return W(k)||{}}async function ct(t,e,n,o){if(n!=null&&n.aborted){const s=new Error("aborted");throw s.name="AbortError",s}return await X(t,e,o,n)}function lt(t,e){const n=[];e.plotStructure&&n.push(`情节：${e.plotStructure.slice(0,120)}`),e.foreshadowing&&n.push(`伏笔：${e.foreshadowing.slice(0,120)}`),e.characterCraft&&n.push(`角色：${e.characterCraft.slice(0,100)}`),e.conflictEscalation&&n.push(`冲突：${e.conflictEscalation.slice(0,100)}`);const o=n.join(`
`),s=t?`${t}
---
${o}`:o;return s.length>1500?s.slice(-1500):s}async function m(t,e){await C.references.update(t,{...e,updatedAt:Date.now()})}function r(t){return typeof t!="string"?void 0:t.trim()||void 0}function ut(t){return new Promise(e=>setTimeout(e,t))}function St(t,e){const n=J[e];return{chunks:tt(t,{targetChars:n.targetChars}),totalChars:t.length,fileHash:st(t),depth:e}}export{pt as C,$t as a,tt as b,mt as c,St as p,st as q,Ct as r,yt as s,wt as w};
