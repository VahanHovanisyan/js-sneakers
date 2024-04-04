function createElement(option) {
  const defaultOption = {
    tag: "div",
    classList: [],
    attributes: {},
    params: {},
    parent: null,
  }

  const { tag, classList, attributes, params, parent } = Object.assign(defaultOption, option)

  const elem = document.createElement(tag);

  elem.className = classList.join(" ");

  Object.assign(elem, params);

  Object.entries(attributes).forEach(([key, value]) => elem.setAttribute(key, value));

  parent !== null && parent.append(elem);

  return elem;
}

export default createElement;