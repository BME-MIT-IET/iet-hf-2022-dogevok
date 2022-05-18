Feature: AddParams

    Scenario: Add query params to url
        Given I have a url without query params
        When I add query params a="foo" and b=42
        Then The query params should be "a=foo&b=42"