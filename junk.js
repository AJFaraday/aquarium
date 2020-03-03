class Parent {
  constructor() {
    console.log('Parent init')
  }
}

class Child extends Parent {
  constructor() {
    super();
    console.log('Child init')
  }
}

console.log(Child.name)

var c = new Child();

console.log(c.constructor.name);
console.log(Object.getPrototypeOf(c).constructor.name)