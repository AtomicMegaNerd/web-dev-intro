const DOG_URL = "https://dog.ceo/api/breeds/image/random";

const dogTarget = document.querySelector(".dog-target");

// Store the previous node
let prevNode = undefined;

const doFetch = () => {
  const promise = fetch(DOG_URL);
  // This is promise chaining...
  promise
    .then((response) => response.json())
    .then((dog) => {
      const img = document.createElement("img");
      img.src = dog.message;
      img.alt = "A random dog";
      img.className = "dog-img";

      if (prevNode === undefined) {
        dogTarget.appendChild(img);
      } else {
        prevNode.replaceWith(img);
      }
      prevNode = img;
    });
};

document.querySelector(".dog-btn").addEventListener("click", doFetch);
