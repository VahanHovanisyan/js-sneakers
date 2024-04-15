import createElement from "/src/components/createElement";
import { getHero } from "/src/components/hero";
import { favoriteItemsArray } from "/src/fetch";

export function getFavoritePage() {

    const { hero, heroContainer, cardsList, heroTitle } = getHero(favoriteItemsArray);
    
    const page = createElement({
        tag: 'div',
        classList: ['favorite-page'],
    })
    
    page.append(hero);
    heroTitle.textContent = 'Закладки';

    return page;
}