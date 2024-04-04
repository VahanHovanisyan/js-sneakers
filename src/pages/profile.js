import createElement from "/src/components/createElement";

export function getProfilePage() {

    const page = createElement({
        tag: 'div',
        classList: ['profile-page'],
        params: {
            textContent: 'This Profile Page'
        }
    })

    return page;
}