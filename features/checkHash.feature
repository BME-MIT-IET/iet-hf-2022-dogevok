Feature: CheckHash
  Test out the hash modification.

  Scenario: Check the modification of the hash
    Given I have an url: "<url_in>" 
    When I set the hash to "<hash>"
    Then I should have a new url with hash: "<url>"

  Examples:
   | url_in                          | hash | url                                 |
   | https://example.com             | hess | https://example.com/#hess            |
   | https://example.com/asd         | hess | https://example.com/asd#hess         |
   | https://example.com/asdasd?a=1  | hess | https://example.com/asdasd?a=1#hess  | 