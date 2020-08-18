describe("testing form inputs", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/pizza")
    })
    it("Additions", () => {
        cy.get("[data-cy=name]").type("Jonathan Gatz").should("have.value","Jonathan Gatz" );  
        cy.get("[data-cy=pineapple]").check().should("be.checked");
        cy.get("[data-cy=cheese]").check().should("be.checked");
        cy.get("[data-cy=pepperoni]").check().should("be.checked");
        cy.get("[data-cy=sausage]").check().should("be.checked");
        cy.get("[data-cy=submit]").click();
    })
})