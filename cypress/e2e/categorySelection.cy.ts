describe("Category Selection", () => {
  it("should select the default category on load", () => {
    cy.visit('http://localhost:3000/');
    cy.get("[data-testid='category-select'] input").should("have.value", "All");

    // should show the three cards
    cy.get("[data-testid='overview']").children().should("have.length", 3);
    // should show the all categories donut chart
    cy.get("[data-testid='all-chart']").should("exist");
    // should show the table and table footer
    cy.get("[data-testid='table']").should("exist");
    cy.get("[data-testid='table']").children().should("have.length", 2);
    cy.get("[data-testid='table'] tbody tr").should("have.length", 7);
    cy.get("[data-testid='table'] footer").should("exist");
    cy.get("[data-testid='table'] footer").contains("Showing data 7 of 7");
  });


  it("should update data when a different category is selected", () => {
    cy.visit('http://localhost:3000/');
    // select the efficiency category
    cy.get("[data-testid='category-select'] button").click();
    cy.get('[role="option"]').contains('efficiency').click();

    // should show the three cards
    cy.get("[data-testid='overview']").children().should("have.length", 3);
    // should not show the all categories donut chart
    cy.get("[data-testid='all-chart']").should("not.exist");
    // should present the efficiency charts
    cy.get("[data-testid='efficiency-charts']").should("exist");
    cy.get("[data-testid='efficiency-charts']").children().should("have.length", 2);
    // should show the table and table footer
    cy.get("[data-testid='table']").should("exist");
    cy.get("[data-testid='table']").children().should("have.length", 2);
    cy.get("[data-testid='table'] tbody tr").should("have.length", 3);
    cy.get("[data-testid='table'] footer").should("exist");
    cy.get("[data-testid='table'] footer").contains("Showing data 3 of 7");
  });


  describe("when we click in the categories chart", () => {
    it("should update data when a different category is selected", () => {
      cy.visit('http://localhost:3000/');
      // select the efficiency category
      cy.get("[data-testid='all-chart'] .recharts-layer g").eq(2).click();

      cy.get("[data-testid='category-select'] input").should("have.value", "downtime");

      // should show the three cards
      cy.get("[data-testid='overview']").children().should("have.length", 3);
      // should not show the all categories donut chart
      cy.get("[data-testid='all-chart']").should("not.exist");
      // should present the downtime charts
      cy.get("[data-testid='downtime-chart']").should("exist");
      cy.get("[data-testid='downtime-chart']").children().should("have.length", 1);
      // should show the table and table footer
      cy.get("[data-testid='table']").should("exist");
      cy.get("[data-testid='table']").children().should("have.length", 2);
      cy.get("[data-testid='table'] tbody tr").should("have.length", 2);
      cy.get("[data-testid='table'] footer").should("exist");
      cy.get("[data-testid='table'] footer").contains("Showing data 2 of 7");
    });
  });


});
