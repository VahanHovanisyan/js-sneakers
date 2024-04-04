import "./logo.css"
import { router } from "/src";
import createElement from "/src/components/createElement";

export function getLogo() {

	const logo = createElement({
		tag: 'a',
		classList: ['logo'],
		attributes: {
			'href': '/'
		}
	})

	logo.addEventListener('click', function (event) {
		event.preventDefault();
		router.navigate('/');
	})

	const img = createElement({
		tag: 'img',
		classList: ['logo__img'],
		attributes: {'src': './img/logo.png'},
		parent: logo
	})

	const strongText = createElement({
		tag: 'strong',
		classList: ['logo__strong-text'],
		params: {
			textContent: 'REACT SNEAKERS'.toUpperCase()
		},
		parent: logo
	})

	const spanText = createElement({
		tag: 'span',
		classList: ['logo__span-text'],
		params: {
			textContent: 'Магазин лучших кроссовок',
		},
		parent: logo
	})

	return logo;
}