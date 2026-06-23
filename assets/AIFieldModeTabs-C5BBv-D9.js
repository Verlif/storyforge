import{j as s}from"./vendor-editor-kbKfsw8r.js";const i={expand:"扩写",rewrite:"重写",polish:"润色"},p={expand:"保留当前字段的事实、方向和关键措辞，在此基础上补全、扩写和细化；不要另起炉灶。",rewrite:"忽略当前字段已有内容，按上下文与用户补充说明重新生成一版；适合推倒重来。",polish:"主要优化表达、逻辑顺序和可读性；除非用户明确要求，不要新增重大设定。"};function d(o,n,t="expand"){const e=[],r=t==="rewrite"?"":n==null?void 0:n.trim();return r&&e.push(`【当前字段已有内容】
${r}`),e.push(`【本次生成模式】${i[t]}`),e.push(`【执行要求】${p[t]}`),o!=null&&o.trim()&&e.push(`【用户补充说明】
${o.trim()}`),e.join(`

`)}const x=[["expand","扩写"],["rewrite","重写"],["polish","润色"]];function a({value:o,onChange:n}){return s.jsx("div",{className:"flex shrink-0 items-center rounded-lg border border-border bg-bg-base p-0.5",children:x.map(([t,e])=>s.jsx("button",{type:"button",onClick:()=>n(t),className:`px-2 py-1 text-xs rounded-md transition-colors ${o===t?"bg-accent/15 text-accent":"text-text-muted hover:text-text-primary"}`,children:e},t))})}export{a as A,d as c};
