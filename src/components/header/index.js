import './header.css';
import { getNavigation } from "/src/components/navigation";
import { getLogo } from "/src/components/logo";
import createElement from '/src/components/createElement';

function getHeader() {

    const header = createElement({
        tag: 'header',
        classList: ['header header_border'],
        attributes: {
            'data-burger-header': 'header'
        }
    })

    const container = createElement({
        tag: 'div',
        classList: ['container header__container'],
        parent: header,
    })

    const burger = createElement({
        tag: 'button',
        classList: ['burger'],
        attributes: {
            'data-burger-btn': ''
        },
        parent: container,
        params: {
            innerHTML: ` 
            <span class="burger__line burger__line_top"></span>
            <span class="burger__line burger__line_middle"></span>
            <span class="burger__line burger__line_bottom"></span>
        `
        }
    })

	container.append(getLogo());
	container.append(getNavigation());

	return header;
}

export default getHeader;