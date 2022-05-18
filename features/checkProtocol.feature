Feature: CheckProtocol

    Scenario: Check Protocol
        Given I have a "http" protocol in a url
        When I check the protocol of the url
        Then I should see the protocol is "http"