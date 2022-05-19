Feature: CheckUrlLength

    Scenario Outline: Check url length
        Given I have another url: "<url>" 
        When I add params: "<params>"
        Then I should have a new url with the length: "<n>"

    Examples:
        |  url                           | params               | n                                   |
        |  https://example.com           | /changedpath         | 31                                  |
        |  https://example.com           | /changedpath/asd     | 35                                  |
        |  https://example.com/asd       | /                    | 20                                  | 