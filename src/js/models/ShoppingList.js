import uniqid from 'uniqid';

export default class ShoppingList {
  constructor() {
    this.items = [];
  }

  addItem(amount, unit, ingr) {
    const item = {
      id: uniqid(),
      amount,
      unit,
      ingr
    };

    this.items.push(item);
  }

  deleteItem(id) {
    const index = this.items.findIndex(el => el.id === id);

    this.items.splice(index, 1);
  }

  updateAmount(id, newAmount) {
    this.items.find(el => el.id === id).amount = newAmount;
  }
}
