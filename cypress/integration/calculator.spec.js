describe("Setup and basic numbers", () => {
  it("Should visit our calculator", () => {
    cy.visit("http://127.0.0.1:5501/index.html");
  });
  it("Should contain 0", () => {
    cy.get(".zero").contains("0");
  });
});

describe("Test addition operator", () => {
  it("Should equal 8", () => {
    cy.get(".v").click();
    cy.get(".add").click();
    cy.get(".iii").click();
    cy.get(".equals").click();
    cy.get(".calc__display__view").should("have.value", "8");
  })
})
describe("Test multiply operator", () => {
  it("Should equal 99", () => {
    cy.get(".ix").click();
    cy.get(".mult").click();
    cy.get(".i").click();
    cy.get(".i").click();
    cy.get(".equals").click();
    cy.get(".calc__display__view").should("have.value", "99");
  })
})
describe("Test subtract operator", () => {
  it("Should equal 22", () => {
    cy.get(".iv").click();
    cy.get(".iv").click();
    cy.get(".subt").click();
    cy.get(".ii").click();
    cy.get(".ii").click();
    cy.get(".equals").click();
    cy.get(".calc__display__view").should("have.value", "22");
  })
})
describe("Test divide operator", () => {
  it("Should equal 410", () => {
    cy.get(".viii").click();
    cy.get(".ii").click();
    cy.get(".zero").click();
    cy.get(".divi").click();
    cy.get(".ii").click();
    cy.get(".equals").click();
    cy.get(".calc__display__view").should("have.value", "410");
  })
})

describe("Test long multi-operator computations", () => {
  it("Should handle all operators in bidmas order; 3567.0909", () => {
    cy.get(".viii").click();
    cy.get(".iii").click();
    cy.get(".mult").click();
    cy.get(".iv").click();
    cy.get(".iii").click();
    cy.get(".subt").click();
    cy.get(".ii").click();
    cy.get(".i").click();
    cy.get(".divi").click();
    cy.get(".i").click();
    cy.get(".i").click();
    cy.get(".equals").click();
    let result = eval("83*43-21/11").toFixed(4);
    cy.get(".calc__display__view").should((output) => {
      return Number(output).toFixed(4);
    }, result);
  })
  it("Should equal 231", () => {
    cy.get(".i").click();
    cy.get(".i").click();
    cy.get(".mult").click();
    cy.get(".ii").click();
    cy.get(".ii").click();
    cy.get(".subt").click();
    cy.get(".ii").click();
    cy.get(".ii").click();
    cy.get(".divi").click();
    cy.get(".ii").click();
    cy.get(".equals").click();
    cy.get(".calc__display__view").should("have.value", "231");
  })
  it("Should handle negative start and decimal; result 234.5625", () => {
    cy.get(".subt").click();
    cy.get(".ii").click();
    cy.get(".i").click();
    cy.get(".v").click();
    cy.get(".divi").click();
    cy.get(".iii").click();
    cy.get(".ii").click();
    cy.get(".mult").click();
    cy.get(".ii").click();
    cy.get(".vii").click();
    cy.get(".dot").click();
    cy.get(".vi").click();
    cy.get(".add").click();
    cy.get(".i").click();
    cy.get(".viii").click();
    cy.get(".ix").click();
    cy.get(".equals").click();
    let result = eval("-215/32*27.6+189").toFixed(4);
    cy.get(".calc__display__view").should((output) => {
      return Number(output).toFixed(4);
    }, result);
  })
})


describe("Test delete and clear", () => {
  it("Should go from 82 to 8", () => {
    cy.get(".viii").click();
    cy.get(".ii").click();
    cy.get(".del").click();
    cy.get(".calc__display__view").should("have.value", "8");
  })

  it("Should go from 82 to 0", () => {
    cy.get(".viii").click();
    cy.get(".ii").click();
    cy.get(".clr").click();
    cy.get(".calc__display__view").should("have.value", "0");
  })
})


describe("Test answer scrolling", () => {
  it("Should input previous answer of 5", () => {
    cy.get(".ii").click();
    cy.get(".add").click();
    cy.get(".iii").click();
    cy.get(".equals").click();
    cy.get(".clr").click();
    cy.get(".ans").click();
    cy.get(".calc__display__view").should("have.value", "5");
  })

  it("Should input previous, previous answer of 5", () => {
    cy.get(".clr").click();
    cy.get(".ii").click();
    cy.get(".add").click();
    cy.get(".iii").click();
    cy.get(".equals").click();
    cy.get(".clr").click();
    cy.get(".iii").click();
    cy.get(".equals").click();
    cy.get(".clr").click();
    cy.get(".ansUp").click();
    cy.get(".ans").click();
    cy.get(".calc__display__view").should("have.value", "5");
  })

  it("Should input scroll ans up twice then down and input prev. answer of 4", () => {
    cy.get(".clr").click();
    cy.get(".ii").click();
    cy.get(".add").click();
    cy.get(".iii").click();
    cy.get(".equals").click();
    cy.get(".clr").click();
    cy.get(".iii").click();
    cy.get(".add").click();
    cy.get(".i").click();
    cy.get(".equals").click();
    cy.get(".clr").click();
    cy.get(".iv").click();
    cy.get(".add").click();
    cy.get(".v").click();
    cy.get(".equals").click();
    cy.get(".clr").click();
    cy.get(".ansUp").click();
    cy.get(".ansUp").click();
    cy.get(".ansDown").click();
    cy.get(".ans").click();
    cy.get(".calc__display__view").should("have.value", "4");
  })
})