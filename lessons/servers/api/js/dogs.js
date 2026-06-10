// oxlint-disable no-underscore-dangle

const dogUrl = "https://dog.ceo/api/breeds/image/random";
const dogTarget = document.querySelector(".dog-target");
const dogManager = { prevNode: undefined };

const addDogToPage = (dog, mgr) => {
  const img = document.createElement("img");
  img.src = dog.message;
  img.alt = "A random dog";
  img.className = "dog-img";
  // This is the container we will insert the dog image node into

  if (mgr.prevNode === undefined) {
    dogTarget.appendChild(img);
  } else {
    mgr.prevNode.replaceWith(img);
  }
  mgr.prevNode = img;
};

// This fetches a dog from the API and inserts the img into the DOM
const _doFetch = (mgr) => {
  const promise = fetch(dogUrl);
  // This is promise chaining...
  promise
    .then((resp) => {
      if (!resp.ok) {
        throw new Error(`${resp.status} ${resp.statusText}`);
      }
      return resp.json();
    })
    .then((dog) => {
      addDogToPage(dog, mgr);
    })
    // This is how error handling works with promises
    .catch((error) => {
      console.log(`error calling our api ${error.message}`);
    });
};

const _doFetch2 = async (mgr) => {
  // I guess we have exceptions in Javascript?
  try {
    const resp = await fetch(dogUrl);
    if (resp.ok) {
      const dog = await resp.json();
      addDogToPage(dog, mgr);
    } else {
      throw new Error(`${resp.status} ${resp.statusText}`);
    }
  } catch (error) {
    console.log(`error calling our api ${error.message}`);
  }
};

document.querySelector(".dog-btn").addEventListener("click", () => _doFetch2(dogManager));
