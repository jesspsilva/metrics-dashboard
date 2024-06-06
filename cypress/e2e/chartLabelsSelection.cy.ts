describe("Labels Selection", () => {
  describe("when we click in the label of a clickable chart", () => {
    it("should update data when a different category is selected", () => {
      cy.visit('http://localhost:3000/');

      // select the efficiency category
      cy.get("[data-testid='category-select'] button").click();
      cy.get('[role="option"]').contains('efficiency').click();
      cy.wait(1000)

      // click in the bar chart first label
      cy.get("[data-testid='efficiency-charts'] .recharts-bar-rectangle").eq(1).click();

      // should update the data displayd in the table
      cy.get("[data-testid='table']").should("exist");
      cy.get("[data-testid='table']").children().should("have.length", 2);
      cy.get("[data-testid='table'] tbody tr").should("have.length", 1);
      cy.get("[data-testid='table'] footer").should("exist");
      cy.get("[data-testid='table'] footer").contains("Showing data 1 of 7");
    });

    describe("and we click in the same label again", () => {
      it("should reset the data displayed in the table", () => {
        cy.visit('http://localhost:3000/');
        // select the efficiency category
        cy.get("[data-testid='category-select'] button").click();
        cy.get('[role="option"]').contains('efficiency').click();
        cy.wait(1000)

        // click in the bar chart first label
        cy.get("[data-testid='efficiency-charts'] .recharts-bar-rectangle").eq(1).click();

        // click in the bar chart first label again
        cy.get("[data-testid='efficiency-charts'] .recharts-bar-rectangle").eq(1).click();

        // should reset the data displayed in the table
        cy.get("[data-testid='table']").should("exist");
        cy.get("[data-testid='table']").children().should("have.length", 2);
        cy.get("[data-testid='table'] tbody tr").should("have.length", 3);
        cy.get("[data-testid='table'] footer").should("exist");
        cy.get("[data-testid='table'] footer").contains("Showing data 3 of 7");
      });
    });
  });


});
