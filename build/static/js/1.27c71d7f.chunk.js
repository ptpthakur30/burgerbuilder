webpackJsonp([1],{147:function(e,n,t){"use strict";function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function a(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!==typeof n&&"function"!==typeof n?e:n}function i(e,n){if("function"!==typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(e,n):e.__proto__=n)}Object.defineProperty(n,"__esModule",{value:!0}),t.d(n,"Auth",function(){return C});var l=t(0),u=t.n(l),c=t(148),s=t(47),A=t(160),d=t.n(A),p=t(6),b=t(9),h=t(13),g=t(12),m=t(48),f=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}(),C=function(e){function n(){var e,t,i,l;o(this,n);for(var u=arguments.length,c=Array(u),s=0;s<u;s++)c[s]=arguments[s];return t=i=a(this,(e=n.__proto__||Object.getPrototypeOf(n)).call.apply(e,[this].concat(c))),i.state={controls:{Email:{elementType:"input",elementConfig:{type:"text",placeholder:"Email Address"},validation:{required:!0,isEmail:!0},valid:!1,touched:!1,value:""},Password:{elementType:"input",elementConfig:{type:"password",placeholder:"Password"},validation:{required:!0,minLength:6},valid:!1,touched:!1,value:""}},isSignUp:!0},i.inputChangedHandler=function(e,n){var t=Object(h.b)(i.state.controls,r({},n,Object(h.b)(i.state.controls[n],{value:e.target.value,valid:Object(h.a)(e.target.value,i.state.controls[n].validation),touched:!0})));i.setState({controls:t})},i.authHandler=function(e){e.preventDefault(),i.props.onAuthSubmit(i.state.controls.Email.value,i.state.controls.Password.value,i.state.isSignUp)},i.switchAuthModeHandler=function(){i.setState(function(e){return{isSignUp:!e.isSignUp}})},l=t,a(i,l)}return i(n,e),f(n,[{key:"componentDidMount",value:function(){this.props.buildingBurger||"/"===this.props.authRedirectPath||this.props.onSetAuthRedirectPath()}},{key:"render",value:function(){var e=this,n=[];for(var t in this.state.controls)n.push({id:t,config:this.state.controls[t]});var r=u.a.createElement("form",{onSubmit:this.authHandler},n.map(function(n){return u.a.createElement(c.a,{key:n.id,elementName:n.id,elementType:n.config.elementType,elementConfig:n.config.elementConfig,value:n.config.value,valid:n.config.valid,shouldValidate:n.config.validation,touched:n.config.touched,changed:function(t){return e.inputChangedHandler(t,n.id)}})}),u.a.createElement(s.a,{btnType:"Success"},"SUBMIT"));this.props.loading&&(r=u.a.createElement(m.a,null));var o=null;this.props.error&&(o=u.a.createElement("p",null,this.props.error.message));var a=null;return this.props.isAuthenticated&&(a=u.a.createElement(b.c,{to:this.props.authRedirectPath})),u.a.createElement("div",{className:d.a.Auth},a,o,r,u.a.createElement(s.a,{btnType:"Danger",clicked:this.switchAuthModeHandler},"SWITCH TO ",this.state.isSignUp?"SIGNIN":"SIGNUP"))}}]),n}(l.Component),x=function(e){return{loading:e.auth.loading,error:e.auth.error,isAuthenticated:null!==e.auth.token,buildingBurger:e.burgerBuilder.building,authRedirectPath:e.auth.authRedirectPath}},v=function(e){return{onAuthSubmit:function(n,t,r){return e(g.b(n,t,r))},onSetAuthRedirectPath:function(){return e(g.j("/"))}}};n.default=Object(p.b)(x,v)(C)},148:function(e,n,t){"use strict";var r=t(0),o=t.n(r),a=t(149),i=t.n(a),l=function(e){var n=null,t=[i.a.InputElement],r=null;switch(!e.valid&&e.shouldValidate&&e.touched&&(t.push(i.a.Invalid),r=o.a.createElement("p",{className:i.a.ValidationError},"Please enter a valid ",e.elementName.toUpperCase())),t=t.join(" "),e.elementType){case"input":n=o.a.createElement("input",Object.assign({className:t},e.elementConfig,{value:e.value,onChange:e.changed}));break;case"textarea":n=o.a.createElement("textarea",Object.assign({className:t},e.elementConfig,{value:e.value,onChange:e.changed}));break;case"select":n=o.a.createElement("select",{className:t,value:e.value,onChange:e.changed},e.elementConfig.options.map(function(e){return o.a.createElement("option",{key:e.value,value:e.value},e.displayName)}));break;default:n=o.a.createElement("input",Object.assign({className:t},e.elementConfig,{value:e.value,onChange:e.changed}))}return o.a.createElement("div",{className:i.a.Input},o.a.createElement("label",{className:i.a.Label},e.label),n,r)};n.a=l},149:function(e,n,t){var r=t(150);"string"===typeof r&&(r=[[e.i,r,""]]);var o={hmr:!1};o.transform=void 0;t(144)(r,o);r.locals&&(e.exports=r.locals)},150:function(e,n,t){n=e.exports=t(143)(!0),n.push([e.i,".Input__Input__1VROp{width:100%;padding:10px;-webkit-box-sizing:border-box;box-sizing:border-box}.Input__Label__1tOSX{font-weight:700;display:block;margin-bottom:8px}.Input__InputElement__3TB0k{outline:none;border:1px solid #ccc;background-color:#fff;font:inherit;padding:6px 10px;display:block;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box}.Input__InputElement__3TB0k:focus{outline:none;background-color:#ccc}.Input__Invalid__38X2d{border:1px solid red;background-color:#fdb9b1}.Input__ValidationError__ukId8{color:red;margin:5px 0}","",{version:3,sources:["C:/React_Projects/burgerbuilder/src/components/UI/Input/Input.css"],names:[],mappings:"AAAA,qBACI,WAAW,AACX,aAAa,AACb,8BAA+B,AACvB,qBAAuB,CAClC,AAED,qBACI,gBAAkB,AAClB,cAAe,AACf,iBAAmB,CACtB,AAED,4BACI,aAAc,AACd,sBAAsB,AACtB,sBAAwB,AACxB,aAAa,AACb,iBAAkB,AAClB,cAAc,AACd,WAAY,AACZ,8BAA+B,AACvB,qBAAuB,CAClC,AAED,kCACI,aAAa,AACb,qBAAuB,CAC1B,AAED,uBACI,qBAAqB,AACrB,wBAAqC,CACxC,AAED,+BACI,UAAW,AACX,YAAc,CACjB",file:"Input.css",sourcesContent:[".Input{\r\n    width:100%;\r\n    padding:10px;\r\n    -webkit-box-sizing: border-box;\r\n            box-sizing: border-box;\r\n}\r\n\r\n.Label{\r\n    font-weight: bold;\r\n    display: block;\r\n    margin-bottom: 8px;\r\n}\r\n\r\n.InputElement{\r\n    outline: none;\r\n    border:1px solid #ccc;\r\n    background-color: white;\r\n    font:inherit;\r\n    padding: 6px 10px;\r\n    display:block;\r\n    width: 100%;\r\n    -webkit-box-sizing: border-box;\r\n            box-sizing: border-box;\r\n}\r\n\r\n.InputElement:focus{\r\n    outline:none;\r\n    background-color: #ccc;\r\n}\r\n\r\n.Invalid{\r\n    border:1px solid red;\r\n    background-color: rgb(253, 185, 177);\r\n}\r\n\r\n.ValidationError {\r\n    color: red;\r\n    margin: 5px 0;\r\n} "],sourceRoot:""}]),n.locals={Input:"Input__Input__1VROp",Label:"Input__Label__1tOSX",InputElement:"Input__InputElement__3TB0k",Invalid:"Input__Invalid__38X2d",ValidationError:"Input__ValidationError__ukId8"}},160:function(e,n,t){var r=t(161);"string"===typeof r&&(r=[[e.i,r,""]]);var o={hmr:!1};o.transform=void 0;t(144)(r,o);r.locals&&(e.exports=r.locals)},161:function(e,n,t){n=e.exports=t(143)(!0),n.push([e.i,".Auth__Auth__1TInt{margin:20px auto;width:80%;text-align:center;-webkit-box-shadow:0 2px 3px #ccc;box-shadow:0 2px 3px #ccc;border:1px solid #eee;padding:10px;-webkit-box-sizing:border-box;box-sizing:border-box}@media (min-width:600px){.Auth__Auth__1TInt{width:500px}}","",{version:3,sources:["C:/React_Projects/burgerbuilder/src/containers/Auth/Auth.css"],names:[],mappings:"AAAA,mBACI,iBAAmB,AACnB,UAAW,AACX,kBAAmB,AACnB,kCAAmC,AAC3B,0BAA2B,AACnC,sBAAsB,AACtB,aAAa,AACb,8BAA+B,AACvB,qBAAuB,CAClC,AAED,yBACI,mBACI,WAAY,CACf,CACJ",file:"Auth.css",sourcesContent:[".Auth{\r\n    margin : 20px auto;\r\n    width: 80%;\r\n    text-align: center;\r\n    -webkit-box-shadow: 0 2px 3px #ccc;\r\n            box-shadow: 0 2px 3px #ccc;\r\n    border:1px solid #eee;\r\n    padding:10px;\r\n    -webkit-box-sizing: border-box;\r\n            box-sizing: border-box;\r\n}\r\n\r\n@media (min-width:600px){\r\n    .Auth{\r\n        width:500px;\r\n    }\r\n}"],sourceRoot:""}]),n.locals={Auth:"Auth__Auth__1TInt"}}});
//# sourceMappingURL=1.27c71d7f.chunk.js.map