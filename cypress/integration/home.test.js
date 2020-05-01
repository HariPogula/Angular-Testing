describe("Home Page", () => {
  beforeEach(() => {
    // First we need to mock up the data using courses.json and save them in courseJSON.
    cy.fixture("courses.json").as("courseJSON");

    // call the mock server
    cy.server();

    // Next we call API endpoint and result will save in courseJSON. @ is to represent the payload.
    cy.route("/api/courses", "@courseJSON").as("courses");

    //Visit the main page.
    cy.visit("/");
  });

  it("should display list of courses", () => {
    //Check the page- Page contains All Courses text.
    cy.contains("All Courses");

    // wait for the courses data
    cy.wait("@courses");
    cy.get("mat-card").should("have.length", 9);
  });

  it("should display advanced courses", () => {
    // Should check home page contains 2 tabs (Beginners and Advanced)
    cy.get(".mat-tab-label").should("have.length", 2);

    //Click the Advanced tab.
    cy.get(".mat-tab-label").last().click();

    cy.get(".mat-tab-body-active .mat-card-title")
      .its("length")
      .should("be.gt", 1);

    cy.get(".mat-tab-body-active .mat-card-title")
      .first()
      .should("contain", "Angular Security Course");
  });
});
