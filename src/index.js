import '/src/css/style.scss'; // style

// slider Swiper library
import Swiper from "swiper";
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
// slider Swiper library

// burger library
import Burger from './library/burger/burger.js';
import "/src/library/burger/burger.css";
// burger library

import getHeader from "/src/components/header"; // header
import getPageContainer from "/src/components/pageContainer"; // main

export const itemsArray = [];
export const favoriteItemsArray = [];
export const cartItemsArray = [];
export const sliderProducts = [];

async function getFetch(urlItems, array) {
    const response = await fetch(`https://my-project-87c87-default-rtdb.europe-west1.firebasedatabase.app/${urlItems}.json`)
    const data = await response.json();
    data ?
        Object.entries(data)?.forEach(([key, item]) => {
            array.push({
                id: item.id,
                key: key,
                title: item.title,
                titleSmall: item.titleSmall,
                price: item.price,
                imgUrl: item.imgUrl
            })
        }) : []
}
    // router pages 
    import Navigo from "navigo";
    export const router = new Navigo('/');
    export const app = document.getElementById('app');
    import { getHero } from '/src/components/hero';

async function get() {
    await getFetch('promotionProduct', sliderProducts)
    await getFetch('items', itemsArray)
    await getFetch('cart', cartItemsArray)
    await getFetch('favorite', favoriteItemsArray)

    const header = getHeader();
    const main = getPageContainer();

    app.append(header, main);

    new Burger('header'); // burger render

    // router Main page 
    router.on('/', async function () {
        main.innerHTML = '';
        const mainModule = await import('./pages/main.js');
        const mainPage = mainModule.getMainPage();
        main.append(mainPage);
        const { hero, heroContainer, cardsList, heroTitle } = getHero(itemsArray);
        mainPage.append(hero);
        heroTitle.textContent = 'все Кроссовки';

        const swiper = new Swiper('.hero__slider', {
            modules: [Navigation],
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });

    });

    // router Favorite page
    router.on('/favorite', async function () {
        main.innerHTML = '';
        const favoriteModule = await import('./pages/favorite.js');
        const favoritePage = favoriteModule.getFavoritePage();
        main.append(favoritePage);
        const { hero, heroContainer, cardsList, heroTitle } = getHero(favoriteItemsArray);
        favoritePage.append(hero);
        heroTitle.textContent = 'Закладки';

    });

    // router Profile page
    router.on('/profile', async function () {
        main.innerHTML = '';
        const profileModule = await import('./pages/profile.js');
        const profilePage = profileModule.getProfilePage();
        main.append(profilePage);
    });

    // router 404 page
    router.notFound(async function () {
        main.innerHTML = '';
        const notFoundModule = await import('./pages/404.js');
        const notFoundPage = notFoundModule.getNotFoundPage();
        main.append(notFoundPage);
    })

    router.resolve(); // router to work pages
    // router pages 

}

get()
