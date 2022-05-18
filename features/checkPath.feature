Feature: CheckPath

  Scenario Outline: Path
    Given I have an url with path: "<url_in>" 
    When I change the path to "<path>"
    Then I should have the path: "<url>"

  Examples:
   |  url_in                       | path                | url                                 |
   |  http://example.com           | /changedpath        | http://example.com/changedpath      |
   |  http://example.com           | /changedpath/asd    | http://example.com/changedpath/asd  |
   |  http://example.com/asd       | /                   | http://example.com/                 | 