describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "Matias Testing",
      username: "logggintest",
      password: "jamonyqueso",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("username");
    cy.contains("password");
    cy.contains("login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("logggintest");
      cy.get("#password").type("jamonyqueso");
      cy.get("#login-button").click();

      cy.contains("Matias Testing logged in");
    });

    it("fails with wrong credentials and notification shown is of color red", function () {
      cy.get("#username").type("logggintest");
      cy.get("#password").type("failing");
      cy.get("#login-button").click();

      cy.contains("Wrong credentials");
      cy.get("#notification").should("have.css", "color", "rgb(255, 0, 0)");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "logggintest", password: "jamonyqueso" });
    });

    it("A blog can be created", function () {
      cy.get("#open-modal").click();

      cy.get("#title").type("Testing is getting fun");
      cy.get("#author").type("NotThatMuchTho");
      cy.get("#url").type("www.keepworking.com");
      cy.get("#createBlog-button").click();

      cy.contains("Testing is getting fun");
    });

    it("A blog can be liked", function () {
      cy.createBlog({
        title: "Testing is getting fun and i like it",
        author: "NotThatMuchTho",
        url: "www.keepworking.com",
        likes: 99,
      });

      cy.get("#show-button").click();

      cy.get("#like-button").click();
      cy.contains("Likes: 100");
    });
  });

  describe("Authorization only to creator", function () {
    beforeEach(function () {
      cy.login({ username: "logggintest", password: "jamonyqueso" });

      cy.createBlog({
        title: "Blog to delete",
        author: "Myself",
        url: "www.keepworking.com",
        likes: 1,
      });

      cy.createBlog({
        title: "Blog to fail deleting",
        author: "Myself",
        url: "www.keepworking.com",
        likes: 1,
      });
    });

    it("A blog can be deleted by its creator", function () {
      cy.get("#show-button").click();
      cy.get("#delete-button").click();

      cy.contains("Blog to delete").should("not.exist");
    });

    it("A blog can NOT be deleted by people who isn't it's creator", function () {
      cy.get("#logout-button").click();
      cy.request("POST", "http://localhost:3001/api/users/", {
        name: "the one who cannot",
        username: "notauthorized",
        password: "jamonyqueso",
      });
      cy.login({ username: "notauthorized", password: "jamonyqueso" });

      cy.get("#show-button").last().click();
      cy.get("#delete-button").click();
      cy.contains("Blog to fail deleting");
      cy.contains("Request failed with status code 401");
    });
  });

  describe("Ordering by likes button working properly", function () {
    beforeEach(function () {
      cy.login({ username: "logggintest", password: "jamonyqueso" });

      cy.createBlog({
        title: "Blog to delete",
        author: "Myself",
        url: "www.keepworking.com",
        likes: 2,
      });
      cy.createBlog({
        title: "Blog to delete",
        author: "Myself",
        url: "www.keepworking.com",
        likes: 1,
      });
      cy.createBlog({
        title: "Blog to delete",
        author: "Myself",
        url: "www.keepworking.com",
        likes: 3,
      });
      cy.createBlog({
        title: "Blog to delete",
        author: "Myself",
        url: "www.keepworking.com",
        likes: 4,
      });
    });

    it("First blog is the most liked one, and last is the least liked one", function () {
      cy.get("#sort-button").click().click();

      cy.get("#show-button").click();
      cy.get(".blog").contains("Likes: 4");
      cy.get("#show-button").last().click();
      cy.get(".blog").last().contains("Likes: 3");
      cy.get("#show-button").last().click();
      cy.get(".blog").last().contains("Likes: 2");
      cy.get("#show-button").last().click();
      cy.get(".blog").last().contains("Likes: 1");
    });
  });
});
