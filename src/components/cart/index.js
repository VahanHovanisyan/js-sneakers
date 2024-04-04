import createCartItem from "/src/components/cartItem";
import styles from "./cart.module.scss";
import createElement from "/src/components/createElement";
import { cartItemsArray } from "/src";

function createCartAside() {

  const overlay = createElement({
    tag: 'div',
    classList: ['overlay'],
    params: {
      onclick() {
        aside.style.right = '-100%';
        setTimeout(() => {
          overlay.remove();
        }, 300);
      }
    }
  })

  const aside = createElement({
    tag: 'aside',
    classList: [styles.aside],
    params: {
      onclick(event) {
        event.stopPropagation()
      }
    },
    parent: overlay
  })

  const topDiv = createElement({
    tag: 'div',
    classList: [styles.top, 'flexVCenter'],
    parent: aside
  })

  const title = createElement({
    tag: 'h2',
    classList: [styles.asideTitle],
    params: {
      textContent: 'Basket'
    },
    parent: topDiv
  });

  const button = createElement({
    tag: 'button',
    classList: [styles.btn, 'buttonReset'],
    params: {
      onclick: () => {
        aside.style.right = '-100%';
        setTimeout(() => {
          overlay.remove();
        }, 300);
      }
    },
    parent: topDiv,
  })

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.classList.add(styles.itemIcon);

  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', './img/svg/sprite.svg#cartIconRemove');
  svg.appendChild(use);
  button.appendChild(svg);

  const cartIsEmpty = createElement({
    tag: 'div',
    classList: [styles.cartEmpty],
    params: {
      onclick: (event) => {
        if (event.target.closest('.cart__empty-button')) {
          aside.style.right = '-100%';
          setTimeout(() => {
            overlay.remove();
          }, 300);
        }
      },
      innerHTML: /* html */ `
      <img class=${styles.cartEmptyImg} src="./img/cartEmpty.png" alt="cart-empty" width="100">
      <h3 class="cart__empty-title">Корзина пустая</h3>
      <p class="cart__empty-text">
        Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.
      </p>
      <button class="cart__empty-button btn ">
        <svg class="cart__empty-button-icon btnIcon">
          <use xlink:href="./img/svg/sprite.svg#checkoutBtnArrow"></use>
        </svg>
        Вернуться назад
      </button>
    `
    }
  })

  const itemCatalog = createElement({
    tag: 'div',
    classList: [styles.itemCatalog],
    parent: aside
  })

  const checkout = createElement({
    tag: 'div',
    classList: [styles.checkout],
    parent: aside
  })

  if (cartItemsArray === null || !cartItemsArray) {
    aside.append(cartIsEmpty);
    itemCatalog.remove();
    checkout.remove();
    return;
  }

  cartIsEmpty.remove();
  aside.append(itemCatalog);
  aside.append(checkout);

  cartItemsArray.forEach(item => {
    itemCatalog.append(createCartItem({
      id: item.id,
      imgUrl: item.imgUrl,
      title: item.title,
      titleSmall: item.titleSmall,
      price: item.price,
    }));

    return item
  })




  const checkoutTextBox1 = createElement({
    tag: 'div',
    classList: [styles.checkoutTextBox],
    parent: checkout
  })

  const checkoutTotalText = createElement({
    tag: 'span',
    classList: [styles.checkoutTotalText],
    params: {
      textContent: 'Total:'
    },
    parent: checkoutTextBox1
  })

  const checkoutTotalPrice = createElement({
    tag: 'span',
    classList: [styles.checkoutTotalPrice],
    params: {
      textContent: '21 498 руб.'
    }
  })

  const checkoutTextBox2 = createElement({
    tag: 'div',
    classList: [styles.checkoutTextBox],
    parent: checkout
  })

  const checkoutTaxText = createElement({
    tag: 'span',
    classList: [styles.checkoutTaxText],
    params: {
      textContent: 'Tax 5%:'
    },
    parent: checkoutTextBox2
  })

  const checkoutTaxPrice = createElement({
    tag: 'span',
    classList: [styles.checkoutTaxPrice],
    params: {
      textContent: '1074 руб.'
    },
    parent: checkoutTextBox2
  })

  const checkoutButton = createElement({
    tag: 'button',
    classList: [styles.checkoutBtn, 'btn', 'buttonReset'],
    params: {
      textContent: 'Checkout'
    },
    parent: checkout
  })

  const checkoutBtnIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  checkoutBtnIcon.classList.add(styles.checkoutBtnIcon);
  checkoutBtnIcon.classList.add('btnIcon');
  checkoutButton.appendChild(checkoutBtnIcon);

  const use2 = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use2.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', './img/svg/sprite.svg#checkoutBtnArrow');
  checkoutBtnIcon.appendChild(use2);

  return {
    overlay,
    aside,
    cartIsEmpty,
    itemCatalog,
    checkout,
  };
}

export default createCartAside;