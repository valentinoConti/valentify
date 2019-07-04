/* eslint-disable */

describe("Valentify Cypress Tests", () => {

  it("Testing Static Login Screen", function() {
    cy.visit("http://localhost:8080/")
    // Basic DOM verifications to check we are on the login page
    cy.get('.fondo').should('be.visible');
    cy.get('.fondo').should('have.text', 'Click to login to Spotify');
    cy.get('.fondo').should('have.css', 'background-color').and('match', /255, 165, 0/)
    cy.get('.valentify').should('be.visible');
    cy.get('.valentify').should('have.attr', 'role', 'button')
    cy.get('.valentify').should('have.attr', 'tabindex', '0')
  });

  it("Testing the complete app searching function", function() {
    cy.visit("http://localhost:8080/callback#access_token=BQAHH82wYbwYcyEZ-Oht7mBxlsOE9Tcop-WJr3lVBK3pRTPEEJ8XWpmpH5m0kTtxpsQRWE6wwTE1uSqTjLzXtq__mpWeAWAjPYe4VrdbYreYct1d3uzpLosb3zf7Z4-LS0Ul971Wil5NfyDlbEIh3_VGmMph-IcN5r1IimVNi5i03NiEpRJ5PNTz1jglcMoVfnfhdkDpsg&token_type=Bearer&expires_in=3600&state=4981")
    // Basic DOM verifications to check we are on the Valentify app
    cy.get('.valentify').should('have.attr', 'role', 'button')
    cy.get('.valentify').should('have.attr', 'tabindex', '0')
    cy.get('p').should(($p) => {
      expect($p).to.have.length(3)
      expect($p.first(), 'first p item').to.contain('Search your favourite songs, artists and albums over Spotify')
      expect($p.eq(1)).to.have.descendants('input')
    })
    cy.get('#placingholder').should('have.attr', 'placeholder')

    // Check if searching function is working
    cy.get('h2').should('not.exist')
    cy.get('#placingholder').type('Smells like teen spirit')
    cy.get('#searching').click()
    cy.get('h2').should('exist')
    cy.get('h2').should('have.text', 'Songs')

    // If tests didn't failed until now, there should be songs to choose:
    // Check if thats true
    cy.get('td').should(($td) => {
      expect($td).not.to.have.length(0)
      expect($td.first()).to.have.attr('role', 'menuitem')
      expect($td.first()).to.have.attr('class', 'square elemSize')
      expect($td.first().children()).to.have.length(1)
    })

    // Test favoriting and unfavoriting function
    cy.get('.nomar').should('not.exist')
    cy.get('td').first().click()
    cy.get('.nomar').should('exist')
    cy.get('.bigFont').should('have.attr', 'class', 'bigFont fa fa-star') //not favorited
    cy.get('.bigFont').click()
    cy.get('.bigFont').should('have.attr', 'class', 'bigFont fa fa-star checked') //favorited
    cy.get('.bigFont').click()
    cy.get('.bigFont').should('have.attr', 'class', 'bigFont fa fa-star') //not favorited

    // Click on the album of the song and check if we are on an album page
    cy.get('.nomar').first().click()
    cy.get('p').first().should('have.text', 'Album')
    cy.get('b').contains('Songs List:')

    // Now click on the artist of the album and check if we are on an artist page
    cy.get('.nomar').first().click()
    cy.get('p').first().should('have.text', 'Artist')
    cy.get('b').contains('Albums:')
    cy.get('img[alt="Artwork"').should('exist')
  });

  it("Testing the profile function of the app", function() {
    cy.visit("http://localhost:8080/callback#access_token=BQAHH82wYbwYcyEZ-Oht7mBxlsOE9Tcop-WJr3lVBK3pRTPEEJ8XWpmpH5m0kTtxpsQRWE6wwTE1uSqTjLzXtq__mpWeAWAjPYe4VrdbYreYct1d3uzpLosb3zf7Z4-LS0Ul971Wil5NfyDlbEIh3_VGmMph-IcN5r1IimVNi5i03NiEpRJ5PNTz1jglcMoVfnfhdkDpsg&token_type=Bearer&expires_in=3600&state=4981")
    // Check we are on Valentify app
    cy.get('p').should(($p) => {
      expect($p).to.have.length(3)
      expect($p.first(), 'first p item').to.contain('Search your favourite songs, artists and albums over Spotify')
      expect($p.eq(1)).to.have.descendants('input')
    })

    //Click on profile and verify we are there
    cy.get('.completeButton').contains('Profile').click()
    cy.wait(600)
    cy.get('p').contains('Profile')
    cy.get('img[alt="Profile"]').should('exist')
    cy.get('p').contains('Now Playing:')
    cy.get('button.item[type="button"]').should(($button) => {
      expect($button).to.have.length(2)
    })
  });
})

