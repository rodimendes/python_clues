test("With Callback Function", withCallbackFunction);

function withCallbackFunction() {
  console.log("Callback Function");
}

test("With Anonymous Function", function () {
  console.log("Anonymous Function");
});

test("Arrow Function", () => {
  console.log("Arrow Funcition");
});

test("1 é igual a 1", () => {
  expect(1).toBe(1);
});
/* O valor da esquerda deve ser dinâmico (softcoded) enquanto o valor da direita deve ser hardcoded */
