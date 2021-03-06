// Classes

class SortingController {
  constructor() {
    this.algorithm = document.querySelector(".algorithm-select");
    this.numberSlider = document.querySelector(".slider");
    this.numberOfBars = this.numberSlider.firstElementChild.value;
    this.barContainer = document.querySelector(".bar-container");
    this.randomizeBtn = document.querySelector(".randomize");
    this.sortBtn = document.querySelector(".sort");
    this.list = null;
  }

  changeNumber() {
    this.numberOfBars = this.numberSlider.firstElementChild.value;
    const NumberText = document.querySelector(".bar-number");
    NumberText.innerHTML = this.numberOfBars;
  }

  // maybe first create array and than when using insertion sort change to ListItems?
  generateList(number) {
    let tmpNode = new Node(0, Math.random());
    this.list = new ListItem(tmpNode);
    let p1 = this.list;
    for (let i = 1; i < number; i++) {
      tmpNode = new Node(i, Math.random());
      p1.next = new ListItem(tmpNode);
      p1 = p1.next;
      p1.key = tmpNode;
    }
  }

  generateBars(number) {
    this.barContainer.innerHTML = "";
    let p1 = this.list;
    let index = 0;
    while (p1 != null) {
      this.barContainer.innerHTML += `<div class='bar b${index}'></div>`;
      p1.key.element = document.querySelector(`.b${index}`);
      // console.log(p1.key);
      this.changeBarHeight(p1.key);
      p1 = p1.next;
      index++;
    }
  }

  changeBarHeight(myNode) {
    console.log(myNode.element);
    const elementHeight = 100 * myNode.value;
    myNode.element.style.height = `${elementHeight}%`;
  }

  start() {
    this.changeNumber();
    this.generateList(this.numberOfBars);
    this.generateBars(this.numberOfBars);
  }

  randomize() {
    const bars = this.barContainer.childNodes;
  }

  // Sorting Algorithms
  insertionSort() {
    for (let j = 1; j < this.numberOfBars; j++) {
      let predecessor = null;
      let successor = null;
      let max = this.list;
      let p1 = this.list;
      for (let i = j; i < this.numberOfBars - 1; i++, p1 = p1.next) {
        if (p1.next.key.value > max.key.value) {
          predecessor = p1;
          successor = p1.next.next;
          max = p1.next;
        }
      }
      //remove heighest element from list
      if (max.key.value > p1.next.key.value) {
        // max is first element
        if (predecessor != null) {
          predecessor.next = successor;
          // max not first element
        } else {
          this.list = this.list.next;
        }
        //paste max in right position
        let tmp = p1.next.next;
        p1.next.next = max;
        max.next = tmp;
      }
      // generate Bars
      this.generateBars();
    }
  }
}

class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.element = null;
  }
}

class ListItem {
  constructor(node) {
    this.key = node;
    this.next = null;
  }
}

const controller = new SortingController();
controller.start();

// EventListeners

controller.numberSlider.addEventListener("input", function (e) {
  controller.changeNumber();
  controller.generateList(e.target.value);
  controller.generateBars(e.target.value);
});

controller.randomizeBtn.addEventListener("click", function () {
  controller.randomize();
});

controller.sortBtn.addEventListener("click", function () {
  controller.insertionSort();
});
