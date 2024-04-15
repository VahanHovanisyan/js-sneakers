import "./navigation.css";
import { router } from "/src/router";
import createElement from "/src/components/createElement";
import createCartAside from "/src/components/cart"; // cart
import { cartItemsArray } from "/src/fetch";
import { orderItemsArray } from "/src/fetch";

export function getNavigation() {

    const iconCartText = createElement({
        tag: 'span',
        classList: ['nav__icon-text nav__icon-text_total-price'],
        params: {
            textContent: ` руб.`,
        }
    })

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
                createCartAside(cartItemsArray, orderItemsArray).overlay;
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