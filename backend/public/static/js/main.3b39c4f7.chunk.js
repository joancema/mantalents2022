(this.webpackJsonpmantalents=this.webpackJsonpmantalents||[]).push([[0],{205:function(e,t,n){},282:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(35),o=n.n(c),i=n(26),s=n(23),l=n.n(s),u=n(29),d=n(165),b=n.n(d).a.create({baseURL:"https://jomilimon.herokuapp.com/api"}),j=localStorage.getItem("token")||"",p=function(){var e=Object(u.a)(l.a.mark((function e(t,n){var a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.post("/auth/login",{correo:t,password:n});case 2:return a=e.sent,e.abrupt("return",a.data);case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),m=function(){var e=Object(u.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.get("/auth",{headers:{"x-token":j}});case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),h=n(6),f=Object(a.createContext)({auth:{uid:"",checking:!0,logged:!0,name:"",email:"",opciones:[{_id:"",clave:"",ruta:"",titulo:""}]},login:function(){var e=Object(u.a)(l.a.mark((function e(t,n){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",!1);case 1:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),verificaToken:function(){var e=Object(u.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",!1);case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),logout:function(){return!0}}),O={uid:"",checking:!0,logged:!1,name:"",email:"",opciones:[{_id:"",clave:"",ruta:"",titulo:""}]},x=function(e){var t=e.children,n=Object(a.useState)(O),r=Object(i.a)(n,2),c=r[0],o=r[1],s=function(){var e=Object(u.a)(l.a.mark((function e(t,n){var a,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p(t,n);case 2:return(a=e.sent).usuario&&(localStorage.setItem("token",a.token),r=a.usuario,console.log(r.opciones),o({uid:r.uid,checking:!1,logged:!0,name:r.nombre,email:r.correo,opciones:r.opciones})),e.abrupt("return",!0);case 5:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),d=Object(a.useCallback)(Object(u.a)(l.a.mark((function e(){var t,n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(localStorage.getItem("token")){e.next=4;break}return o({uid:void 0,checking:!1,logged:!1,name:void 0,email:void 0,opciones:[]}),e.abrupt("return",!1);case 4:return e.next=6,m();case 6:if(!(t=e.sent)){e.next=14;break}return localStorage.setItem("token",t.token),n=t.usuario,o({uid:n.uid,checking:!1,logged:!0,name:n.nombre,email:n.correo,opciones:n.opciones}),e.abrupt("return",!0);case 14:return o({uid:void 0,checking:!1,logged:!1,name:void 0,email:void 0}),e.abrupt("return",!1);case 16:case"end":return e.stop()}}),e)}))),[]);return Object(h.jsx)(f.Provider,{value:{auth:c,login:s,verificaToken:d,logout:function(){return localStorage.removeItem("token"),o({checking:!1,logged:!1}),!0}},children:t})},g=(n(205),n(28)),v=n(291),y=n(292),w=n(104),k=n(55),C=function(){var e=Object(a.useContext)(f).login,t=function(){var t=Object(u.a)(l.a.mark((function t(n){var a;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e(n.username,n.password);case 2:a=t.sent,console.log(a);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return Object(h.jsxs)(v.a,{name:"basic",labelCol:{span:6},wrapperCol:{span:8},initialValues:{remember:!0},onFinish:t,onFinishFailed:function(e){console.log("Failed:",e)},autoComplete:"off",children:[Object(h.jsx)(v.a.Item,{label:"Username",name:"username",rules:[{required:!0,message:"Please input your username!"}],children:Object(h.jsx)(y.a,{})}),Object(h.jsx)(v.a.Item,{label:"Password",name:"password",rules:[{required:!0,message:"Please input your password!"}],children:Object(h.jsx)(y.a.Password,{})}),Object(h.jsx)(v.a.Item,{name:"remember",valuePropName:"checked",wrapperCol:{offset:8,span:16},children:Object(h.jsx)(w.a,{children:"Remember me"})}),Object(h.jsx)(v.a.Item,{wrapperCol:{offset:8,span:16},children:Object(h.jsx)(k.a,{type:"primary",htmlType:"submit",children:"Submit"})})]})},S=n(288),I=n(287),_=n(79),F=n(57),P=n(300),L=n(301),D=n(302),z=n(303),M=n(304),E=n(305),V=n(75),Y=n(20),T=n(175),K=n(284),A=n(285),q=n(286),B=n(289),N=n(294),R=n(296),G=n(297),U=n(298),W=localStorage.getItem("token")||"",H=function(){var e=Object(u.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.get("/categorias");case 2:return t=e.sent,e.abrupt("return",t.data.categorias);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),J=function(){var e=Object(u.a)(l.a.mark((function e(t){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(t._id.length>0)){e.next=6;break}return e.next=3,b.put("/categorias/".concat(t._id),t,{headers:{"x-token":W}});case 3:n=e.sent,e.next=9;break;case 6:return e.next=8,b.post("/categorias",t,{headers:{"x-token":W}});case 8:n=e.sent;case 9:return e.abrupt("return",n.data);case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Q=function(){var e=Object(a.useState)(!0),t=Object(i.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)([]),o=Object(i.a)(c,2),s=o[0],l=o[1];return Object(a.useEffect)((function(){H().then((function(e){r(!1),l(e)}))}),[]),{isLoading:n,setIsLoading:r,categorias:s,setCategorias:l}},X=n(129);function Z(){var e={current:null};return{filterDropdown:function(t){var n=t.setSelectedKeys,a=t.selectedKeys,r=t.confirm,c=t.clearFilters;return Object(h.jsxs)("div",{style:{padding:8},children:[Object(h.jsx)(y.a,{ref:function(t){return e.current=t},placeholder:"Search",value:a[0],onChange:function(e){return n(e.target.value?[e.target.value]:[])},onPressEnter:function(){return r},style:{width:188,marginBottom:8,display:"block"}}),Object(h.jsx)(k.a,{type:"primary",onClick:function(){return r()},icon:Object(h.jsx)(X.a,{}),size:"small",style:{width:90,marginRight:8},children:"Buscar"}),Object(h.jsx)(k.a,{size:"small",style:{width:90},onClick:c,children:"Resetear"})]})},filterIcon:function(e){return Object(h.jsx)(X.a,{style:{color:e?"#1890ff":void 0}})},onFilterDropdownVisibleChange:function(t){t&&setTimeout((function(){var t;return null===(t=e.current)||void 0===t?void 0:t.select()}))}}}var $=function(){var e=v.a.useForm(),t=Object(i.a)(e,1)[0],n=[Object(Y.a)(Object(Y.a)({title:"Nombre",dataIndex:"nombre",key:"nombre",render:function(e){return e}},Z()),{},{onFilter:function(e,t){return t.nombre.toLowerCase().includes(e.toString().toLowerCase())},sorter:function(e,t){return e.nombre.length-t.nombre.length}}),{title:"Usuario",dataIndex:["usuario","nombre"],key:"usuario"},{title:"Acciones",key:"acciones",width:200,fixed:"right",render:function(e){return Object(h.jsx)(k.a,{type:"primary",shape:"circle",icon:Object(h.jsx)(R.a,{}),onClick:function(){f(!0),b(e),t.setFieldsValue({nombre:e.nombre})}})}}],r=Q(),c=r.categorias,o=r.setCategorias,s=r.isLoading,l=Object(a.useState)({_id:"",nombre:""}),u=Object(i.a)(l,2),d=u[0],b=u[1],j=Object(a.useState)(!1),p=Object(i.a)(j,2),m=p[0],f=p[1];return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(K.a,{gutter:12,children:Object(h.jsx)(A.a,{span:12,offset:12,children:Object(h.jsx)(k.a,{type:"primary",shape:"circle",icon:Object(h.jsx)(G.a,{}),size:"large",onClick:function(){f(!0),b({_id:"",nombre:""}),t.setFieldsValue({nombre:""})}})})}),Object(h.jsx)(q.a,{orientation:"left",children:"Categorias/Grupos"}),Object(h.jsx)(K.a,{gutter:[16,24],children:Object(h.jsx)(B.a,{tableLayout:"fixed",loading:s,rowKey:"_id",pagination:{defaultPageSize:5,showSizeChanger:!0,pageSizeOptions:["5","10","20","30"]},scroll:{x:1300},dataSource:c,columns:n})}),Object(h.jsx)(N.a,{title:"Categor\xeda",width:720,height:300,onClose:function(){f(!1)},visible:m,bodyStyle:{paddingBottom:120},placement:"bottom",children:Object(h.jsxs)(v.a,{form:t,name:"formcategoria",labelCol:{span:4},wrapperCol:{span:12},initialValues:{remember:!0},onFinish:function(e){b({_id:d._id,nombre:e.nombre}),J(Object(Y.a)(Object(Y.a)({},e),{},{_id:d._id})).then((function(t){d._id.length>0?o(c.map((function(t){return t._id===d._id?Object(Y.a)(Object(Y.a)({},t),{},{nombre:e.nombre}):t}))):o([].concat(Object(V.a)(c),[t])),T.b.success("Se almacen\xf3 correctamente la categor\xeda"),f(!1)})).catch((function(e){T.b.error("Se presentaron errores al intentar almacenar las categorias")}))},onFinishFailed:function(){},autoComplete:"off",children:[Object(h.jsx)(v.a.Item,{label:"Descripci\xf3n",name:"nombre",rules:[{required:!0,message:"Por favor ingrese la descripci\xf3n"}],children:Object(h.jsx)(y.a,{})}),Object(h.jsx)(v.a.Item,{wrapperCol:{offset:8,span:16},children:Object(h.jsx)(k.a,{type:"primary",htmlType:"submit",icon:Object(h.jsx)(U.a,{}),children:"Guardar"})})]})})]})},ee=n(103),te=n(290),ne=n(295),ae=n(293),re=n(299),ce=localStorage.getItem("token")||"",oe=function(){var e=Object(u.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.get("/movimientos");case 2:return t=e.sent,e.abrupt("return",t.data.movimientos);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),ie=function(){var e=Object(u.a)(l.a.mark((function e(t,n){var a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(t.length>0)){e.next=6;break}return e.next=3,b.put("/movimientos/".concat(t),n,{headers:{"x-token":ce}});case 3:a=e.sent,e.next=9;break;case 6:return e.next=8,b.post("/movimientos",n,{headers:{"x-token":ce}});case 8:a=e.sent;case 9:return e.abrupt("return",a.data);case 10:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),se=function(){var e=Object(u.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.get("/personas");case 2:return t=e.sent,e.abrupt("return",t.data.personas);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),le=localStorage.getItem("token")||"",ue=function(){var e=Object(u.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.get("/productos");case 2:return t=e.sent,e.abrupt("return",t.data.productos);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),de=function(){var e=Object(u.a)(l.a.mark((function e(t){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log(t),!(t.id.length>0)){e.next=7;break}return e.next=4,b.put("/productos/".concat(t.id),t,{headers:{"x-token":le}});case 4:n=e.sent,e.next=10;break;case 7:return e.next=9,b.post("/productos",t,{headers:{"x-token":le}});case 9:n=e.sent;case 10:return e.abrupt("return",n.data);case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),be=function(){var e=Object(a.useState)(!0),t=Object(i.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)([]),o=Object(i.a)(c,2),s=o[0],l=o[1];return Object(a.useEffect)((function(){ue().then((function(e){r(!1),l(e)}))}),[]),{isLoading:n,setIsLoading:r,productos:s,setProductos:l}},je=n(47),pe=n.n(je),me=ee.a.Option,he=function(){var e=v.a.useForm(),t=Object(i.a)(e,1)[0],n=[Object(Y.a)(Object(Y.a)({title:"C\xf3digo",dataIndex:"codigo",key:"codigo",width:150,render:function(e){return e}},Z()),{},{onFilter:function(e,t){return t.codigo.toLowerCase().includes(e.toString().toLowerCase())},sorter:function(e,t){return e.codigo.length-t.codigo.length}}),{title:"Fecha",dataIndex:"fecha",key:"fecha",width:200,render:function(e){return"string"===typeof e?e.substr(0,10):pe()(e).format("YYYY-MM-DD")}},{title:"Cliente",dataIndex:["cliente","nombre"],key:"cliente"},{title:"Acciones",key:"acciones",width:200,fixed:"right",render:function(e){return Object(h.jsx)(k.a,{type:"primary",shape:"circle",icon:Object(h.jsx)(R.a,{}),onClick:function(){var n,a;console.log(e),g(!0),b(e);var r=[];null===(n=e.productos)||void 0===n||n.forEach((function(e){r.push({item:e.item._id,cantidad:e.cantidad,precio:e.precio,total:e.cantidad*e.precio})})),t.setFieldsValue({codigo:e.codigo,cliente:null===(a=e.cliente)||void 0===a?void 0:a._id,subtotal:e.subtotal,iva:e.iva,descuento:e.descuento,total:e.total,fecha:pe()(e.fecha,"YYYY-MM-DD"),productos:r})}})}}],r=function(){var e=Object(a.useState)(!0),t=Object(i.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)([]),o=Object(i.a)(c,2),s=o[0],l=o[1];return Object(a.useEffect)((function(){oe().then((function(e){r(!1),l(e)}))}),[]),{isLoading:n,setIsLoading:r,movimientos:s,setMovimientos:l}}(),c=r.movimientos,o=r.setMovimientos,s=r.isLoading,l=Object(a.useState)({_id:"",fecha:new Date,iva:0,descuento:0,subtotal:0,total:0,codigo:""}),u=Object(i.a)(l,2),d=u[0],b=u[1],j=function(){var e=Object(a.useState)(!0),t=Object(i.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)([]),o=Object(i.a)(c,2),s=o[0],l=o[1];return Object(a.useEffect)((function(){se().then((function(e){r(!1),l(e)}))}),[]),{isLoading:n,setIsLoading:r,personas:s,setPersonas:l}}(),p=j.personas,m=be().productos,f=Object(a.useState)(!1),O=Object(i.a)(f,2),x=O[0],g=O[1];return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(K.a,{gutter:12,children:Object(h.jsx)(A.a,{span:12,offset:12,children:Object(h.jsx)(k.a,{type:"primary",shape:"circle",icon:Object(h.jsx)(G.a,{}),size:"large",onClick:function(){g(!0),b({_id:"",fecha:new Date,codigo:"",subtotal:0,iva:0,total:0,descuento:0}),t.setFieldsValue({codigo:"",cliente:"",subtotal:0,iva:0,descuento:0,total:0,fecha:pe()("2021-01-01","YYYY-MM-DD"),productos:[{item:"",cantidad:1,precio:0}]})}})})}),Object(h.jsx)(q.a,{orientation:"left",children:"Movimientos"}),Object(h.jsx)(K.a,{gutter:[16,24],children:Object(h.jsx)(B.a,{tableLayout:"fixed",loading:s,rowKey:"_id",pagination:{defaultPageSize:5,showSizeChanger:!0,pageSizeOptions:["5","10","20","30"]},scroll:{x:1300},dataSource:c,columns:n},"_id")}),Object(h.jsx)(N.a,{title:"Movimiento",width:720,height:600,onClose:function(){g(!1)},visible:x,bodyStyle:{paddingBottom:120},placement:"bottom",children:Object(h.jsxs)(v.a,{form:t,name:"formmovimiento",initialValues:{remember:!0},onValuesChange:function(e,n){var a=Object(V.a)(n.productos),r=0;n.productos.forEach((function(e,n){e&&e.cantidad&&e.precio&&(e.total=e.cantidad*e.precio,r+=e.total,a.splice(n,1,e),t.setFieldsValue({productos:a}))})),t.setFieldsValue({subtotal:r,iva:.12*r,total:1.12*r})},onFinish:function(e){b({_id:d._id,codigo:e.codigo,fecha:new Date(e.fecha.toISOString().substr(0,10)),subtotal:e.subtotal,iva:e.iva,descuento:e.descuento,total:e.total});var t=[];e.productos.forEach((function(e){t.push({cantidad:e.cantidad,precio:e.precio,item:{_id:e.item,nombre:"",categoria:"",precio:0,estado:!0},_id:""})}));var n=p.filter((function(t){return t._id===e.cliente}))[0];ie(d._id,{codigo:e.codigo,fecha:e.fecha.toISOString().substr(0,10),cliente:e.cliente,productos:e.productos,subtotal:e.subtotal,iva:e.iva,descuento:e.descuento,total:e.total}).then((function(a){console.log(a),d._id.length>0?o(c.map((function(a){return a._id===d._id?Object(Y.a)(Object(Y.a)({},a),{},{codigo:e.codigo,fecha:pe()(e.fecha,"YYYY-MM-DD").toDate(),cliente:{_id:n._id,nombre:n.nombre,direccion:n.direccion,telefono:n.telefono,identificacion:n.identificacion,correoelectronico:n.correoelectronico,estado:!0},descuento:e.descuento,iva:e.iva,subtotal:e.subtotal,total:e.total,productos:t}):a}))):o([].concat(Object(V.a)(c),[Object(Y.a)(Object(Y.a)({},a),{},{cliente:{_id:n._id,nombre:n.nombre,direccion:n.direccion,telefono:n.telefono,identificacion:n.identificacion,correoelectronico:n.correoelectronico,estado:!0}})])),T.b.success("Se almacen\xf3 correctamente el movimiento"),g(!1)})).catch((function(e){T.b.error("Se presentaron errores al intentar almacenar los movimientos")}))},onFinishFailed:function(){},autoComplete:"off",children:[Object(h.jsx)(v.a.Item,{label:"C\xf3digo",name:"codigo",style:{width:300},rules:[{required:!0,message:"Por favor ingrese el c\xf3digo"}],children:Object(h.jsx)(y.a,{})}),Object(h.jsx)(v.a.Item,{label:"Fecha",name:"fecha",children:Object(h.jsx)(te.a,{})}),Object(h.jsx)(v.a.Item,{label:"Cliente",name:"cliente",children:Object(h.jsx)(ee.a,{showSearch:!0,style:{width:400},placeholder:"Selecciona una persona",optionFilterProp:"children",onChange:function(){},onSearch:function(){},filterOption:function(e,t){return(null===t||void 0===t?void 0:t.children.toLowerCase().indexOf(e.toLowerCase()))>=0},children:p.map((function(e){var t=e._id,n=e.nombre;return Object(h.jsx)(me,{value:t,children:n},t)}))})}),Object(h.jsx)(v.a.List,{name:"productos",children:function(e,t){var n=t.add,a=t.remove;return Object(h.jsxs)(h.Fragment,{children:[e.map((function(e){return Object(h.jsxs)(ne.b,{style:{display:"flex",marginBottom:8},align:"baseline",children:[Object(h.jsx)(v.a.Item,{name:[e.name,"item"],fieldKey:[e.fieldKey,"item"],children:Object(h.jsx)(ee.a,{showSearch:!0,style:{width:400},placeholder:"Seleccione producto",optionFilterProp:"children",onChange:function(){},onSearch:function(){},filterOption:function(e,t){return(null===t||void 0===t?void 0:t.children.toLowerCase().indexOf(e.toLowerCase()))>=0},children:m.map((function(e){var t=e._id,n=e.nombre;return Object(h.jsx)(me,{value:t,children:n},t)}))})}),Object(h.jsx)(v.a.Item,Object(Y.a)(Object(Y.a)({},e),{},{name:[e.name,"cantidad"],fieldKey:[e.fieldKey,"cantidad"],rules:[{required:!0,message:"Debe ubicar el cantidad"}],children:Object(h.jsx)(ae.a,{placeholder:"Cantidad"})})),Object(h.jsx)(v.a.Item,Object(Y.a)(Object(Y.a)({},e),{},{name:[e.name,"precio"],fieldKey:[e.fieldKey,"precio"],rules:[{required:!0,message:"Debe ubicar el precio"}],children:Object(h.jsx)(ae.a,{placeholder:"Precio"})})),Object(h.jsx)(v.a.Item,Object(Y.a)(Object(Y.a)({noStyle:!0},e),{},{name:[e.name,"total"],fieldKey:[e.fieldKey,"total"],children:Object(h.jsx)(y.a,{disabled:!0,placeholder:"Total"})})),Object(h.jsx)(re.a,{onClick:function(){a(e.name)}})]},e.key)})),Object(h.jsx)(v.a.Item,{children:Object(h.jsx)(k.a,{type:"dashed",onClick:function(){return n()},block:!0,icon:Object(h.jsx)(G.a,{}),children:"Agregar"})})]})}}),Object(h.jsx)(v.a.Item,{label:"Subtotal",name:"subtotal",style:{width:300},children:Object(h.jsx)(y.a,{})}),Object(h.jsx)(v.a.Item,{label:"Iva",name:"iva",style:{width:300},children:Object(h.jsx)(y.a,{})}),Object(h.jsx)(v.a.Item,{label:"Descuento",name:"descuento",style:{width:300},children:Object(h.jsx)(y.a,{})}),Object(h.jsx)(v.a.Item,{label:"Total",name:"total",style:{width:300},children:Object(h.jsx)(y.a,{})}),Object(h.jsx)(v.a.Item,{wrapperCol:{offset:8,span:16},children:Object(h.jsx)(k.a,{type:"primary",htmlType:"submit",icon:Object(h.jsx)(U.a,{}),children:"Guardar"})})]})})]})},fe=ee.a.Option,Oe=function(){var e=v.a.useForm(),t=Object(i.a)(e,1)[0],n=[Object(Y.a)(Object(Y.a)({title:"Nombre",dataIndex:"nombre",key:"nombre",render:function(e){return e}},Z()),{},{onFilter:function(e,t){return t.nombre.toLowerCase().includes(e.toString().toLowerCase())},sorter:function(e,t){return e.nombre.length-t.nombre.length}}),{title:"Categoria",dataIndex:["categoria","nombre"],key:"categoria"},{title:"Precio",dataIndex:"precio",key:"precio"},{title:"Acciones",key:"acciones",width:200,fixed:"right",render:function(e){return Object(h.jsx)(k.a,{type:"primary",shape:"circle",icon:Object(h.jsx)(R.a,{}),onClick:function(){O(!0),j(e),t.setFieldsValue({nombre:e.nombre,precio:e.precio,categoria:e.categoria._id})}})}}],r=be(),c=r.productos,o=r.setProductos,s=r.isLoading,l=Q().categorias,u=Object(a.useState)({_id:"",nombre:"",precio:0,categoria:{_id:"",nombre:""}}),d=Object(i.a)(u,2),b=d[0],j=d[1],p=Object(a.useState)(!1),m=Object(i.a)(p,2),f=m[0],O=m[1];return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(K.a,{gutter:12,children:Object(h.jsx)(A.a,{span:12,offset:12,children:Object(h.jsx)(k.a,{type:"primary",shape:"circle",icon:Object(h.jsx)(G.a,{}),size:"large",onClick:function(){O(!0),j({_id:"",nombre:"",precio:0,categoria:{_id:"",nombre:""}}),t.setFieldsValue({nombre:"",precio:0,categoria:""})}})})}),Object(h.jsx)(q.a,{orientation:"left",children:"Productos"}),Object(h.jsx)(K.a,{gutter:[16,24],children:Object(h.jsx)(B.a,{tableLayout:"fixed",loading:s,rowKey:"_id",pagination:{defaultPageSize:5,showSizeChanger:!0,pageSizeOptions:["5","10","20","30"]},scroll:{x:1300},dataSource:c,columns:n},"_id")}),Object(h.jsx)(N.a,{title:"Items",width:720,height:300,onClose:function(){O(!1)},visible:f,bodyStyle:{paddingBottom:120},placement:"bottom",children:Object(h.jsxs)(v.a,{form:t,name:"formcategoria",labelCol:{span:4},wrapperCol:{span:12},initialValues:{remember:!0},onFinish:function(e){j({_id:b._id,nombre:e.nombre,precio:e.precio,categoria:{_id:e.categoria,nombre:""}});var t="";e.categoria&&e.categoria.length>0&&(t=l.filter((function(t){return t._id===e.categoria}))[0].nombre),de(Object(Y.a)(Object(Y.a)({},e),{},{categoria:e.categoria,id:b._id})).then((function(n){b._id.length>0?o(c.map((function(n){return n._id===b._id?Object(Y.a)(Object(Y.a)({},n),{},{nombre:e.nombre,precio:e.precio,categoria:{_id:e.categoria,nombre:t}}):n}))):o([].concat(Object(V.a)(c),[n])),T.b.success("Se almacen\xf3 correctamente el producto"),O(!1)})).catch((function(e){T.b.error("Se presentaron errores al intentar almacenar los productos")}))},onFinishFailed:function(){},autoComplete:"off",children:[Object(h.jsx)(v.a.Item,{label:"Descripci\xf3n",name:"nombre",rules:[{required:!0,message:"Por favor ingrese la descripci\xf3n"}],children:Object(h.jsx)(y.a,{})}),Object(h.jsx)(v.a.Item,{label:"Precio",name:"precio",children:Object(h.jsx)(ae.a,{min:"0.01"})}),Object(h.jsx)(v.a.Item,{label:"Categoria",name:"categoria",children:Object(h.jsx)(ee.a,{showSearch:!0,style:{width:400},placeholder:"Select a person",optionFilterProp:"children",onChange:function(){},onSearch:function(){},filterOption:function(e,t){return(null===t||void 0===t?void 0:t.children.toLowerCase().indexOf(e.toLowerCase()))>=0},children:l.map((function(e){var t=e._id,n=e.nombre;return Object(h.jsx)(fe,{value:t,children:n},t)}))})}),Object(h.jsx)(v.a.Item,{wrapperCol:{offset:8,span:16},children:Object(h.jsx)(k.a,{type:"primary",htmlType:"submit",icon:Object(h.jsx)(U.a,{}),children:"Guardar"})})]})})]})},xe=I.a.Header,ge=I.a.Content,ve=I.a.Footer,ye=I.a.Sider,we=_.a.SubMenu,ke=function(){return Object(h.jsx)("svg",{width:"1em",height:"1em",fill:"currentColor",viewBox:"0 0 1024 1024",children:Object(h.jsx)("path",{d:"M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z"})})},Ce=function(e){return Object(h.jsx)(S.a,{component:ke,style:{color:"hotpink"}})},Se=function(){var e,t=function(e){switch(e){case"UserOutlined":return Object(h.jsx)(P.a,{});case"DollarOutlined":return Object(h.jsx)(L.a,{});case"BarcodeOutlined":return Object(h.jsx)(D.a,{});case"ShoppingCartOutlined":return Object(h.jsx)(z.a,{});default:return Object(h.jsx)(M.a,{})}},n=Object(a.useContext)(f),r=n.logout,c=n.auth;Object(a.useEffect)((function(){console.log(c)}),[c]);var o=Object(a.useState)(!1),s=Object(i.a)(o,2),l=s[0],u=s[1];return Object(h.jsx)(F.a,{children:Object(h.jsxs)(I.a,{style:{minHeight:"100vh"},children:[Object(h.jsxs)(ye,{collapsible:!0,collapsed:l,onCollapse:function(e){u(e)},children:[Object(h.jsx)("div",{className:"logo"}),Object(h.jsxs)(_.a,{theme:"dark",defaultSelectedKeys:["1"],mode:"inline",children:[null===(e=c.opciones)||void 0===e?void 0:e.map((function(e){var n;return 1===e.clave.split("_").length&&Object(h.jsx)(we,{icon:t(e.ruta),title:e.titulo,children:null===(n=c.opciones)||void 0===n?void 0:n.filter((function(t){return t.clave.startsWith(e.clave+"_")})).map((function(e){var n;return 2===e.clave.split("_").length?e.ruta.includes("/")?Object(h.jsx)(_.a.Item,{children:Object(h.jsx)(F.b,{to:e.ruta,children:e.titulo})},e.clave):Object(h.jsx)(we,{icon:t(e.ruta),title:e.titulo,children:null===(n=c.opciones)||void 0===n?void 0:n.filter((function(t){return t.clave.startsWith(e.clave+"_")})).map((function(e){return Object(h.jsx)(_.a.Item,{children:Object(h.jsx)(F.b,{to:e.ruta,children:e.titulo})},e.clave)}))},e.clave):Object(h.jsx)("h1",{children:"ok"})}))},e.clave)})),Object(h.jsx)(we,{icon:Object(h.jsx)(E.a,{}),title:"Configurar",children:Object(h.jsx)(_.a.Item,{onClick:function(){r()},icon:Object(h.jsx)(Ce,{}),children:"Salir de la App "},"11")},"sub3")]})]}),Object(h.jsxs)(I.a,{className:"site-layout",children:[Object(h.jsx)(xe,{className:"site-layout-background",style:{padding:0}}),Object(h.jsx)(ge,{style:{margin:"16px 16px"},children:Object(h.jsxs)(g.d,{children:[Object(h.jsx)(g.b,{exact:!0,path:"/app/categorias",component:$}),Object(h.jsx)(g.b,{exact:!0,path:"/app/productos",component:Oe}),Object(h.jsx)(g.b,{exact:!0,path:"/app/movimientos",component:he}),Object(h.jsx)(g.a,{to:"/app/movimientos"})]})}),Object(h.jsx)(ve,{style:{textAlign:"center"},children:"Software Manta \xa92018 Created by ManTalents"})]})]})})},Ie={labelCol:{xs:{span:24},sm:{span:8}},wrapperCol:{xs:{span:24},sm:{span:16}}},_e={wrapperCol:{xs:{span:24,offset:0},sm:{span:16,offset:8}}},Fe=function(){var e=v.a.useForm(),t=Object(i.a)(e,1)[0];return Object(h.jsxs)(v.a,Object(Y.a)(Object(Y.a)({},Ie),{},{form:t,name:"register",onFinish:function(e){console.log("Received values of form: ",e)},initialValues:{residence:["zhejiang","hangzhou","xihu"],prefix:"86"},scrollToFirstError:!0,children:[Object(h.jsx)(v.a.Item,{name:"email",label:"E-mail",rules:[{type:"email",message:"The input is not valid E-mail!"},{required:!0,message:"Please input your E-mail!"}],children:Object(h.jsx)(y.a,{})}),Object(h.jsx)(v.a.Item,{name:"password",label:"Password",rules:[{required:!0,message:"Please input your password!"}],hasFeedback:!0,children:Object(h.jsx)(y.a.Password,{})}),Object(h.jsx)(v.a.Item,{name:"confirm",label:"Confirm Password",dependencies:["password"],hasFeedback:!0,rules:[{required:!0,message:"Please confirm your password!"},function(e){var t=e.getFieldValue;return{validator:function(e,n){return n&&t("password")!==n?Promise.reject(new Error("The two passwords that you entered do not match!")):Promise.resolve()}}}],children:Object(h.jsx)(y.a.Password,{})}),Object(h.jsx)(v.a.Item,{name:"nickname",label:"Nickname",tooltip:"What do you want others to call you?",rules:[{required:!0,message:"Please input your nickname!",whitespace:!0}],children:Object(h.jsx)(y.a,{})}),Object(h.jsx)(v.a.Item,Object(Y.a)(Object(Y.a)({},_e),{},{children:Object(h.jsx)(k.a,{type:"primary",htmlType:"submit",children:"Register"})}))]}))},Pe=n(125),Le=["component","isAuthenticated"],De=function(e){var t=e.component,n=e.isAuthenticated,a=Object(Pe.a)(e,Le);return Object(h.jsx)(g.b,Object(Y.a)(Object(Y.a)({},a),{},{render:function(e){return n?Object(h.jsx)(g.a,{to:"/app"}):Object(h.jsx)(t,Object(Y.a)({},e))}}))},ze=["component","isAuthenticated"],Me=function(e){var t=e.component,n=e.isAuthenticated,a=Object(Pe.a)(e,ze);return Object(h.jsx)(g.b,Object(Y.a)(Object(Y.a)({},a),{},{render:function(e){return n?Object(h.jsx)(t,Object(Y.a)({},e)):Object(h.jsx)(g.a,{to:"/auth"})}}))},Ee=function(){var e=Object(a.useContext)(f),t=e.auth,n=e.verificaToken;return Object(a.useEffect)((function(){n()}),[n]),Object(h.jsx)(F.a,{children:Object(h.jsxs)(g.d,{children:[Object(h.jsx)(Me,{isAuthenticated:t.logged,path:"/app",component:Se}),Object(h.jsx)(De,{isAuthenticated:t.logged,exact:!0,path:"/auth/login",component:C}),Object(h.jsx)(De,{isAuthenticated:t.logged,exact:!0,path:"/auth/register",component:Fe}),Object(h.jsx)(g.a,{to:"/auth/login"})]})})};o.a.render(Object(h.jsx)(r.a.StrictMode,{children:Object(h.jsx)(x,{children:Object(h.jsx)(Ee,{})})}),document.getElementById("root"))}},[[282,1,2]]]);
//# sourceMappingURL=main.3b39c4f7.chunk.js.map