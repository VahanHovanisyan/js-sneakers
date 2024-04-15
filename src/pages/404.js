import createElement from "/src/components/createElement";
export function getNotFoundPage() {

    const page = createElement({
        tag: 'div',
        classList: ['not-found-page'],
        params: {
            textContent: 'This Page not found'
        }
    })
    
    return page;
}