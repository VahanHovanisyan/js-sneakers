import{c as e,a as _,f as w,g as L,r as C}from"./index-Cbhle2ea.js";const y="_hero_vjenf_1",E="_content_vjenf_5",T="_title_vjenf_12",N="_catalog_vjenf_20",b={hero:y,content:E,title:T,catalog:N},j="_card_16c56_1",U="_link_16c56_17",I="_btn_16c56_30",A="_btnFavorite_16c56_35",F="_bottom_16c56_52",q="_priceText_16c56_58",M="_priceNumber_16c56_66",$="_btnChecked_16c56_73",H="_img_16c56_88",O="_title_16c56_94",R="_icon_16c56_103",P="_icon_checked_16c56_108",B="_load_16c56_113",D="_load_img_16c56_119",J="_load_text_16c56_125",n={card:j,link:U,btn:I,btnFavorite:A,bottom:F,priceText:q,priceNumber:M,btnChecked:$,img:H,title:O,icon:R,icon_checked:P,load:B,load_img:D,load_text:J};function z({id:s="",title:c="",titleSmall:p="",imgUrl:v="",price:f="",onAddToCart:d=()=>{},onAddToFavorite:k=()=>{}}={}){const a=e({tag:"article",classList:[n.card],attributes:{"data-card":s}});e({tag:"a",classList:[n.link],parent:a});const g=document.createElementNS("http://www.w3.org/2000/svg","svg");g.classList.add(n.icon);const t=document.createElementNS("http://www.w3.org/2000/svg","svg");t.classList.add(n.icon_checked);const l=document.createElementNS("http://www.w3.org/2000/svg","use"),h=document.createElementNS("http://www.w3.org/2000/svg","use");l.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href","img/svg/sprite.svg#favorite"),h.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href","img/svg/sprite.svg#cardUnChecked"),_.forEach(m=>{m.id===s&&h.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href","img/svg/sprite.svg#cardChecked")}),w.forEach(m=>{m.id===s&&l.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href","img/svg/sprite.svg#favoriteActive")}),g.appendChild(l),t.appendChild(h);let i=!1;e({tag:"button",classList:[n.btnFavorite,n.btn,"buttonReset"],params:{onclick:()=>{var m;l.getAttribute("xlink:href")==="img/svg/sprite.svg#favoriteActive"&&(i=!0,window.location.href.includes("favorite")&&((m=a.parentElement)==null||m.remove())),i=!i,k(),l.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",i?"img/svg/sprite.svg#favoriteActive":"img/svg/sprite.svg#favorite")}},parent:window.location.pathname==="/profile"?null:a}).append(g),v?e({tag:"img",classList:[n.img],params:{src:v,alt:p},parent:a}):e({tag:"div",classList:[n.load,n.load_img],parent:a});const r=e({tag:"div",classList:[n.bottom],parent:a});let u=!1;return e({tag:"button",classList:[n.btnChecked,n.btn,"buttonReset"],params:{onclick:()=>{h.getAttribute("xlink:href")==="img/svg/sprite.svg#cardChecked"?u=!0:u=!1,u=!u,d(),h.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",u?"img/svg/sprite.svg#cardChecked":"img/svg/sprite.svg#cardUnChecked")}},parent:window.location.pathname==="/profile"?null:r}).append(t),c&&p?e({tag:"h3",classList:[n.title],params:{textContent:p+c},parent:a}):e({tag:"div",classList:[n.load,n.load_text],parent:a}),e({tag:"span",classList:[n.priceText],params:{textContent:"Цена:"},parent:r}),f?e({tag:"span",classList:[n.priceNumber],params:{textContent:f},parent:r}):e({tag:"div",classList:[n.load,n.load_text],parent:r}),a}function G(){const s=e({tag:"label",classList:["search"],params:{innerHTML:`
        <svg class="search__icon">
          <use xlink:href="img/svg/sprite.svg#search"></use>
        </svg>
        <input class="search__input" type="text" placeholder="Поиск по названию">
      `}}),c=e({tag:"button",classList:["search__button-remove","buttonReset"],params:{onclick:()=>{s.querySelector(".search__input").value="",c.remove()},type:"button",innerHTML:'<svg class="search__icon search__icon_remove"><use xlink:href="img/svg/sprite.svg#cartIconRemove"></use></svg>'}});return s.querySelector(".search__input").addEventListener("input",()=>{s.querySelector(".search__input").value===""?c.remove():s.append(c)}),{search:s,searchInput:s.querySelector(".search__input"),searchButtonRemove:c}}const K=[{titleSmall:"",price:"",imgUrl:""},{titleSmall:"",price:"",imgUrl:""},{titleSmall:"",price:"",imgUrl:""},{titleSmall:"",price:"",imgUrl:""},{titleSmall:"",price:"",imgUrl:""},{titleSmall:"",price:"",imgUrl:""}],{search:x,searchInput:S,searchButtonRemove:Q}=G();function X(s){const c=e({tag:"section",classList:[b.hero]}),p=e({tag:"div",classList:["container",b.container],parent:c}),v=e({tag:"div",classList:[b.content],parent:p}),f=e({tag:"h1",classList:[b.title],params:{textContent:"все Кроссовки"},parent:v});v.append(x);const d=e({tag:"ul",classList:[b.catalog],parent:p});S.addEventListener("input",()=>{d.innerHTML="",a(s)}),Q.addEventListener("click",()=>{d.innerHTML="",a(s)}),d.innerHTML="",a(s);function k(g=0,t){const l=L({imgUrl:t==="#/profile"?"img/profileSmile.png":"img/sedSmile.png",title:t==="#/profile"?"У вас нет заказов":"Закладок нет :(",description:t==="#/profile"?"Вы нищеброд? Оформите хотя бы один заказ.":"Вы ничего не добавляли в закладки",closeInfo(){C.navigate("/")}});(s==null?void 0:s.length)===g?(d.remove(),x.remove(),f.remove(),p.append(l)):l.remove()}k(0,window.location.hash);function a(g=K){return g.filter(t=>t.titleSmall.toLowerCase().includes(S.value.toLowerCase())).forEach(t=>{const l=e({tag:"li",classList:["hero__card"],parent:d}),h=z({id:t.id,title:t.title,titleSmall:t.titleSmall,price:t.price,imgUrl:t.imgUrl,onAddToFavorite(){var o;const i=w.find(r=>r.id===t.id);if(i){k(1,window.location.hash),(o=document.querySelector(`[data-card="${i.id}"]`))==null||o.querySelectorAll("use")[0].setAttributeNS("http://www.w3.org/1999/xlink","xlink:href","img/svg/sprite.svg#favorite");let r=w.indexOf(i);w.splice(r,1),fetch(`https://my-project-87c87-default-rtdb.europe-west1.firebasedatabase.app/favorite/${i.key||i.keyId}.json`,{method:"DELETE"});return}fetch("https://my-project-87c87-default-rtdb.europe-west1.firebasedatabase.app/favorite.json",{method:"POST",body:JSON.stringify(t),headers:{"Content-Type":"application/json"}}).then(r=>r.json()).then(r=>{w.push({id:t.id,keyId:r.name,title:t.title,titleSmall:t.titleSmall,price:t.price,imgUrl:t.imgUrl})})},onAddToCart(){const i=_.find(o=>o.id===t.id);if(i){document.querySelector(".nav__icon-text_total-price").textContent=`${Math.abs(_.reduce((r,u)=>r-u.price,i.price))} руб.`;let o=_.indexOf(i);_.splice(o,1),fetch(`https://my-project-87c87-default-rtdb.europe-west1.firebasedatabase.app/cart/${i.key||i.keyId}.json`,{method:"DELETE"});return}document.querySelector(".nav__icon-text_total-price").textContent=`${Math.abs(_.reduce((o,r)=>r.price+o,t.price))} руб.`,fetch("https://my-project-87c87-default-rtdb.europe-west1.firebasedatabase.app/cart.json",{method:"POST",body:JSON.stringify(t),headers:{"Content-Type":"application/json"}}).then(o=>o.json()).then(o=>{_.push({id:t.id,key:o.name,title:t.title,titleSmall:t.titleSmall,price:t.price,imgUrl:t.imgUrl})})}});l.append(h)})}return{hero:c,heroContainer:p,heroTitle:f,cardsList:d}}export{K as a,X as g};