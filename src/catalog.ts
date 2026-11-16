export type Product={id:string;name:string;tagline:string;category:string;price:number;color:string;symbol:string;description:string;features:string[]};
export type CartItem={productId:string;months:number};
export const categories=['Все подписки','Нейросети','Музыка','Кино и сериалы','Игры','Для работы','Облако'];
export const catalog:Product[]=[
{id:'orbit',name:'Orbit AI',tagline:'Твоя идея. Без границ.',category:'Нейросети',price:990,color:'violet',symbol:'✳',description:'Персональный помощник для больших идей: от первого черновика до последней строчки кода.',features:['Умный помощник для текстов и кода','Генерация изображений','История диалогов']},
{id:'wave',name:'Wave Music',tagline:'В твоём ритме',category:'Музыка',price:299,color:'green',symbol:'≋',description:'Саундтрек для каждого дня. Открывай новые жанры и собирай любимые треки в одном месте.',features:['Музыка без рекламных пауз','Офлайн-плейлисты','Высокое качество звука']},
{id:'frame',name:'Frame Cinema',tagline:'Ещё одну серию?',category:'Кино и сериалы',price:499,color:'coral',symbol:'F',description:'Большие истории на любом экране. Твой вечер начинается с хорошего кино.',features:['Фильмы и сериалы в 4K','Просмотр на трёх устройствах','Загрузка для просмотра офлайн']},
{id:'pixel',name:'Pixel Pass',tagline:'Следующий уровень',category:'Игры',price:799,color:'blue',symbol:'✚',description:'Новые миры, неожиданные приключения и игры, к которым хочется возвращаться.',features:['Библиотека игр','Ежемесячные новинки','Облачные сохранения']},
{id:'studio',name:'Studio Pro',tagline:'Создавай своё',category:'Для работы',price:649,color:'pink',symbol:'S',description:'Превращай идеи в выразительные дизайны, презентации и публикации.',features:['Премиальные шаблоны','Инструменты для команды','Экспорт без водяных знаков']},
{id:'cloud',name:'Cloud Space',tagline:'Место для всего',category:'Облако',price:199,color:'sky',symbol:'☁',description:'Твои файлы рядом — дома, в дороге и на новом устройстве.',features:['1 ТБ пространства','Синхронизация устройств','Общий доступ к папкам']}];
export const itemPrice=(price:number,months:number)=>Math.round(price*months*(months===12?.8:months===3?.9:1));
export const money=(value:number)=>new Intl.NumberFormat('ru-RU').format(value)+' ₽';
