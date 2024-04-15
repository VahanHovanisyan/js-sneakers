export const itemsArray = [];
export const favoriteItemsArray = [];
export const cartItemsArray = [];
export const sliderProducts = [];
export const orderItemsArray = [];
export const orderItemsArrayCount = [];

async function getFetch(urlItems, array) {
  const response = await fetch(`https://my-project-87c87-default-rtdb.europe-west1.firebasedatabase.app/${urlItems}.json`)
  const data = await response.json();
  data ?
    Object.entries(data)?.forEach(([key, item]) => {
      array.push({
        id: item.id,
        key: key,
        title: item.title,
        titleSmall: item.titleSmall,
        price: item.price,
        imgUrl: item.imgUrl
      })
    }) : [];
}

async function getFetchOrder() {
  const response = await fetch(`https://my-project-87c87-default-rtdb.europe-west1.firebasedatabase.app/order.json`)
  const data = await response.json();
  data ? orderItemsArray.push(...Object.values(data).flat()) : [];
  data ? orderItemsArrayCount.push(...Object.values(data)) : [];
}

export async function getFetchAll() {

  const data = await Promise.all(
    [getFetch('items', itemsArray),
    getFetch('favorite', favoriteItemsArray),
    getFetch('cart', cartItemsArray),
    getFetch('promotionProduct', sliderProducts),
    getFetchOrder()]
  )
  document.querySelector('.nav__icon-text_total-price').textContent = `${cartItemsArray.reduce((a, b) => a + b.price, 0)} руб.`
  return data;
}

