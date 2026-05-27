const billAsStr = `
{
  "name": "Bill",
  "age": 32,
  "gender": "male",
  "location": {
    "city": "Calgary",
    "province": "Alberta"
  }
}
`;

const billAsObj = JSON.parse(billAsStr);

console.log(`JSON string:${billAsStr}`);
console.log("JSON object:");
console.log(billAsObj);

const carAsObj = {
  make: "Subaru",
  model: "CrossTrek",
  year: 2024,
  color: "orange",
  vin: "FX00923BJ8CV31",
  registration: {
    province: "Alberta",
    expiry: "2027-02-03",
    number: "23493-0019-333",
  },
};

// stringify!
// The middle option is a `replacer` function that modifies the results
const carAsStr = JSON.stringify(carAsObj, undefined, 4);

console.log("\n\nCar string:");
console.log(carAsStr);
console.log("Car object:");
console.log(carAsObj);
