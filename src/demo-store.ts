import {catalog,itemPrice} from './catalog';
const KEY='demo-subscriptions:v1';
type LocalData={version:1; signedIn:boolean;profile:{name:string;email:string};orders:any[];favorites:string[];tickets:any[]};
function empty():LocalData{return {version:1,signedIn:false,profile:{name:'Гость DEMO',email:'demo@example.test'},orders:[],favorites:[],tickets:[]};}
function read():LocalData{
 const raw=localStorage.getItem(KEY);if(!raw)return empty();
 const d=JSON.parse(raw);if(d.version!==1||!d.profile||!Array.isArray(d.orders)||!Array.isArray(d.favorites)||!Array.isArray(d.tickets))throw Error('Локальные данные повреждены. Очисти данные сайта в браузере.');
 return d;
}
function save(d:LocalData){try{localStorage.setItem(KEY,JSON.stringify(d));}catch{throw Error('Браузер не разрешает сохранить данные. Освободи место или разреши локальное хранилище.');}}
export function readStore(){const d=read();return {products:catalog,user:d.signedIn?d.profile:null,orders:d.signedIn?d.orders:[],favorites:d.signedIn?d.favorites:[],tickets:d.signedIn?d.tickets:[]};}
export function signIn(){const d=read();d.signedIn=true;save(d);}
export function signOut(){const d=read();d.signedIn=false;save(d);}
export function writeStore(payload:any){
 const d=read();if(!d.signedIn)throw Error('Сначала войди в демоаккаунт.');
 if(payload.action==='order'){
  if(!Array.isArray(payload.items)||!payload.items.length||payload.items.length>catalog.length)throw Error('Проверь корзину.');
  if(d.orders.some(o=>o.id===payload.id))return;
  const now=new Date();const seen=new Set();
  const items=payload.items.map((item:any)=>{
   const p=catalog.find(p=>p.id===item.productId);
   if(!p||![1,3,12].includes(item.months)||seen.has(p.id))throw Error('Некорректный тариф.');
   seen.add(p.id);const end=new Date(now);const day=end.getUTCDate();end.setUTCDate(1);end.setUTCMonth(end.getUTCMonth()+item.months);const maxDay=new Date(Date.UTC(end.getUTCFullYear(),end.getUTCMonth()+1,0)).getUTCDate();end.setUTCDate(Math.min(day,maxDay));
   return {id:crypto.randomUUID(),product_id:p.id,name:p.name,months:item.months,price:itemPrice(p.price,item.months),expires_at:end.toISOString()};
  });
  d.orders.unshift({id:payload.id,total:items.reduce((sum:number,i:any)=>sum+i.price,0),status:'demo_active',created_at:now.toISOString(),items});
 }else if(payload.action==='cancel'){
  const order=d.orders.find(o=>o.id===payload.id);if(!order)throw Error('Заказ не найден.');order.status='cancelled';
 }else if(payload.action==='favorite'){
  if(!catalog.some(p=>p.id===payload.productId))throw Error('Подписка не найдена.');
  d.favorites=d.favorites.filter(id=>id!==payload.productId);if(payload.enabled)d.favorites.push(payload.productId);
 }else if(payload.action==='profile'){
  if(typeof payload.name!=='string'||payload.name.trim().length<2||payload.name.trim().length>60)throw Error('Имя должно содержать от 2 до 60 символов.');
  d.profile.name=payload.name.trim();
 }else if(payload.action==='ticket'){
  if(typeof payload.subject!=='string'||typeof payload.message!=='string'||payload.subject.trim().length<3||payload.subject.length>100||payload.message.trim().length<10||payload.message.length>2000)throw Error('Проверь тему и текст обращения.');
  d.tickets.unshift({id:crypto.randomUUID(),subject:payload.subject.trim(),message:payload.message.trim(),created_at:new Date().toISOString()});
 }else throw Error('Неизвестное действие.');
 save(d);
}
