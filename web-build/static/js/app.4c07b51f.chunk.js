(this.webpackJsonp=this.webpackJsonp||[]).push([[0],{1053:function(e,t,a){e.exports=a.p+"static/media/header-logo.36285ab0.png"},483:function(e,t,a){"use strict";a(1054);var n=a(484),r=a(0),o=a.n(r),l=a(1072),c=a(16),i=a(5),s=a.n(i),u=a(1073),m=a(75),d=a(11),p=a(9),g=a(4),E=a.n(g),h=a(111),b=a(92),f=a(1074),x=(a(818),a(819),a(35));0===x.a.apps.length?x.a.initializeApp({apiKey:"AIzaSyDFkmvkSy3qAx7ll6wAGjaekSBq7wF-t-Q",authDomain:"bar-voyage.firebaseapp.com",projectId:"bar-voyage",storageBucket:"bar-voyage.appspot.com",messagingSenderId:"849460714825",appId:"1:849460714825:web:86fb0b8c8c7f599a704e98",measurementId:"G-NV606M8BLB"}):x.a.app();var y=x.a.auth(),S=a(76),w=function(){var e=Object(b.k)(),t=Object(c.useToast)(),a=Object(r.useState)(""),n=E()(a,2),l=n[0],i=n[1];S.a.getItem("user_name").then((function(e){i(e)}));return o.a.createElement(c.Menu,{trigger:function(e){return o.a.createElement(h.a,e,o.a.createElement(f.a,{name:"person",size:40}))}},o.a.createElement(c.Menu.Item,{isDisabled:!0},o.a.createElement(c.Text,{style:v.user},"\ud83e\udd29 \xa0 ",l)),o.a.createElement(c.Menu.Item,{isDisabled:y.currentUser},o.a.createElement(h.a,{onPress:function(){y.signOut().then((function(){e.navigate("Login"),t.show({title:"Logged out",status:"success",description:"See you later, "+l+" \ud83d\udc4b"})})).catch((function(e){return alert(e.message)}))}},o.a.createElement(c.Text,null,"Logout"))),o.a.createElement(c.Divider,null),o.a.createElement(c.Menu.Item,null,o.a.createElement(c.Text,null,"Settings")),o.a.createElement(c.Menu.Item,null,o.a.createElement(c.Text,null,"Privacy Policy")))},v=p.a.create({user:{fontSize:16,fontWeight:"bold",color:"black"}}),k=a(158),T=a(81),C=a(475),z=a.n(C).a.create({baseURL:"https://ec2-52-15-235-6.us-east-2.compute.amazonaws.com"}),_=function(){var e=Object(r.useState)(""),t=E()(e,2),a=t[0],n=t[1],l=Object(r.useState)(""),i=E()(l,2),s=i[0],u=i[1],m=Object(b.k)();Object(r.useEffect)((function(){return y.onAuthStateChanged((function(e){e&&m.replace("Survey")}))}),[]);return o.a.createElement(c.Center,null,o.a.createElement(c.Heading,{size:"4xl",pt:38},"\ud83c\udf7b"),o.a.createElement(c.Heading,{size:"3xl",pb:3},"Bar Voyage"),o.a.createElement(c.HStack,{pb:8},o.a.createElement(c.Text,{italic:!0},"Nights out have never been better"),o.a.createElement(c.Text,null,"\ud83d\ude0e")),o.a.createElement(k.a,{style:I.container,behavior:"padding"},o.a.createElement(d.a,{style:I.inputContainer},o.a.createElement(T.a,{placeholder:"Email",value:a,onChangeText:function(e){return n(e)},style:I.input}),o.a.createElement(T.a,{placeholder:"Password",value:s,onChangeText:function(e){return u(e)},style:I.input,secureTextEntry:!0})),o.a.createElement(d.a,{style:I.buttonContainer},o.a.createElement(c.Button,{onPress:function(){console.log(a,s),z.post("/login",{email:a,password:s}).then((function(e){console.log("response for login get",e),console.log("response.data.user_id",e.data),S.a.setItem("user_id",e.data.user_id),S.a.setItem("user_name",e.data.fname)})),y.signInWithEmailAndPassword(a,s).then((function(e){var t=e.user;console.log("Logged in with:",t.email)})).catch((function(e){return alert(e.message)}))},style:I.button},o.a.createElement(c.Text,{style:I.buttonText},"Login \u2192")),o.a.createElement(c.Button,{onPress:function(){m.navigate("SignUp")},style:[I.button,I.buttonOutline]},o.a.createElement(c.Text,{style:I.buttonOutlineText},"Sign up")))))},I=p.a.create({container:{flex:1,alignItems:"center",width:"80%",paddingTop:40},inputContainer:{width:"100%"},input:{backgroundColor:"white",paddingHorizontal:20,paddingVertical:10,marginTop:10,borderRadius:20,fontSize:20},buttonContainer:{width:"80%",justifyContent:"center",alignItems:"center",marginTop:50},button:{width:"100%",alignItems:"center"},buttonOutline:{backgroundColor:"white",marginTop:10,borderColor:"#2596be",borderWidth:2},buttonText:{color:"white",fontWeight:"bold",fontSize:20,paddingVertical:15},buttonOutlineText:{color:"#2596be",fontWeight:"bold",fontSize:20,paddingVertical:15}}),B=function(){var e=Object(r.useState)(""),t=E()(e,2),a=t[0],n=t[1],l=Object(r.useState)(""),i=E()(l,2),s=i[0],u=i[1],m=Object(r.useState)(""),p=E()(m,2),g=p[0],h=p[1],b=Object(r.useState)(""),f=E()(b,2),x=f[0],w=f[1],v=Object(c.useToast)();return o.a.createElement(c.Center,null,o.a.createElement(c.Heading,{size:"4xl",pt:38},"\xa0"),o.a.createElement(c.Heading,{size:"2xl",pb:3},"Create Account"),o.a.createElement(c.HStack,{pb:8},o.a.createElement(c.Text,{italic:!0},"Welcome! Bar hopping journeys await you"),o.a.createElement(c.Text,null,"\ud83d\udea2")),o.a.createElement(k.a,{style:O.container,behavior:"padding"},o.a.createElement(d.a,{style:O.inputContainer},o.a.createElement(T.a,{placeholder:"First Name",value:s,onChangeText:function(e){return u(e)},style:O.input}),o.a.createElement(T.a,{placeholder:"Last Name",value:g,onChangeText:function(e){return h(e)},style:O.input}),o.a.createElement(T.a,{placeholder:"Email",value:a,onChangeText:function(e){return n(e)},style:O.input}),o.a.createElement(T.a,{placeholder:"Password",value:x,onChangeText:function(e){return w(e)},style:O.input,secureTextEntry:!0})),o.a.createElement(d.a,{style:O.buttonContainer},o.a.createElement(c.Button,{onPress:function(){""==s||""==g?alert("please enter a name"):y.createUserWithEmailAndPassword(a,x).then((function(e){var t,a,n,r,o=e.user;t=o.email,a=x,n=s,r=g,console.log(n,r),z.post("/register",{email:t,password:a,fname:n,lname:r}).then((function(e){console.log("registerUser response",e),z.post("/login",{email:t,password:a}).then((function(e){S.a.setItem("user_id",e.data.user_id),S.a.setItem("user_name",e.data.fname),S.a.getItem("user_name").then((function(e){console.log("user name value in sign up: ",e)})),S.a.getItem("user_id").then((function(e){console.log("user_id value IN SIGNUP",e)}))}))})),console.log("Registered with:",o.email,s,g),v.show({title:"Account created",status:"success",description:"Now let's get this show on the road! \ud83e\udd73"})})).catch((function(e){return alert(e.message)}))},style:O.button},o.a.createElement(c.Text,{style:O.buttonText},"Sign up")))))},O=p.a.create({container:{flex:1,alignItems:"center",width:"80%",paddingTop:40},inputContainer:{width:"100%"},input:{backgroundColor:"white",paddingHorizontal:20,paddingVertical:10,marginTop:10,borderRadius:20,fontSize:20},buttonContainer:{width:"80%",justifyContent:"center",alignItems:"center",marginTop:50},button:{width:"100%",alignItems:"center"},buttonText:{color:"white",fontWeight:"bold",fontSize:20,paddingVertical:15}}),P=a(6),j=a.n(P),H=a(319),W=function(e){var t=e.navigation,a=o.a.useState([]),n=E()(a,2),r=n[0],l=n[1],i=o.a.useState(null),s=E()(i,2),u=(s[0],s[1]),m=o.a.useState(),d=E()(m,2),p=(d[0],d[1]),g=o.a.useState(),h=E()(g,2),b=h[0],f=h[1];S.a.getItem("user_name").then((function(e){f(e),console.log(e)}));return o.a.createElement(c.Center,{height:"100%"},o.a.createElement(c.Heading,{size:"xl"},"Hey ",b,"!"),o.a.createElement(c.Heading,{size:"lg"},"What are the vibes for tonight?"),o.a.createElement(c.Checkbox.Group,{onChange:l,value:r,accessibilityLabel:"choose numbers"},o.a.createElement(c.VStack,{py:6},o.a.createElement(c.Checkbox,{value:"karaoke",my:2},o.a.createElement(c.Text,{style:L.checkboxText},"Karaoke \ud83c\udfa4")),o.a.createElement(c.Checkbox,{value:"dive bar",my:2},o.a.createElement(c.Text,{style:L.checkboxText},"Dive Bar \ud83c\udf7a")),o.a.createElement(c.Checkbox,{value:"club",my:2},o.a.createElement(c.Text,{style:L.checkboxText},"Club \ud83c\udf7e")),o.a.createElement(c.Checkbox,{value:"sports",my:2},o.a.createElement(c.Text,{style:L.checkboxText},"Sports \ud83c\udfc8")),o.a.createElement(c.Checkbox,{value:"dancing",my:2},o.a.createElement(c.Text,{style:L.checkboxText},"Dancing \ud83d\udd7a")),o.a.createElement(c.Checkbox,{value:"lgbtq+",my:2},o.a.createElement(c.Text,{style:L.checkboxText},"LGBTQ+ \ud83c\udf08")))),o.a.createElement(c.Box,{width:"80%"},o.a.createElement(c.Button,{onPress:function(){S.a.getItem("user_id").then((function(e){console.log("groupValues",r),console.log("user_id",e),function(){var e,t;j.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,j.a.awrap(H.b());case 2:if(e=a.sent,"granted"===e.status){a.next=7;break}return p("Permission to access location was denied"),a.abrupt("return");case 7:return a.next=9,j.a.awrap(H.a({}));case 9:t=a.sent,console.log(t),u(t);case 12:case"end":return a.stop()}}),null,null,null,Promise)}(),z.post("/user-pref",{pref:r,user_id:e}).then((function(e){console.log("user pref response",e),t.navigate("Map")}))}))}},o.a.createElement(c.Text,{style:L.buttonText},"Next \u2192"))))},L=p.a.create({checkboxText:{fontSize:32,marginLeft:8},buttonText:{fontSize:28,fontWeight:"bold",color:"white",paddingVertical:10}}),N=a(485),M=a(486),A=a(113),V=function(e){var t=e.iconName,a=e.details;return o.a.createElement(c.HStack,null,o.a.createElement(f.a,{name:t,size:24}),o.a.createElement(c.Text,{pl:2},a))},R=function(e){return o.a.createElement(c.Button,{onPress:e.onPressChooseBar},o.a.createElement(c.Text,{style:G.text},"Check-in here!"))},G=p.a.create({text:{fontSize:22,fontWeight:"bold",color:"white",paddingVertical:15,paddingHorizontal:25}}),D=function(e){var t=e.bar,a=e.blurContent,n=e.onPressChooseBar,r=a?5:0,l=t.address+", "+t.city+", "+t.state+" "+t.zip;return o.a.createElement(c.Container,null,o.a.createElement(c.VStack,{space:4,pt:8,pb:4},o.a.createElement(c.Heading,{size:"xl"},t.name),o.a.createElement(V,{iconName:"location-pin",details:l}),o.a.createElement(c.Divider,{my:-2}),o.a.createElement(V,{iconName:"access-time",details:t.hours}),o.a.createElement(c.Divider,{my:-2}),o.a.createElement(V,{iconName:"description",details:t.description}),o.a.createElement(c.Divider,{my:-2}),o.a.createElement(V,{iconName:"attach-money",details:t.deals}),o.a.createElement(c.Stack,{space:1,pt:8,alignItems:"center"},o.a.createElement(c.VStack,{space:3,alignItems:"center"},o.a.createElement(c.HStack,{space:3},o.a.createElement(c.Image,{source:{uri:"https://gwtoday.gwu.edu/sites/g/files/zaxdzs1531/f/styles/gw_editorial_article_full/public/image/SEH17_SEH_UP_2015-WLA_6446_1080x.jpg?itok=9egdRwXz"},alt:"Photo of xyz",size:"xl",blurRadius:r}),o.a.createElement(c.Image,{source:{uri:"https://s3-media3.fl.yelpcdn.com/bphoto/7jr8YBqSzqG6fPGF6LmNrw/o.jpg"},alt:"Photo of xyz",size:"xl",blurRadius:r})),o.a.createElement(c.HStack,{space:3},o.a.createElement(c.Image,{source:{uri:"https://www.washingtonian.com/wp-content/uploads/2017/01/MG_0098.jpg"},alt:"Photo of xyz",size:"xl",blurRadius:r}),o.a.createElement(c.Image,{source:{uri:"https://z0sqrs-a.akamaihd.net/3207-mcguiresirishpub/images/display-records/galleries/pensacola-packed-bar.jpg"},alt:"Photo of xyz",size:"xl",blurRadius:r})))),o.a.createElement(c.Box,{alignItems:"center",pt:8},o.a.createElement(R,{onPressChooseBar:n}))))},U=function(e){var t=e.filled,a=e.onClick;return o.a.createElement(N.a,{color:t?"orange":"lightgray",size:36,onClick:a})},F=function(e){var t=e.text,a=Object(r.useState)(!1),n=E()(a,2),l=n[0],i=n[1];return o.a.createElement(h.a,{onPress:function(){i(!l)}},o.a.createElement(c.Badge,{variant:l?"solid":"outline"},o.a.createElement(c.Text,{color:l?"white":"black"},t)))},q=function(e){var t=e.route,a=e.navigation,n=t.params,l=(n.address,n.avg_stars,n.bar_id),i=(n.city,n.deals,n.description,n.hours,n.imageLinks,n.is_open,n.latitude,n.longitude,n.name),s=(n.review_count,n.state,n.zip,Object(r.useState)(!1)),u=E()(s,2),d=u[0],p=u[1],g=Object(c.useToast)(),h=Object(r.useState)(0),b=E()(h,2),x=b[0],y=b[1],S=Object(r.useState)(null),w=E()(S,2),v=w[0],k=w[1];return o.a.createElement(c.Center,null,o.a.createElement(c.Modal,{isOpen:d,onClose:function(){return p(!1)},size:"xl"},o.a.createElement(c.Modal.Content,null,o.a.createElement(c.Modal.CloseButton,null),o.a.createElement(c.Modal.Header,null,o.a.createElement(c.Text,{style:J.modalHeader},"What do you think of ",i,"?")),o.a.createElement(c.Modal.Body,null,o.a.createElement(c.Center,null,o.a.createElement(c.HStack,{pb:5,space:"sm"},Array(5).fill().map((function(e,t){return o.a.createElement(U,{key:t,filled:t<x,onClick:function(){return y(t+1)}})}))),o.a.createElement(c.HStack,{space:4},o.a.createElement(F,{text:"crowded"}),o.a.createElement(F,{text:"good music"}),o.a.createElement(F,{text:"fun"})),o.a.createElement(c.HStack,{space:4,pt:4},o.a.createElement(F,{text:"cheap drinks"}),o.a.createElement(F,{text:"has cover"}),o.a.createElement(F,{text:"dirty"})),o.a.createElement(c.HStack,{space:4,pt:4},o.a.createElement(F,{text:"boring"}),o.a.createElement(F,{text:"expensive"}),o.a.createElement(F,{text:"young crowd"})),o.a.createElement(c.Box,{pt:8,pb:8,alignItems:"center"},o.a.createElement(c.Box,{p:"4",rounded:"10",borderWidth:3,borderColor:"#2596be"},o.a.createElement(c.Text,{style:J.text,pt:4},"Help fellow bar-goers out \ud83d\ude4f"),o.a.createElement(c.Text,{style:J.text},"Upload your photos/videos below!"),o.a.createElement(c.Box,{alignItems:"center"},o.a.createElement(c.IconButton,{_icon:{as:f.a,name:"file-upload",size:100},onPress:function(){var e,t,a;return j.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,j.a.awrap(M.a({mediaTypes:A.a.All,allowsEditing:!0,aspect:[4,3],quality:1}));case 2:if(e=n.sent,console.log(e),e.cancelled){n.next=13;break}return n.next=7,j.a.awrap(fetch(e.uri));case 7:return t=n.sent,n.next=10,j.a.awrap(t.blob());case 10:a=n.sent,console.log("blooob",a),k(a);case 13:case"end":return n.stop()}}),null,null,null,Promise)},style:J.uploadButton}),v&&o.a.createElement(m.a,{source:{uri:v},style:{width:200,height:200}})))))),o.a.createElement(c.Modal.Footer,null,o.a.createElement(c.Button,{onPress:function(){a.navigate("Map"),function(){var e=new FormData;console.log("image",v),null!=v&&(e.append("photo",v,"photo.png"),e.append("bar_id",1),e.append("user_id",55),z.post("/upload_photo",{data:e,headers:{"Content-Type":"multipart/form-data"}}).catch((function(e){console.log(e.toJSON()),g.show({title:"Oops! Something went wrong",status:"error",description:"Our team is working on it - please try again later!"})})).then((function(e){console.log("response.data",e)}))),z.post("/rating",{bar_id:l,num_stars:x}).catch((function(e){console.log(e.toJSON()),g.show({title:"Oops! Something went wrong",status:"error",description:"Our team is working on it - please try again later!"})})).then((function(e){console.log("response.data",e),g.show({title:"Submitted",status:"success",description:"Thanks! We appreciate you \ud83d\udc9b \nYour rating was "+x})}))}()}},o.a.createElement(c.Text,{style:J.submitButtonText},"Submit"))))),o.a.createElement(D,{bar:t.params,blurContent:!1,onPressChooseBar:function(){return p(!0)}}))},J=p.a.create({modalHeader:{fontSize:24,fontWeight:"bold"},text:{fontSize:16},submitButtonText:{color:"white",paddingHorizontal:15,paddingVertical:8,fontSize:24,fontWeight:"bold"},uploadButton:{flex:1,alignItems:"center"}}),Y=a(157),K=(a(1061),a(844),function(e){var t=e.name,a=e.avgStars,n=e.imageUrl;return o.a.createElement(c.Box,{borderBottomWidth:"1",_dark:{borderColor:"gray.600"},borderColor:"coolGray.200",pl:"4",pr:"5",py:"2"},o.a.createElement(c.HStack,{space:3,justifyContent:"space-between"},o.a.createElement(c.Image,{size:"lg",source:{uri:n},alt:t}),o.a.createElement(c.VStack,null,o.a.createElement(c.Text,{fontSize:"lg",_dark:{color:"warmGray.50"},bold:!0},t),o.a.createElement(c.Box,{maxWidth:"180px"},o.a.createElement(c.HStack,{pt:2},Array(a).fill().map((function(e,t){return o.a.createElement(f.a,{name:"star",size:22,key:t})})),Array(5-a).fill().map((function(e,t){return o.a.createElement(f.a,{name:"star-outline",size:22,key:t})}))))),o.a.createElement(c.Spacer,null),o.a.createElement(c.Text,{fontSize:"sm",_dark:{color:"warmGray.50"},color:"coolGray.800",alignSelf:"flex-start"},"0.2 mi")))}),Q=function(e){var t=e.navigation,a=Object(r.useState)([]),n=E()(a,2),l=n[0],i=n[1];return console.log("bars in beginning",l),o.a.useEffect((function(){S.a.getItem("user_id").then((function(e){console.log("user_id value",e),z.post("/rec_bars",{user_id:e}).then((function(e){console.log("getRecBars response.data",e.data),i(e.data),console.log("BARS",l)}))}))}),[]),o.a.createElement(o.a.Fragment,null,o.a.createElement(c.Box,{h:"100%",w:{base:"100%",md:"25%"}},o.a.createElement(c.Heading,{fontSize:"xl",p:"4",pb:"3"},"Your Recommendations"),o.a.createElement(c.FlatList,{data:l,renderItem:function(e){var a=e.item;return o.a.createElement(Y.a,{onPress:function(){return t.navigate("BarInfo",a)}},o.a.createElement(K,{name:a.name,avgStars:a.avg_stars,imageUrl:a.img_url}))},keyExtractor:function(e){return e.bar_id}})))},X=Object(u.a)(),Z={options:{headerTitle:function(){return o.a.createElement(d.a,null,o.a.createElement(m.a,{source:a(1053),style:$.headerLogo,alt:"bar voyage header logo"}))},headerRight:function(){return o.a.createElement(w,null)}}},$=p.a.create({headerLogo:{height:50,width:80}}),ee=function(){return o.a.createElement(X.Navigator,null,o.a.createElement(X.Screen,s()({name:"Login",component:_},Z)),o.a.createElement(X.Screen,s()({name:"SignUp",component:B},Z)),o.a.createElement(X.Screen,s()({name:"Survey",component:W},Z)),o.a.createElement(X.Screen,s()({name:"Map",component:Q},Z)),o.a.createElement(X.Screen,s()({name:"BarInfo",component:q},Z)))};t.a=function(){return o.a.createElement(c.NativeBaseProvider,null,o.a.createElement(n.a,{style:"auto"}),o.a.createElement(l.a,null,o.a.createElement(ee,null)))}},491:function(e,t,a){e.exports=a(1057)}},[[491,1,2]]]);
//# sourceMappingURL=app.4c07b51f.chunk.js.map