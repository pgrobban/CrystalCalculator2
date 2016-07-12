export class TreasureFactory {

  /* What I want to do is somehow dependency inject dataJson and maybe other dependencies
  to the constructor and have name and other things related to treasures as parameters also.
  But it seems using the get method is the only way. */
  constructor(dataJson) {
    this.dataJson = dataJson;
  }

  $get(name) {
    this.name = name;
    return this;
  }

  getName() {
    return this.name;
  }

  getImageUrl() {
    const name = this.name;
    console.log(this);
    return 'img/strawberry.png';
  }
}
