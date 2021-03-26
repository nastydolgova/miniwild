
const buttonCart = document.querySelector('.button-cart');
const modalCart = document.querySelector('#modal-cart');
const viewAll = document.querySelectorAll('.view-all');
const navigationLink = document.querySelectorAll('.navigation-link:not(.view-all)');
const longGoodsList = document.querySelector('.long-goods-list');
const showAcsessories = document.querySelectorAll('.show-acsessories');
const showClothing = document.querySelectorAll('.show-clothing');
const cartTableGoods = document.querySelector('.cart-table__goods');
const cardTableTotal = document.querySelector('.card-table__total');
const btnDanger = document.querySelector('.btn-delete');

const getGoods = async () => {
	const result = await fetch('/db/db.json'); 
	if (!result.ok) {
		throw 'Ошибка ' + result.status
	}
	return await result.json();
}

const cart = {
	cartGoods: [],
	renderCart(){
		cartTableGoods.textContent = '';
		this.cartGoods.forEach(({ id, name, price, count }) => {
			//диструктуризация в скобках. разбили обьект сразу же на переменные
			const trGood = document.createElement ('tr');
			trGood.className = 'cart-item';
			trGood.dataset.id = id;
			trGood.innerHTML = `
				<td>${name}</td>
				<td>${price}$</td>
				<td><button class="cart-btn-minus" data-id="${id}">-</button></td>
				<td>${count}</td>
				<td><button class="cart-btn-plus" data-id="${id}">+</button></td>
				<td>${price * count}$</td>
				<td><button class="cart-btn-delete" data-id="${id}">x</button></td>
			`;
			cartTableGoods.append(trGood);
		});

		const totalPrice = this.cartGoods.reduce((sum, item) => {
            return sum + item.price * item.count;
        }, 0);
        cardTableTotal.textContent = totalPrice + '$';

	},
	clearCart(){
		this.cartGoods.length = 0;
		this.updateCart();
		this.renderCart();
	},
	deleteGood(id){
		this.cartGoods = this.cartGoods.filter( item =>id !== item.id );
        cart.renderCart(); 
	},
	minusGood(id){
		for(const item of this.cartGoods){
            if(item.id == id){
                if(item.count <= 1){
                    this.deleteGood(id);
                }else{
                    item.count--;
                }
                
                break;
            }
        }
        this.renderCart();
	},
	plusGood(id){
		for(const item of this.cartGoods){
            if(item.id === id){
                item.count++;
                break;
            }
        }
        this.renderCart(); 
	},
	addCartGoods(id){
		const goodItem = this.cartGoods.find( item => item.id === id);
		if(goodItem){
            cart.plusGood(id);
        } else {
			getGoods()
			.then(data => data.find(item => item.id === id))
			.then(({id, price, name}) => {
				this.cartGoods.push({
					id,
					name,
					price,
					count: 1
				});
				cart.updateCart();
			});
		};
	},
	updateCart(){
        const totalCount = cart.cartGoods.reduce(function(sum, item){
            return sum + item.count;
        }, 0);
        if(!totalCount){
            document.querySelector('.cart-count').innerHTML = "";
        }
        else document.querySelector('.cart-count').innerHTML = `${totalCount}`;
    },

}





document.body.addEventListener('click', function(){
    cart.updateCart();
})


document.body.addEventListener('click', e => {
    const addToCart = e.target.closest('.add-to-cart');
    if(addToCart){
        cart.addCartGoods(addToCart.dataset.id);
        cart.updateCart();
    }
});

cartTableGoods.addEventListener('click', e => {
	const target = e.target;
    if(target.classList.contains('cart-btn-delete')){
        cart.deleteGood(target.dataset.id);
		//через родителя, без присваивания data-id
		//const id = target.closest('.cart-item').dataset.id;
		// cart.deleteGood(parent.dataset.id);
    };
	if(target.classList.contains('cart-btn-minus')){
        cart.minusGood(target.dataset.id);
	}
	if(target.classList.contains('cart-btn-plus')){
        cart.plusGood(target.dataset.id);
	}
});

const openModal = () => {
	cart.renderCart();
	modalCart.classList.add('show');
};

const closeModal = () => {
	modalCart.classList.remove('show');
};

buttonCart.addEventListener('click', openModal)

modalCart.addEventListener('click', function(e){
	const target = e.target;
	if(target.classList.contains('overlay')){
		closeModal();
		git config --global user.email "you@example.com"
		git config --global user.name "Your Name"
	}

	if(target.classList.contains('modal-close')){
		closeModal(); 
		// делигирование, навешиваю через корзину закрытие корзины. без этого нужна 13 и 24 строки
	}
});

btnDanger.addEventListener('click', () => { cart.clearCart()})
//контекст потерян, что бы зафиксить его можно использовать cart.clearCart.bind(cart)


//Goods

getGoods();

getGoods().then(function (data){
	console.log (data)
});


const createCard = function(objCard){
	const card = document.createElement('div');
	card.className = 'col-lg-3 col-sm-6';
	card.innerHTML = `
	<div class="goods-card">
		${ objCard.label ? `<span class="label">${objCard.label}</span>` : ''}
		<img src="db/${objCard.img}" alt="${objCard.name}" class="goods-image">
		<h3 class="goods-title">${objCard.name}</h3>
		<p class="goods-description">${objCard.description}</p>
		<button class="button goods-card-btn add-to-cart" data-id="${objCard.id}">
			<span class="button-price">$${objCard.price}</span>
		</button>
	</div>
	`;
	return card;
};

const renderCards = function(data){
	longGoodsList.textContent = '';
	const cards = data.map(createCard);
	cards.forEach(function (card) {
		longGoodsList.append(card)
	})
	document.body.classList.add('show-goods');
}

const showAll = (e) => {
	e.preventDefault();
	getGoods().then(renderCards);
}

viewAll.forEach(function(elem){
	elem.addEventListener('click', showAll)
})



const filterCards = function (field, value){
	getGoods()
		.then(data => data.filter(good => good[field] == value))
		.then(renderCards);
}

navigationLink.forEach(function (link){
	link.addEventListener('click', e => {
		e.preventDefault;
		const field = link.dataset.field;
		const value = link.textContent;
		filterCards(field, value);
	})
})

showAcsessories.forEach(item => {
	item.addEventListener('click', e => {
		e.preventDefault();
		filterCards('category', 'Accessories');
	})
})

showClothing.forEach(item => {
	item.addEventListener('click', e => {
		e.preventDefault();
		filterCards('category', 'Clothing');
	})
})

