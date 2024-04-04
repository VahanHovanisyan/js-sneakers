import styles from './cartItem.module.scss';
import createElement from "/src/components/createElement";
function createCartItem(option) {

  const defaultOptions = {
    id: '',
    title: '',
    price: '',
    imgUrl: '',
    onRemoveCartItem() { }
  }
  const props = Object.assign(defaultOptions, option);

  const article = createElement({
    tag: 'article',
    classList: [styles.cartItem, 'flexVCenter'],
  })

  const link = createElement({
    tag: 'a',
    classList: [styles.cartLink],
    params: {
      href: '#'
    },
    parent: article
  })

  const img = createElement({
    tag: 'img',
    classList: [styles.img],
    params: {
      src: props.imgUrl,
      alt: props.title,
      width: 70,
      height: 70
    },
    parent: article
  })

  const textBox = createElement({
    tag: 'div',
    classList: [styles.textBox],
    parent: article
  })

  const title = createElement({
    tag: 'h3',
    classList: [styles.title],
    params: {
      textContent: props.title
    },
    parent: textBox
  })

  const priceNumber = createElement({
    tag: 'span',
    classList: [styles.priceNumber],
    params: {
      textContent: props.price
    },
    parent: textBox
  })

  const button = createElement({
    tag: 'button',
    classList: [styles.itemBtn, 'buttonReset'],
    params: {
      onclick: () => {
        props.onRemoveCartItem()
        article.remove();
      }
    },
    parent: article
  })

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.classList.add(styles.itemIcon);

  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', './img/svg/sprite.svg#cartIconRemove');
  svg.appendChild(use);

  button.appendChild(svg);

  return article;
}

export default createCartItem;