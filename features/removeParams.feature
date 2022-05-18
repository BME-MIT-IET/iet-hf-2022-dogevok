Feature: RemoveParams

    Scenario: Remove params from the url
        Given I have a url with query params
        When I remove the query params
        Then I should have a url with zero query params