import styles from "./slider.module.scss";
import createElement from "/src/components/createElement";
import Slide from "./slide/slide.js";
import { arrayLoadItems } from "/src/components/hero";

// slider Swiper library
import Swiper from "swiper";
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
// slider Swiper library

export function getSlider(addSlider, arraySliderItems) {

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

    function slideRender(arraySlider = arrayLoadItems) {
        arraySlider.forEach((item) => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            const slideContent1 = Slide(item.imgUrl, item.titleSmall, item.title)
            slide.append(slideContent1);
            sliderContainer.append(slide);
        })
    }slideRender(arraySliderItems)

    setTimeout(() => {
        new Swiper(`.${addSlider}`, {
            modules: [Navigation],
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }, 0);

    return slider;
}

