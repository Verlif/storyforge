import{h as f,i as d,q as p}from"./index-Coa1rWGZ.js";import{r as m}from"./prompt-engine-DdZ7u9gF.js";import{a as O}from"./restructure-DVslIoht.js";const u=()=>Date.now(),S=f((i,a)=>({detailedOutlines:[],loading:!1,loadAll:async e=>{i({loading:!0});const t=await d.detailedOutlines.where("projectId").equals(e).toArray();i({detailedOutlines:t,loading:!1})},getOrCreate:async(e,t)=>{const s=a().detailedOutlines.find(c=>c.outlineNodeId===t);if(s)return s;const n=await d.detailedOutlines.where("outlineNodeId").equals(t).first();if(n)return a().detailedOutlines.some(c=>c.id===n.id)||i({detailedOutlines:[...a().detailedOutlines,n]}),n;const o={projectId:e,outlineNodeId:t,scenes:[],createdAt:u(),updatedAt:u()},r=await d.detailedOutlines.add(o),l={...o,id:r};return i({detailedOutlines:[...a().detailedOutlines,l]}),l},save:async(e,t)=>{const s={...t,updatedAt:u()};await d.detailedOutlines.update(e,s),i({detailedOutlines:a().detailedOutlines.map(n=>n.id===e?{...n,...s}:n)})},remove:async e=>{await d.detailedOutlines.delete(e),i({detailedOutlines:a().detailedOutlines.filter(t=>t.id!==e)})}}));function y(i,a,e,t,s,n){const o=p.getState().getActive("detail.scene"),{messages:r}=m(o,{chapterTitle:i,chapterSummary:a,worldContext:e||"",characters:t||"",previousChapterEnding:"",userHint:n});return r}function I(i,a,e,t,s,n,o){const r=`你是一个小说细纲策划专家。根据章节大纲、前后章摘要和可用资源，为本章生成增强细纲信息。

输出严格 JSON，不要加 markdown 代码块：
{
  "openingHook": "从上一章结尾自然过渡的开头描述（1-2句）",
  "endingCliffhanger": "本章结尾悬念设计（1-2句）",
  "sceneLocation": "本章主要场景地点",
  "emotionArc": "rising|falling|flat|wave|climax",
  "appearingCharacterIds": [1, 2, 3],
  "foreshadowIds": [1, 2],
  "scenes": [
    {
      "title": "场景标题",
      "summary": "一句话概要",
      "location": "地点",
      "conflict": "核心冲突",
      "pace": "slow|medium|fast|climax",
      "characterIds": [1, 2],
      "estimatedWords": 2000
    }
  ]
}

情绪走向说明：
- rising：情绪逐步升温
- falling：情绪逐步降温
- flat：平稳叙事
- wave：起伏波动
- climax：全程高潮

要求：
1. openingHook 要衔接上一章结尾
2. endingCliffhanger 要吸引读者继续阅读
3. 出场角色从提供的角色列表中选取合适的（用 ID）
4. 伏笔关联从伏笔列表中选取本章相关的（用 ID）
5. 拆分 3-6 个场景，每个场景估算合理字数`,l=[`【章节】${i}`,`【章节大纲】${a||"暂无"}`];return e&&l.push(`【上一章摘要】${e}`),t&&l.push(`【下一章摘要】${t}`),s&&l.push(`【世界观】
${s.slice(0,500)}`),n&&l.push(`【可用角色】
${n.slice(0,600)}`),o&&l.push(`【可用伏笔】
${o.slice(0,500)}`),[{role:"system",content:r},{role:"user",content:l.join(`

`)+`

请生成增强细纲：`}]}function h(i){const a=i.trim();let e=a;const t=a.match(/```(?:json)?\s*([\s\S]*?)```/);t&&(e=t[1].trim());const s=e.indexOf("{"),n=e.lastIndexOf("}");if(s===-1||n===-1)return null;try{return JSON.parse(e.slice(s,n+1))}catch{return null}}const g=`目标结构：JSON 对象
{
  "openingHook": "开场钩子",
  "endingCliffhanger": "结尾悬念",
  "sceneLocation": "主要场景地点",
  "emotionArc": "情绪曲线",
  "scenes": [{ "title": "场景标题", "summary": "场景概要", "location": "地点", "conflict": "冲突", "pace": "节奏", "estimatedWords": 字数(整数) }]
}
完整保留原文里的每一个场景，不要遗漏。`;async function E(i,a){const e=h(i);return e||await O(i,g,a)}export{y as a,I as b,E as p,S as u};
