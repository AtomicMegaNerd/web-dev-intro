const getName = async (name) => name;

const getNames = async () => {
  const names = await Promise.all([
    getName("Fred"),
    getName("Bill"),
    getName("Tina"),
    getName("Wilma"),
    getName("Jim"),
  ]);

  console.log(names);
};

getNames();
