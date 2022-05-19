Feature: AddParams

    Scenario: Add query params to url
        Given I have a url: "<url_in>" without query params
        When I add query params a="<param1>" and b="<param2>"
        Then The query params should be "<out_params>"

  Examples:
   |  url_in                       | param1      | param2 |   out_params        |
   |  http://example.com           | foo         | bar    |   "a=foo&b=bar"     |
   |  http://example.com           | 42          | asd    |   "a=42&b=asd"      |
   |  http://example.com/asd       | parameter   |        |   "a=parameter&b="  | 