import createElement from "/src/components/createElement";

export function getMainPage() {
    
    const page = createElement({
        tag: 'div',
        classList: ['main-page'],
    });

    return page;
}