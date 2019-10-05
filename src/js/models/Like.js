export default class Like {
  constructor() {
    this.likes = [];
  }

  addLike(id, title, author, image) {
    const like = { id, title, author, image };
    this.likes.push(like);

    // Persist the data in local storage
    this.persistData();

    return like;
  }

  deleteLike(id) {
    const index = this.likes.findIndex(el => el.id === id);
    this.likes.splice(index, 1);

    // Persist the data in local storage
    this.persistData();
  }

  isLiked(id) {
    return this.likes.findIndex(el => el.id === id) !== -1;
  }

  getNumOfLikes() {
    return this.likes.length;
  }

  persistData() {
    localStorage.setItem('likes', JSON.stringify(this.likes));
  }

  readStorage() {
    const storage = JSON.parse(localStorage.getItem('likes'));

    // Restore the likes from local storage
    if (storage) this.likes = storage;
  }
}
