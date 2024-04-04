import createElement from "/src/components/createElement";

export function getFavoritePage() {

    const page = createElement({
        tag: 'div',
        classList: ['favorite-page'],
    })

    return page;
}