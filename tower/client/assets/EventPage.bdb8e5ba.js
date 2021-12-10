import{u as x,r as C,z as E,c as v,a as A,o as d,b as s,h as b,d as a,t as l,w as p,j as r,v as m,F as _,A as I,B as k}from"./vendor.e9603ee6.js";import{a as g,A as i,l as c,_ as S,e as y,c as f,r as V}from"./index.720575cb.js";class B{async getAll(t=""){const o=await g.get(t);i.attendees=o.data}async getEventAttendees(t){c.log(t);const o=await g.get("api/events/"+t+"/attendees");c.log(o),i.attendees=o.data}}const D=new B,U={setup(u){const t=x(),o=C({editable:{}});return E(async()=>{try{await y.getAll("api/events/"),await D.getEventAttendees(t.params.eventId),await f.getAll("api/events/"+t.params.eventId+"/comments")}catch(e){c.log(e)}}),{state:o,active:v(()=>i.events.find(e=>e.id==t.params.eventId)),events:v(()=>i.events),comments:v(()=>i.comments),account:v(()=>i.account),hasAttended:v(()=>!!i.attendees.find(h=>h.accountId===i.account.id)),async createComment(){try{o.editable.eventId=t.params.eventId,await f.createComment(o.editable),o.editable={}}catch(e){c.error(e)}},async edit(){try{await y.edit(t.params.eventId,o.editable),o.editable={}}catch(e){c.error(e)}},async cancel(){try{await y.cancel(t.params.eventId),V.push({name:"Home"})}catch(e){c.error(e)}},async attend(){try{let e={};e.eventId=t.params.eventId,e.accountId=this.account.id,await y.attend(e)}catch(e){c.error(e)}}}}},q={key:0,class:"eventDetails"},j={key:0,class:"bg-danger m-1 p-3 w-25 text-center"},M=["src"],N={class:"col-md-1 p-0"},T=["data-bs-target"],F=["disabled"],L=["id"],z={class:"modal-dialog modal-lg"},H={class:"modal-content"},P=a("div",{class:"modal-header"},[a("h5",{class:"modal-title"},"Edit event"),a("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),R={class:"modal-body"},Y={class:"row"},G={class:"col-8"},J={class:"col-4"},K={class:"col-4"},O={class:"col-4"},Q={class:"col-4"},W={class:"m-2"},X={class:"m-2"},Z={class:"m-2"},$={class:"m-4"},ee={class:"m-2"};function te(u,t,o,e,h,ae){const w=A("Comment");return d(),s(_,null,[e.active?(d(),s("div",q,[e.active.isCanceled?(d(),s("h1",j," Event is canceled ")):b("",!0),a("img",{src:e.active.coverImg,height:"200",class:"m-2 elevation-3",alt:""},null,8,M),a("div",N,[e.account.id==e.active.creatorId&&!e.active.isCanceled?(d(),s("i",{key:0,class:"selectable mdi mdi-pencil m-3","data-bs-toggle":"modal","data-bs-target":"#edit-"+e.active.id,title:"Edit","aria-label":"Edit event"},null,8,T)):b("",!0),e.account.id==e.active.creatorId&&!e.active.isCanceled?(d(),s("i",{key:1,class:"selectable mdi mdi-trash-can bg-danger rounded m-3",title:"Cancel","aria-label":"Cancel event",onClick:t[0]||(t[0]=n=>e.cancel())})):b("",!0),!e.active.isCanceled&&e.active.capacity>0?(d(),s("button",{key:2,onClick:t[1]||(t[1]=n=>e.attend()),class:"btn btn-success m-3",disabled:!e.account.id||e.hasAttended||e.active.capacity<=0||e.active.isCanceled},l(e.hasAttended?"You're attending!":"Attend"),9,F)):b("",!0),a("div",{id:"edit-"+e.active.id,class:"modal",tabindex:"-1"},[a("div",z,[a("div",H,[P,a("div",R,[a("form",{onSubmit:t[8]||(t[8]=p(n=>e.edit(),["prevent"]))},[a("div",Y,[a("div",G,[r(a("input",{"onUpdate:modelValue":t[2]||(t[2]=n=>e.state.editable.name=n),type:"text",class:"form-control",placeholder:"Event Name","aria-label":"Example text with button addon","aria-describedby":"button-addon1",required:""},null,512),[[m,e.state.editable.name]])]),a("div",J,[r(a("input",{"onUpdate:modelValue":t[3]||(t[3]=n=>e.state.editable.location=n),type:"text",class:"form-control",placeholder:"Location","aria-label":"Example text with button addon","aria-describedby":"button-addon1",required:""},null,512),[[m,e.state.editable.location]])]),a("div",K,[r(a("input",{"onUpdate:modelValue":t[4]||(t[4]=n=>e.state.editable.capacity=n),type:"number",class:"form-control",placeholder:"Capacity","aria-label":"Example text with button addon","aria-describedby":"button-addon1",required:""},null,512),[[m,e.state.editable.capacity]])]),a("div",O,[r(a("input",{"onUpdate:modelValue":t[5]||(t[5]=n=>e.state.editable.type=n),type:"text",class:"form-control",placeholder:"Type","aria-label":"Example text with button addon","aria-describedby":"button-addon1",required:""},null,512),[[m,e.state.editable.type]])]),a("div",Q,[r(a("input",{"onUpdate:modelValue":t[6]||(t[6]=n=>e.state.editable.description=n),type:"text",class:"form-control",placeholder:"Description","aria-label":"Example text with button addon","aria-describedby":"button-addon1",required:""},null,512),[[m,e.state.editable.description]])])]),a("button",{type:"submit","data-bs-dismiss":"modal",class:"btn btn-primary m-1",onSubmit:t[7]||(t[7]=p(n=>e.edit(),["prevent"]))}," edit ",32)],32)])])])],8,L)]),a("h1",W,l(e.active.name),1),a("h4",X,l(e.active.location)+", "+l(e.active.capacity)+" spots left",1),a("h5",Z,"Event Type: "+l(e.active.type),1),a("p",$,l(e.active.description),1),a("p",ee,"Begins "+l(new Date(e.active.startDate)),1)])):b("",!0),a("form",{onSubmit:t[10]||(t[10]=p(n=>e.createComment(),["prevent"]))},[r(a("input",{class:"form-control w-25","onUpdate:modelValue":t[9]||(t[9]=n=>e.state.editable.body=n),type:"text",placeholder:"comment"},null,512),[[m,e.state.editable.body]])],32),(d(!0),s(_,null,I(e.comments,n=>(d(),k(w,{key:n.id,comment:n},null,8,["comment"]))),128))],64)}var de=S(U,[["render",te]]);export{de as default};
