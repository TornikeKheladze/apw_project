export function convertGeorgianToEnglish(input = "") {
  const georgianToEnglishMap = {
    ა: "a",
    ბ: "b",
    გ: "g",
    დ: "d",
    ე: "e",
    ვ: "v",
    ზ: "z",
    თ: "t",
    ი: "i",
    კ: "k",
    ლ: "l",
    მ: "m",
    ნ: "n",
    ო: "o",
    პ: "p",
    ჟ: "j",
    რ: "r",
    ს: "s",
    ტ: "t",
    უ: "u",
    ფ: "f",
    ქ: "k",
    ღ: "gh",
    ყ: "q",
    შ: "sh",
    ჩ: "ch",
    ც: "ts",
    ძ: "dz",
    წ: "ts",
    ჭ: "ch",
    ხ: "kh",
    ჯ: "j",
    ჰ: "h",
  };
  let result = "";
  for (let char of input) {
    if (georgianToEnglishMap[char]) {
      result += georgianToEnglishMap[char];
    } else if (char !== ".") {
      result += char;
    }
  }
  return result;
}
