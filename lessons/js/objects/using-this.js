const person = {
  name: "Wilma",
  age: 29,
  gender: "female",
  location: {
    streetNumber: 500,
    street: "123 Avenue",
    city: "JS City",
    province: "JS Prefecture",
    postalCode: "X3DF-9920",
    country: "JS Nation",
  },
  getAddress() {
    return `${this.name}: ${this.location.streetNumber} ${this.location.street}`;
  },
};

console.log(person.getAddress());

// Do not do this.... it will break
// const refToMethod = person.getAddress;
// console.log(refToMethod());

// This is fine:
const refToMethod = person.getAddress.bind(person);
console.log(refToMethod());

// What is this in node?
// This is undefined it modules are turned on
console.log(this);
