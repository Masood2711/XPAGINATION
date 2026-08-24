describe('React Application Tests', () => {

  beforeEach(() => {
    cy.visit('http://13.205.2.200:8081/'); // Adjust this if your URL is different
  });
    
    it('Should load initial data in the table', () => {
      cy.get('table').should('exist');
      cy.get('table tbody tr').should('have.length', 10); // Ensure at least one row is loaded
    });

    it('Pagination Functionality - Should have pagination controls visible', () => {
      cy.contains('button', 'Previous').should('be.visible');
      cy.contains('button', 'Next').should('be.visible');
    });

    it('Pagination Functionality - Should navigate to the next page', () => {
      cy.contains('button', 'Next').click();
      cy.contains('span,div,h1,h2,h3,h4,h5,h6,p',2).should('be.visible');
    });

    it('Pagination Functionality - Should navigate to the previous page after moving to the next page', () => {
      cy.contains('button', 'Next').click();
      cy.contains('button', 'Previous').click();
      cy.contains('span,div,h1,h2,h3,h4,h5,h6,p',1).should('be.visible');
    });

    it('API Data Fetching and Error Handling - Should display an alert message on failed data fetch', () => {
      // Intercept the API request and simulate a failure
      cy.intercept('GET', 'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json', {
        statusCode: 500,
        body: 'Error'
      }).as('fetchDataFailed');
  
      // Stub the window.alert to verify it gets called with the correct message
      const stub = cy.stub();
      cy.on('window:alert', stub);
  
      // Visit the page that triggers the API request
      cy.visit('http://13.205.2.200:8081/')
        .wait('@fetchDataFailed')
        .then(() => {
          // Check if the alert was called with the correct message, ignoring case
          expect(stub.getCall(0)).to.be.calledWithMatch(/failed to fetch data/i);
        });
    });
});
