import styles from "./slide.module.scss";
import createElement from "/src/components/createElement";

function Slide(imgUrl = '', titleSpan = '', title = '') {

    //slide 

    const slide = createElement({
        tag: 'div',
        classList: [styles.slide],
    })
    const slideContent = createElement({
        tag: 'div',
        classList: [styles.slide__content],
        parent: slide
    })

        //slide important word
        const slideTitleImportantWord = createElement({
            tag: 'span',
            classList: [styles.slide__titleImportantWord],
            params: {
                textContent: titleSpan
            }
        })

    if (title) {
        //slide title
        const slideTitle = createElement({
            tag: 'h2',
            classList: [styles.slide__title],
            params: {
                textContent: title
            },
            parent: slideContent
        })
        slideTitle.prepend(slideTitleImportantWord);
    } else {
        const slideTitleLoad = createElement({
            tag: 'h2',
            classList: [styles.load, styles.load_text],
            parent: slideContent
        })
    }

    //slide Button
    const slideButton = createElement({
        tag: 'button',
        classList: [styles.slide__button],
        params: {
            textContent: "Buy"
        },
        parent: slideContent
    })
    if (imgUrl) {
        //slide img
        const slideImg = createElement({
            tag: 'img',
            classList: [styles.slide__img],
            attributes: {
                src: imgUrl
            },
            parent: slide
        })
    } else {
        const slideImgLoad = createElement({
            tag: 'div',
            classList: [styles.load, styles.load_img],
            parent: slide
        })
    }


    return slide

}
export default Slide