import styles from "./slider.module.scss";
import createElement from "/src/components/createElement";
import Slide from "./slide/slide.js";
import { sliderProducts } from "/src";

export function getSlider(addSlider) {

    //slider
    const slider = createElement({
        tag: 'div',
        classList: ['swiper', addSlider, styles.slider],
    })

    //sliderContainer
    const sliderContainer = createElement({
        tag: 'div',
        classList: ['swiper-wrapper'],
        parent: slider
    })

    // sliderbuttons
    const sliderButtonPrev = createElement({
        tag: 'div',
        classList: ['swiper-button-prev', styles.sliderButtonPrev],
        parent: slider
    })

    const sliderButtonNext = createElement({
        tag: 'div',
        classList: ['swiper-button-next', styles.sliderButtonNext],
        parent: slider
    })

    sliderProducts.forEach((item) => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        const slideContent1 = Slide(item.imgUrl, item.titleSmall, item.title)
        slide.append(slideContent1);
        sliderContainer.append(slide);
    })

    return slider;
}

