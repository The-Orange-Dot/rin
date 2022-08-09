/// <reference types="cypress" />

describe("news page navigation", () => {
  beforeEach(() => {
    cy.visit("https://rin-ten.vercel.app/");
    cy.viewport(1280, 720);
    cy.wait(500);
    cy.get(`[class*="navbarContainer"]`).contains("News").click();
  });

  it("navigate news page", () => {
    //News Navigation
    cy.location("pathname").should("include", "news");

    cy.go("back");
    cy.location("pathname").should("not.include", "news");

    cy.go("forward");
    cy.location("pathname").should("include", "news");

    //Wait for animation on news page
    cy.wait(2500);

    //Clicks main post
    cy.get(`[class*="main_post_container"]`).should("not.be.null").click();
    cy.location("pathname").should("match", /\Wnews\W\d/);
    cy.go("back");

    //Goes through other posts
    cy.location("pathname").should("include", "news");
    cy.get(`[class*="post_container"]`).eq(1).click();
    cy.location("pathname").should("match", /\Wnews\W\d/);
    cy.go("back");

    cy.location("pathname").should("include", "news");
    cy.get(`[class*="post_container"]`).eq(2).click();
    cy.location("pathname").should("match", /\Wnews\W\d/);
    cy.go("back");

    cy.location("pathname").should("include", "news");
    cy.get(`[class*="post_container"]`).eq(3).click();
    cy.location("pathname").should("match", /\Wnews\W\d/);
    cy.go("back");

    cy.get(`[class*="filter"]`).click({ multiple: true }).should("be.ok");

    cy.wait(500);
    cy.get(`[class*="navbarContainer"]`).contains("Home").click();
    cy.location("pathname").should("not.include", "news");
  });
});
