"use strict";(self.webpackChunkapp1=self.webpackChunkapp1||[]).push([[905],{905:(e,t,n)=>{var l=n(995),r=n.n(l),a=n(186),s=n(282);const u=()=>{const[e,t]=(0,l.useState)(null),[n,a]=(0,l.useState)(null),[u,c]=(0,l.useState)(""),[o,m]=(0,l.useState)(null);return(0,l.useEffect)((()=>{fetch("http://localhost:4000/guides").then((e=>e.json())).then((e=>{console.log(e),a(e)})).catch((e=>console.error("Error fetching guides:",e)));const e=(0,s.listenMessage)("USER_UPDATED",(e=>{t(e)})),n=(0,s.listenMessage)("DROPDOWN_CHANGED",(e=>{alert(e),m(e)}));return()=>{e.unsubscribe(),n.unsubscribe()}}),[]),r().createElement("div",null,r().createElement("div",null,r().createElement("h6",null,"App1"),n&&n.map((e=>r().createElement("div",{onClick:()=>{return t=e.id,c(t),void(0,s.sendMessage)("GUIDE_ID",t);var t}},e.name,r().createElement("br",null))))),r().createElement("div",null,"User: ",e?`${e.name}, ${e.age}`:"No user data"),r().createElement("div",null,"Dropdown: ",o?`${o}`:"No user data"))},c=()=>r().createElement(r().Fragment,null,r().createElement(a.Kd,null,r().createElement(a.BV,null,r().createElement(a.qh,{path:"/guides",element:r().createElement(u,null)}))));var o=n(717);n.n(o)().render(r().createElement(c,null),document.getElementById("root"))}}]);