Feature: CheckPort

    Scenario: Check Port
        Given I have a "3000" port in a url
        When I check the port of the url
        Then I should see the port is "3000"