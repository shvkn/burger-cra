"use strict";(self.webpackChunkreact_burger=self.webpackChunkreact_burger||[]).push([[898],{8898:function(e,t,s){s.r(t),s.d(t,{default:function(){return f}});var n=s(2791),a=s(4880),l=s(5472),c="styles_dashboard__huSw7",r="styles_dashboardOrdersList__FSmtu",i="styles_ordersNumbers__q-NbG",d="styles_orderNumber__sxMh4",u="styles_textShadow__IUUg9",o=s(184),m=function(e){var t,s,a=e.orders,m=e.total,_=e.totalToday,x=(0,n.useMemo)((function(){return(0,l.vM)(a,(function(e){return e.status}))}),[a]);return x?(0,o.jsxs)("div",{className:"ml-9 mt-25 ".concat(c),children:[(0,o.jsxs)("div",{className:r,children:[(0,o.jsxs)("div",{children:[(0,o.jsx)("h3",{className:"mb-6 text text_type_main-default",children:"\u0413\u043e\u0442\u043e\u0432\u044b:"}),(0,o.jsx)("ul",{className:i,children:null===(t=x.done)||void 0===t?void 0:t.slice(0,20).map((function(e){return(0,o.jsx)("li",{className:"mb-2 ml-8 ".concat(d),children:(0,o.jsx)("p",{className:"text text_type_digits-default text_color_success",children:e.number})},e.number)}))})]}),(0,o.jsxs)("div",{className:"ml-9",children:[(0,o.jsx)("h3",{className:"text text_type_main-default",children:"\u0412 \u0440\u0430\u0431\u043e\u0442\u0435:"}),(0,o.jsx)("ul",{className:i,children:null===(s=x.pending)||void 0===s?void 0:s.slice(0,20).map((function(e){return(0,o.jsx)("li",{className:"mb-2 ml-8 ".concat(d),children:(0,o.jsx)("p",{className:"text text_type_digits-default",children:e.number})},e.number)}))})]})]}),(0,o.jsx)("h3",{className:"mt-15 text text_type_main-default",children:"\u0412\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u043e \u0437\u0430 \u0432\u0441\u0435 \u0432\u0440\u0435\u043c\u044f:"}),(0,o.jsx)("p",{className:"text text_type_digits-large ".concat(u),children:m}),(0,o.jsx)("h3",{className:"mt-15 text text_type_main-default",children:"\u0412\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u043e \u0437\u0430 \u0441\u0435\u0433\u043e\u0434\u043d\u044f:"}),(0,o.jsx)("p",{className:"text text_type_digits-large ".concat(u),children:_})]}):null},_=s(6284),x=s(6035),h=s(2848),j=s(8037),N="styles_layout__ZPt8A",p="styles_container__5iRVz",y="styles_ordersList__Zn1cR",f=function(){var e=_.gh.useIngredients(),t=e.isSucceeded,s=e.isLoading,c=e.entities,r=x.RM.useOrders({ingredientsEntities:c}),i=r.orders,d=r.total,u=r.totalToday,f=r.isWsOpened,g=r.isWsClosed,b=r.isWsConnecting,v=r.isEmpty,M=(0,l.TL)();(0,n.useEffect)((function(){return M(_.gh.actions.getIngredientsAsync()),g&&M(x.RM.actions.connect({route:"/orders/all"})),function(){f&&M(x.RM.actions.close())}}),[M,f,g,t,s]);var R=(0,a.$B)().url;return b?(0,o.jsx)(h.Nc,{}):v?null:(0,o.jsx)("main",{className:N,children:(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)("div",{className:p,children:[(0,o.jsx)("h2",{className:"mt-10 mb-5 text text_type_main-medium",children:"\u041b\u0435\u043d\u0442\u0430 \u0437\u0430\u043a\u0430\u0437\u043e\u0432"}),(0,o.jsx)("ul",{className:"".concat(y," scroll"),children:i.map((function(e){return(0,o.jsx)("li",{className:"mb-4 mr-2",children:(0,o.jsx)(j.t,{path:"".concat(R,"/").concat(e._id),children:(0,o.jsx)(x.KM,{order:e,hideStatus:!0})})},e._id)}))})]}),(0,o.jsx)(m,{orders:i,total:d,totalToday:u})]})})}}}]);
//# sourceMappingURL=898.b8d6b5ce.chunk.js.map