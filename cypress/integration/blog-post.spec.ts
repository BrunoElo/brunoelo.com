describe('List of blog posts', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.url().should('eq', `http://localhost:4300/blog`);
  });

  it('should navigate to a blog post', () => {
    cy.get('.blog__item').first().as('blogPost');

    cy.get('@blogPost')
      .should('have.attr', 'ng-reflect-router-link')
      .then((href) => {
        console.log(href);
        cy.get('@blogPost').click();
        cy.url().should('eq', `http://localhost:4300${href}`);

        cy.get('.blog-category__list').should('exist');
        cy.get('.article__date').should('exist');
        cy.get('.article__title').should('exist');
        cy.get('.article__subtitle').should('exist');
      });
  });

  it('should have a filled read progress bar', () => {
    cy.intercept('**/index.html').as('blogPage');
    cy.wait('@blogPage');
    cy.scrollTo('bottom');
    cy.get('.read-progress-bar')
      .should('have.attr', 'style')
      .and('include', 'width: 100%');
  });

  it('should navigate to blog list page from blog post', () => {
    cy.get('.blog__header').contains('Blog').click();
    cy.url().should('eq', 'http://localhost:4300/blog');
  });
});
