import styles from "./slide.module.scss";
import createElement from "/src/components/createElement";

function Slide(imgUrl, titleSpan, title) {

    //slide 
    const slide = createElement({
        tag: 'div',
        classList: [styles.slide],
    })

    // slide content
    const slideContent = createElement({
        tag: 'div',
        classList: [styles.slide__content],
        parent: slide
    })

    //slide title
    const slideTitle = createElement({
        tag: 'h2',
        classList: [styles.slide__title],
        params: {
            textContent: title
        },
        parent: slideContent
    })

    //slide important word
    const slideTitleImportantWord = createElement({
        tag: 'span',
        classList: [styles.slide__titleImportantWord],
        params: {
            textContent: titleSpan
        }
    })
    slideTitle.prepend(slideTitleImportantWord);
    
    //slide Button
    const slideButton = createElement({
        tag: 'button',
        classList: [styles.slide__button],
        params: {
            textContent: "Buy"
        },
        parent: slideContent
    })

    //slide img
    const slideImg = createElement({
        tag: 'img',
        classList: [styles.slide__img],
        attributes: {
            src: imgUrl
        },
        parent: slide
    })
    
    return slide

}
export default Slide