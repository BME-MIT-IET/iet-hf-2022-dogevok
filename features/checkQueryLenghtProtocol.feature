Feature: CheckQueryLength

  Scenario Outline: Check query length
    Given I have new url: "<url>" 
    When I add a query: "<query>"
    Then I should have a new url with the query length: "<n>"

  Examples:
   |  url                           | query                | n                                   |
   |  https://example.com           | /?changedquery       | 14                                  |
   |  https://example.com           | /?changedquery/asd   | 18                                  |
  