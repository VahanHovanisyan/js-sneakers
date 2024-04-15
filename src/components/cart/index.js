import createCartItem from "/src/components/cartItem";
import styles from "./cart.module.scss";
import createElement from "/src/components/createElement";
import getInfo from "/src/components/info";
import { app } from "/src";
import { orderItemsArrayCount } from "/src/fetch";

function createCartAside(cartItemsArray, orderItemsArray) {
  const overlay = createElement({
    tag: 'div',
    classList: ['overlay'],
    params: {
      onclick() {
        closeCart();
      }
    },
    parent: app
  })

  const aside = createElement({
    tag: 'aside',
    classList: [styles.aside],
    params: {
      onclick(event) {
        event.stopPropagation()
      },
    },
    parent: overlay
  })

  setTimeout(() => {
    aside.style.right = 0;
  }, 0);

  const closeCart = () => {
    aside.style.right = '-100%';
    setTimeout(() => {
      overlay.remove();
    }, 300);
  }

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
        closeCart();
      }
    },
    parent: topDiv,
  })

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.classList.add(styles.itemIcon);

  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'img/svg/sprite.svg#cartIconRemove');
  svg.appendChild(use);
  button.appendChild(svg);

  const cartEmpty = getInfo({
    imgUrl: 'img/cartEmpty.png',
    title: 'Корзина пустая',
    description: 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.',
    closeInfo: () => {
      closeCart();
    }
  })

  cartItemsArray.length === 0 && aside.append(cartEmpty);

  const itemCatalog = createElement({
    tag: 'div',
    classList: [styles.itemCatalog],
    parent: cartItemsArray.length > 0 ? aside : null
  })

  cartItemsArray.forEach((item) => {
    itemCatalog.append(createCartItem({
      id: item.id,
      imgUrl: item.imgUrl,
      title: item.title,
      titleSmall: item.titleSmall,
      price: item.price,
      onRemoveCartItem: () => {
        checkoutTotalPrice.textContent = `${Math.abs(cartItemsArray.reduce((acc, totalItem) => acc - totalItem.price, item.price))} руб.`
        checkoutTaxPrice.textContent = `${Math.round(cartItemsArray.reduce((acc, totalItem) => totalItem.price / 100 * 5, 0))} руб.`
        document.querySelector('.nav__icon-text_total-price').textContent = `${Math.abs(cartItemsArray.reduce((acc, totalItem) => acc - totalItem.price, item.price))} руб.`
        document.querySelector(`[data-card="${item.id}"]`)?.querySelectorAll('use')[1].setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'img/svg/sprite.svg#cardUnChecked');
        let index = cartItemsArray.indexOf(item);
        cartItemsArray.splice(index, 1);
        fetch(`https://my-project-87c87-default-rtdb.europe-west1.firebasedatabase.app/cart/${item.key}.json`, {
          method: 'DELETE'
        })
        if (cartItemsArray.length === 0) {
          aside.append(cartEmpty);
          itemCatalog.remove();
          checkout.remove();
        }
      }
    }))
  })

  const checkout = createElement({
    tag: 'div',
    classList: [styles.checkout],
    parent: cartItemsArray.length > 0 ? aside : null
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
      textContent: `${Math.abs(cartItemsArray.reduce((acc, totalItem) => totalItem.price + acc, 0))} руб.`
    },
    parent: checkoutTextBox1
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
      textContent: `${Math.round(cartItemsArray.reduce((acc, totalItem) => totalItem.price + acc, 0) / 100 * 5)} руб.`
    },
    parent: checkoutTextBox2
  })

  const checkoutButton = createElement({
    tag: 'button',
    classList: [styles.checkoutBtn, 'btn', 'buttonReset'],
    params: {
      onclick: async () => {
        if (cartItemsArray?.length === 0) return

        fetch('https://my-project-87c87-default-rtdb.europe-west1.firebasedatabase.app/cart.json')
          .then(response => response.json())
          .then(data => {
            return fetch('https://my-project-87c87-default-rtdb.europe-west1.firebasedatabase.app/order.json', {
              method: 'POST',
              body: JSON.stringify(Object.values(data)),
              headers: {
                'Content-Type': 'application/json'
              }
            })
          })
          .then(response => response.json())
          .then(() => {
            orderItemsArray.push(...cartItemsArray);
            orderItemsArrayCount.push(cartItemsArray);
            setTimeout(() => {
              cartItemsArray.splice(0, cartItemsArray.length);
            }, 0);
            fetch('https://my-project-87c87-default-rtdb.europe-west1.firebasedatabase.app/cart.json', {
              method: 'DELETE',
            });
            aside.append(getInfo({
              imgUrl: 'img/order.png',
              title: 'Заказ оформлен',
              description: `Ваш заказ №${orderItemsArrayCount.length} скоро будет передан курьерской службе`,
              closeInfo: () => {
                closeCart();
              }
            }))
          })
        
        document.querySelector('.nav__icon-text_total-price').textContent = `0 руб.`
        document.querySelectorAll('[data-card]').forEach(item => item.querySelectorAll('use')[1]?.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'img/svg/sprite.svg#cardUnChecked'));
        itemCatalog.remove();
        checkout.remove();
      },
      textContent: 'Checkout'
    },
    parent: checkout
  })

  const checkoutBtnIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  checkoutBtnIcon.classList.add(styles.checkoutBtnIcon);
  checkoutBtnIcon.classList.add('btnIcon');
  checkoutButton.appendChild(checkoutBtnIcon);

  const use2 = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use2.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'img/svg/sprite.svg#checkoutBtnArrow');
  checkoutBtnIcon.appendChild(use2);

  return {
    overlay,
    checkoutButton,
  }
}

export default createCartAside;