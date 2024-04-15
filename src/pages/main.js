import createElement from "/src/components/createElement";
import { getHero } from "/src/components/hero";
import { itemsArray } from "/src/fetch";
import { getSlider } from "/src/components/slider";
import { sliderProducts } from "/src/fetch";


export function getMainPage() {

    const { hero, heroContainer, cardsList, heroTitle } = getHero(itemsArray);

    const page = createElement({
        tag: 'div',
        classList: ['main-page'],
    });

    page.append(hero);
    heroTitle.textContent = 'все Кроссовки';

    const heroSlider = getSlider('hero__slider', sliderProducts);
    heroSlider.classList.add('hero__slider');
    heroContainer.prepend(heroSlider);

    return page;
}