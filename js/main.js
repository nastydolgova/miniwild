// const mySwiper = new Swiper('.swiper-container', {
// 	loop: true,

// 	// Navigation arrows
// 	navigation: {
// 		nextEl: '.slider-button-next',
// 		prevEl: '.slider-button-prev',
// 	},
// });

// const buttonCart = document.querySelector('.button-cart');
// const modalCart = document.querySelector('#modal-cart');
// // const modalClose = document.querySelector('.modal-close');

// const openModal = function(){
// 	modalCart.classList.add('show');
// };

// const closeModal = function(){
// 	modalCart.classList.remove('show');
// };

// buttonCart.addEventListener('click', openModal);
// // modalClose.addEventListener('click', closeModal);

// modalCart.addEventListener('click', function(e){
// 	const target = e.target;
// 	if(target.classList.contains('overlay')){
// 		closeModal();
// 	}

// 	if(target.classList.contains('modal-close')){
// 		closeModal(); 
// 		// делигирование, навешиваю через корзину закрытие корзины. без этого нужна 13 и 24 строки
// 	}
// });

// //scrollLinks

// {const scrollLinks = document.querySelectorAll('a.scroll-link');

// for (let i = 0; i < scrollLinks.length; i++ ){
// 	scrollLinks[i].addEventListener('click', function(event){
// 		event.preventDefault();
// 		const id = scrollLinks[i].getAttribute('href');
// 		document.querySelector(id).scrollIntoView({
// 			behavior: 'smooth',
// 			block: 'start',
// 		})
// 	});
// }
// }

// //Goods

// const viewAll = document.querySelectorAll('.view-all');
// const navigationLink = document.querySelectorAll('.navigation-link:not(.view-all)');
// const longGoodsList = document.querySelector('.long-goods-list');
// const showAcsessories = document.querySelectorAll('.show-acsessories');
// const showClothing = document.querySelectorAll('.show-clothing');

// const getGoods = async function () {
// 	const result = await fetch('/db/db.json'); 
// 	if (!result.ok) {
// 		throw 'Ошибка ' + result.status
// 	}
// 	return await result.json();
// }

// getGoods();

// getGoods().then(function (data){
// 	console.log (data)
// });

// // еще один вариант, но надо еще обработать ошибку!
// // fetch('db/db.json')
// // 	.then(function (response) {
// // 		return response.json();
// // 	})
// // 	.then (function (data)){
// // 		console.log(data)
// // 	}

// const createCard = function(objCard){
// 	const card = document.createElement('div');
// 	card.className = 'col-lg-3 col-sm-6';

// 	card.innerHTML = `
// 	<div class="goods-card">
// 		${ objCard.label ? `<span class="label">${objCard.label}</span>` : ''}
// 		<img src="db/${objCard.img}" alt="${objCard.name}" class="goods-image">
// 		<h3 class="goods-title">${objCard.name}</h3>
// 		<p class="goods-description">${objCard.description}</p>
// 		<button class="button goods-card-btn add-to-cart" data-id="${objCard.id}">
// 			<span class="button-price">$${objCard.price}</span>
// 		</button>
// 	</div>
// 	`;

// 	return card;
// };

// const renderCards = function(data){
// 	longGoodsList.textContent = '';
// 	const cards = data.map(createCard);
// 	cards.forEach(function (card) {
// 		longGoodsList.append(card)
// 		// longGoodsList.append(...cards) разбивка на обьекты
// 	})
// 	document.body.classList.add('show-goods');
// }

// const showAll = function (e){
// 	e.preventDefault();
// 	getGoods().then(renderCards);
// }

// viewAll.forEach(function(elem){
// 	elem.addEventListener('click', showAll)
// })

// const filterCards = function (field, value){
// 	getGoods()
// 		.then(function (data) {
// 			const filteredGoods = data.filter(function(good){
// 				return good[field] == value;
// 			})
// 			return filteredGoods;
// 		})
// 		.then(renderCards);
// }

// navigationLink.forEach(function (link){
// 	link.addEventListener('click', function(e){
// 		e.preventDefault;
// 		const field = link.dataset.field;
// 		const value = link.textContent;
// 		filterCards(field, value);
// 	})
// })

// showAcsessories.forEach(item => {
// 	item.addEventListener('click', e => {
// 		e.preventDefault();
// 		filterCards('category', 'Accessories');
// 	})
// })

// showClothing.forEach(item => {
// 	item.addEventListener('click', e => {
// 		e.preventDefault();
// 		filterCards('category', 'Clothing');
// 	})
// })

//например надо подстраховаться от отого что кнопку уберут или какой-то другой элемент на который навешено событие
//try {
//	button.addEventListener('click',openModal);
//} catch {
//	console.log('нет кнопки')
//}

// универсальная функция запроса на сервер, а где делаем запрос уже передаем адрес. 
//в этом случае например getGoods() в filteredGoods и событии на more
// const getGoods = async function (url) {
// 	const result = await fetch(url); 
// 	if (!result.ok) {
// 		throw 'Ошибка ' + result.status
// 	}
// 	return await result.json();
// }

// еще один вариант, но надо еще обработать ошибку!
// fetch('db/db.json')
// 	.then(function (response) {
// 		return response.json();
// 	})
// 	.then (function (data)){
// 		console.log(data)
// 	}

import './modules/mySwiper.js'
import './modules/wildber.js'
import './modules/smoothScroll.js' 