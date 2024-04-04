import "./navigation.css";
import { router } from "/src";
import createElement from "/src/components/createElement";
import createCartAside from "/src/components/cart"; // cart
import createCartItem from "/src/components/cartItem" // cart Item
import { cartItemsArray } from "/src";

import { app } from "/src/";

export function getNavigation() {

    const { overlay, aside, itemCatalog, cartIsEmpty, checkout } = createCartAside();

    const nav = createElement({
        tag: 'nav',
        classList: ['nav'],
        attributes: {
            'data-burger-nav': '',
        }
    })

    const navList = createElement({
        tag: 'ul',
        classList: ['nav__list'],
        parent: nav
    })

    const navItem1 = createElement({
        tag: 'li',
        classList: ['nav__item'],
        attributes: {
            'data-burger-nav-item': '',
        },
        parent: navList
    })

    const navItem2 = createElement({
        tag: 'li',
        classList: ['nav__item'],
        attributes: {
            'data-burger-nav-item': '',
        },
        parent: navList
    })

    const navItem3 = createElement({
        tag: 'li',
        classList: ['nav__item'],
        attributes: {
            'data-burger-nav-item': '',
        },
        parent: navList
    })

    const navLink1 = createElement({
        tag: 'button',
        classList: ['nav__link', 'buttonReset'],
        params: {
            onclick: () => {
                app.appendChild(overlay);
                setTimeout(() => { aside.style.right = 0; }, 0);

                if (cartItemsArray.length === 0) {
                    aside.append(cartIsEmpty);
                    itemCatalog.remove();
                    checkout.remove();
                    return;
                }
                aside.append(itemCatalog);
                aside.append(checkout);
                cartIsEmpty.remove();
                itemCatalog.innerHTML = '';
                cartItemsArray.forEach((item) => {
                    itemCatalog.append(
                        createCartItem({
                            id: item.id,
                            imgUrl: item.imgUrl,
                            title: item.title,
                            titleSmall: item.titleSmall,
                            price: item.price,
                            onRemoveCartItem: () => {
                                document.querySelector(`[data-card="${item.id}"]`)?.querySelectorAll('use')[1].setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', './img/svg/sprite.svg#cardUnChecked');
                                let index = cartItemsArray.indexOf(item);
                                cartItemsArray.splice(index, 1);
                                fetch(`https://my-project-87c87-default-rtdb.europe-west1.firebasedatabase.app/cart/${item.key || item.keyId}.json`, {
                                    method: 'DELETE',
                                })
                                if (cartItemsArray.length === 0) {
                                    aside.append(cartIsEmpty);
                                    itemCatalog.remove();
                                    checkout.remove();
                                }
                            }
                        })
                    )
                })
            }
        },
        parent: navItem1
    })

    const navLink2 = createElement({
        tag: 'a',
        classList: ['nav__link'],
        attributes: {
            'href': '/favorite',
        },
        parent: navItem2
    })

    navLink2.addEventListener('click', function (event) {
        event.preventDefault();
        router.navigate('/favorite');
        
    })

    const navLink3 = createElement({
        tag: 'a',
        classList: ['nav__link'],
        attributes: {
            'href': '/profile',
        },
        parent: navItem3
    })

    navLink3.addEventListener('click', function (event) {
        event.preventDefault();
        router.navigate('/profile');
    })

    const iconCart = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    iconCart.classList.add('nav__icon');
    const iconFavorite = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    iconFavorite.classList.add('nav__icon');
    const iconProfile = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    iconProfile.classList.add('nav__icon');

    const iconCartText = createElement({
        tag: 'span',
        classList: ['nav__icon-text'],
        params: {
            textContent: '1205 rub'
        }
    })

    const iconFavoriteText = createElement({
        tag: 'span',
        classList: ['nav__icon-text'],
        params: {
            textContent: 'Закладки'
        }
    })

    const iconProfileText = createElement({
        tag: 'span',
        classList: ['nav__icon-text'],
        params: {
            textContent: 'Профиль'
        }
    })

    const iconCartUse = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    const iconFavoriteUse = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    const iconProfileUse = document.createElementNS('http://www.w3.org/2000/svg', 'use');

    iconCartUse.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'img/svg/sprite.svg#cart');
    iconFavoriteUse.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'img/svg/sprite.svg#favorite-nav');
    iconProfileUse.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'img/svg/sprite.svg#profile');

    iconCart.append(iconCartUse);
    iconFavorite.append(iconFavoriteUse);
    iconProfile.append(iconProfileUse);

    navLink1.append(iconCart, iconCartText);
    navLink2.append(iconFavorite, iconFavoriteText);
    navLink3.append(iconProfile, iconProfileText);

    return nav;
};