"use strict";(self.webpackChunkcheckers_online_frontend=self.webpackChunkcheckers_online_frontend||[]).push([[515],{2940:function(e,n,s){var a=s(1413),i=s(2791),o=s(7689),r=s(9434),c=s(408),t=s(7633),l=s(5171),d=s(184);n.Z=function(e){return function(n){var s=(0,r.v9)(c.c7),m=(0,r.v9)(c.KN),u=(0,r.v9)(c.rK),x=(0,r.I0)();return i.useEffect((function(){u&&!m&&x((0,c.$b)(s))})),u&&!m?(0,d.jsx)(t.Z,{}):(0,l.GL)()!==u?(x((0,c.GT)()),(0,d.jsx)(o.Fg,{to:"/login"})):s?(0,d.jsx)(e,(0,a.Z)({},n)):(0,d.jsx)(o.Fg,{to:"/login"})}}},1515:function(e,n,s){s.r(n),s.d(n,{default:function(){return ne}});var a=s(2791),i=s(2940),o=s(1413),r=s(2777),c=s(3211),t=s(9529),l="ProfilePage_userPhotoAndLoginBlock__1JfNh",d="ProfilePage_nameBlock__pHmDX",m="ProfilePage_copy__PNjWm",u="ProfilePage_loader__ZSVJl",x="ProfilePage_gameCardBlock__jzv5s",j="ProfilePage_gamesBlockHeader__Z2CI4",f="ProfilePage_gameCard__xuvKm",g="ProfilePage_win__ywIdB",p="ProfilePage_lose__VoJT8",h="ProfilePage_waiting__6+o21",_="ProfilePage_ready__jbGYu",Z="ProfilePage_user__-XiU2",v="ProfilePage_gameId__-KLAl",P=s(5507),k=s(9439),C=s(8263),G=s(50),b=s(532),y=s(8409),N=s(5278),M=s(3281),T=s(8301),I=s(106),w=s(2892),L=s(7027),B=s(7309),O=s(3020),F=s(3317),K=s(3414),A=s(184),E=O.Z.Text,S=function(e){var n=e.messageApi,s=e.createdGameId,a=e.onCreateNewGameModalClose,i=e.isCreateGameModalOpen;return(0,A.jsx)(F.Z,{title:"\u0418\u0433\u0440\u0430 \u0441\u043e\u0437\u0434\u0430\u043d\u0430",open:i,closable:!1,centered:!0,onCancel:a,footer:[(0,A.jsx)(B.Z,{type:"primary",onClick:a,children:"OK"},"okButton")],children:(0,A.jsxs)("div",{children:[(0,A.jsx)(E,{children:"\u0414\u043b\u044f \u043d\u0430\u0447\u0430\u043b\u0430 \u0438\u0433\u0440\u044b \u0432\u0430\u0448 \u0441\u043e\u043f\u0435\u0440\u043d\u0438\u043a \u0434\u043e\u043b\u0436\u0435\u043d \u043d\u0430\u0436\u0430\u0442\u044c \u043a\u043d\u043e\u043f\u043a\u0443 \xab\u041f\u0440\u0438\u0441\u043e\u0435\u0434\u0438\u043d\u0438\u0442\u044c\u0441\u044f\xbb \u0438 \u0432\u0432\u0435\u0441\u0442\u0438 \u0438\u0434\u0435\u043d\u0442\u0438\u0444\u0438\u043a\u0430\u0442\u043e\u0440 \u0438\u0433\u0440\u044b:"}),(0,A.jsx)("br",{}),(0,A.jsx)(E,{children:"id: "}),(0,A.jsx)(w.Z,{title:"\u041a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u0442\u044c",children:(0,A.jsxs)(E,{code:!0,onClick:function(){navigator.clipboard.writeText(String(s)).then((function(){n.open({type:"success",content:"\u0421\u043a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u043d\u043e",duration:2})}))},className:m,children:[s,"\xa0",(0,A.jsx)(K.Z,{})]})})]})})},z=s(7038),W=s(3288),V=s(7689),X=O.Z.Text,q=function(e){var n=e.messageApi,s=e.isConnectGameModalOpen,i=e.isConnectGameLoading,o=e.connectedGameId,r=e.connectGameError,c=e.setConnectToGameModalOpened,t=e.onConnectToGameModalFormSubmit,l=z.Z.useForm(),d=(0,k.Z)(l,1)[0];(0,V.s0)();(0,a.useEffect)((function(){o&&(c(!1),n.open({type:"success",content:"\u0418\u0433\u0440\u0430 \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u0430 \u0432 \u0432\u0430\u0448 \u0441\u043f\u0438\u0441\u043e\u043a",duration:5}))}),[o]);var m=function(){d.resetFields(),c(!1)};return(0,A.jsx)(F.Z,{title:"\u041f\u0440\u0438\u0441\u043e\u0435\u0434\u0438\u043d\u0438\u0442\u044c\u0441\u044f \u043a \u0438\u0433\u0440\u0435",open:s,centered:!0,onCancel:m,footer:[(0,A.jsx)(B.Z,{type:"default",onClick:m,children:"\u041e\u0442\u043c\u0435\u043d\u0430"},"cancel"),(0,A.jsx)(B.Z,{type:"primary",onClick:function(){return d.submit()},loading:i,children:"OK"},"ok")],children:(0,A.jsxs)("div",{children:[(0,A.jsx)(X,{children:"\u0414\u043b\u044f \u043f\u043e\u0434\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u044f \u043a \u0438\u0433\u0440\u0435 \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u0435\u0451 \u0438\u0434\u0435\u043d\u0442\u0438\u0444\u0438\u043a\u0430\u0442\u043e\u0440"}),(0,A.jsx)("br",{}),(0,A.jsx)(z.Z,{onFinish:function(){t(d.getFieldValue("gameId"))},form:d,requiredMark:!1,children:(0,A.jsx)(z.Z.Item,{label:"id",name:"gameId",validateStatus:r?"error":"success",help:r,rules:[{required:!0,message:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u0434\u0435\u043d\u0442\u0438\u0444\u0438\u043a\u0430\u0442\u043e\u0440 \u0438\u0433\u0440\u044b"}],children:(0,A.jsx)(W.Z,{size:"small",min:1})})})]})})},H=s(7633),J=function(e){var n,s,a=e.game,i=(0,V.s0)(),o=a.status;switch(o){case C.u5:o="\u041e\u0436\u0438\u0434\u0430\u0435\u043c \u0441\u043e\u043f\u0435\u0440\u043d\u0438\u043a\u0430",n=(0,A.jsx)(G.Z,{}),s=h;break;case C.TU:o="\u0412\u0430\u0448 \u0445\u043e\u0434",n=(0,A.jsx)(b.Z,{}),s=_;break;case C.e0:o="\u0425\u043e\u0434 \u0441\u043e\u043f\u0435\u0440\u043d\u0438\u043a\u0430",n=(0,A.jsx)(G.Z,{}),s=h;break;case C.B4:o="\u0412\u044b \u043f\u043e\u0431\u0435\u0434\u0438\u043b\u0438",n=(0,A.jsx)(y.Z,{}),s=g;break;case C.lr:o="\u0412\u044b \u043f\u0440\u043e\u0438\u0433\u0440\u0430\u043b\u0438",n=(0,A.jsx)(N.Z,{}),s=p;break;case C.V9:o="\u0418\u0433\u0440\u0430 \u043e\u043a\u043e\u043d\u0447\u0435\u043d\u0430",n=(0,A.jsx)(y.Z,{}),s=g;break;default:o="\u041a\u0430\u043a\u0430\u044f-\u0442\u043e \u043e\u0448\u0438\u0431\u043a\u0430",n=(0,A.jsx)(N.Z,{}),s=p}return(0,A.jsxs)(I.Z,{className:f+" "+s,onClick:function(){a.status!==C.u5&&i("/game/"+a.id)},children:[n,"\xa0\xa0",a.opponentId&&(0,A.jsxs)(w.Z,{title:"id: "+a.opponentId,children:[(0,A.jsx)("span",{className:Z,children:a.opponentLogin}),"\xa0"]}),(0,A.jsx)("span",{children:o}),"\xa0",(0,A.jsxs)("span",{className:v,children:["(id: ",a.id,")"]})]})},U=function(e){var n=e.games,s=e.isGamesListLoading,a=e.isCreateGameLoading,i=e.onCreateNewGameButtonClick,r=e.setConnectToGameModalOpened,c=e.createGameModalProps,t=e.connectToGameModalProps,l=L.ZP.useMessage(),d=(0,k.Z)(l,2),m=d[0],f=d[1],g=[];return!s&&n&&(g=n.map((function(e){return(0,A.jsx)(J,{game:e},e.id)}))),Array.isArray(n)&&0===n.length&&(g=(0,A.jsxs)("p",{className:v,children:["\u0412\u044b \u0435\u0449\u0451 \u043d\u0435 \u0441\u044b\u0433\u0440\u0430\u043b\u0438 \u043d\u0438 \u043e\u0434\u043d\u043e\u0439 \u043f\u0430\u0440\u0442\u0438\u0438.",(0,A.jsx)("br",{}),"\u0421 \u043f\u043e\u043c\u043e\u0449\u044c\u044e \u043a\u043d\u043e\u043f\u043e\u043a \u0432\u044b\u0448\u0435 \u0412\u044b \u043c\u043e\u0436\u0435\u0442\u0435 \u0441\u043e\u0437\u0434\u0430\u0442\u044c \u0441\u0432\u043e\u044e \u043f\u0435\u0440\u0432\u0443\u044e \u043f\u0430\u0440\u0442\u0438\u044e \u0438\u043b\u0438 \u043f\u043e\u0434\u043a\u043b\u044e\u0447\u0438\u0442\u044c\u0441\u044f \u043a \u043f\u0430\u0440\u0442\u0438\u0438, \u0441\u043e\u0437\u0434\u0430\u043d\u043d\u043e\u0439 \u0432\u0430\u0448\u0438\u043c \u0434\u0440\u0443\u0433\u043e\u043c"]})),(0,A.jsxs)("div",{children:[f,(0,A.jsxs)("div",{className:j,children:[(0,A.jsx)(P.Z,{level:2,children:"\u0421\u043f\u0438\u0441\u043e\u043a \u043f\u0430\u0440\u0442\u0438\u0439"}),(0,A.jsxs)("div",{children:[(0,A.jsx)(B.Z,{loading:a,type:"text",icon:(0,A.jsx)(M.Z,{}),onClick:i,children:"\u0421\u043e\u0437\u0434\u0430\u0442\u044c"}),(0,A.jsx)(B.Z,{type:"text",icon:(0,A.jsx)(T.Z,{}),onClick:function(){return r(!0)},children:"\u041f\u0440\u0438\u0441\u043e\u0435\u0434\u0438\u043d\u0438\u0442\u044c\u0441\u044f"})]})]}),s?(0,A.jsx)("div",{className:u,children:(0,A.jsx)(H.Z,{message:"\u041f\u043e\u0434\u0433\u0440\u0443\u0436\u0430\u0435\u043c \u0434\u0430\u043d\u043d\u044b\u0435",size:"medium"})}):(0,A.jsx)("div",{className:x,children:g}),(0,A.jsx)(S,(0,o.Z)({messageApi:m},c)),(0,A.jsx)(q,(0,o.Z)({messageApi:m},t))]})},D=function(e){var n=e.login;return(0,A.jsxs)("div",{className:l,children:[(0,A.jsx)(c.C,{size:100,icon:(0,A.jsx)(t.Z,{})}),(0,A.jsx)("div",{className:d,children:(0,A.jsx)(P.Z,{level:2,children:n})})]})},Q=function(e){var n=e.login,s=e.gamesBlockProps;return(0,A.jsxs)(r.Z,{children:[(0,A.jsx)(D,{login:n}),(0,A.jsx)(U,(0,o.Z)({},s))]})},Y=s(9434),$=s(3708),R=s(408),ee=s(4862),ne=(0,i.Z)((function(){var e=(0,Y.v9)(R.KN),n=(0,Y.v9)(R.c7),s=(0,Y.v9)($.NN),i=(0,Y.v9)($.cE),o=(0,Y.v9)($.WT),r=(0,Y.v9)($.Pf),c=(0,Y.v9)($.XT),t=(0,Y.v9)($.fg),l=(0,Y.v9)($.kr),d=(0,Y.v9)($.h4),m=(0,Y.v9)($.FF),u=(0,Y.I0)();(0,a.useEffect)((function(){null!==s||i||u((0,$.ns)())})),s&&(s=s.map((function(n){return(0,ee.q)(n,e)})));var x=function(e){u((0,$.bk)(e)),e||u((0,$.ns)())},j={games:s,isGamesListLoading:i,isCreateGameLoading:o,onCreateNewGameButtonClick:function(){u((0,$.ae)())},setConnectToGameModalOpened:x,createGameModalProps:{createdGameId:r,onCreateNewGameModalClose:function(){u((0,$.av)(!1)),u((0,$.ns)())},isCreateGameModalOpen:c},connectToGameModalProps:{isConnectGameModalOpen:t,isConnectGameLoading:l,connectedGameId:d,connectGameError:m,setConnectToGameModalOpened:x,onConnectToGameModalFormSubmit:function(e){u((0,$.Ls)({gameId:e,userId:n}))}}};return(0,A.jsx)(Q,{login:e,gamesBlockProps:j})}))},2777:function(e,n,s){s.d(n,{Z:function(){return f}});s(2791);var a=s(9529),i=s(8961),o=s(8586),r=s(9356),c="TemplatePageWithMenu_wrapper__ixbQB",t="TemplatePageWithMenu_sidebar__yXlI7",l="TemplatePageWithMenu_content__Mc3IK",d=s(7689),m=s(9434),u=s(1347),x=s(184),j=[{label:"\u041f\u0440\u043e\u0444\u0438\u043b\u044c",icon:(0,x.jsx)(a.Z,{}),key:"/profile"},{label:"\u041f\u043e\u0441\u043b\u0435\u0434\u043d\u0438\u0435 \u0438\u0433\u0440\u044b",icon:(0,x.jsx)(i.Z,{}),key:"games",children:[{label:"\u0418\u0433\u0440\u0430",icon:(0,x.jsx)(o.Z,{}),key:"/game"},{label:"\u0418\u0433\u0440\u0430",icon:(0,x.jsx)(o.Z,{}),key:"/game/1"},{label:"\u0418\u0433\u0440\u0430",icon:(0,x.jsx)(o.Z,{}),key:"/game/2"}]}],f=function(e){var n=e.children,s=(0,d.s0)(),a=(0,d.TH)().pathname,i=(0,m.v9)(u.Ew),o=(0,m.I0)();return(0,x.jsxs)("div",{className:c,children:[(0,x.jsx)("div",{className:t,children:(0,x.jsx)(r.Z,{mode:"inline",defaultSelectedKeys:[a],defaultOpenKeys:i,items:j,onSelect:function(e){s(e.key)},onOpenChange:function(e){o((0,u.xz)(e))}})}),(0,x.jsx)("section",{className:l,children:n})]})}}}]);
//# sourceMappingURL=515.e6534a10.chunk.js.map