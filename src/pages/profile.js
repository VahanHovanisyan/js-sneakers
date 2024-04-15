import createElement from "/src/components/createElement";
import { getHero } from "/src/components/hero";
import { orderItemsArray } from "/src/fetch";

export function getProfilePage() {
    const { hero, heroContainer, cardsList, heroTitle } = getHero(orderItemsArray);

    const page = createElement({
        tag: 'div',
        classList: ['profile-page'],
    })

    page.append(hero);
    heroTitle.textContent = 'Мои заказы';

    return page;
}