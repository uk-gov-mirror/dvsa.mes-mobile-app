@catam2
Feature: A Driving Examiner Completes failed tests

  Scenario: Examiner completes failed test with 11 faults
    Given I am logged in as "desexamineram2" and I have a test for "Mr Richard Rhys"
    When I start the test for "Mr Richard Rhys"
    And the candidate completes the declaration page
    And the candidate confirms their declaration
    Then I should see the "Declaration - Richard Rhys" page
    When the candidate requests to receive results by post
    And I proceed to the bike
    Then I should see the "Richard Rhys" page
    And I complete the waiting room to bike page with confirmed cat type "A2"
    Then I should see the "Test report - Richard Rhys" page
#    When I add a "Manual handling" driver fault
#    And the driver fault count is "1"
#    And I add a "Safety" driver fault
#    And the driver fault count is "2"
#    And I enter "Emergency Stop" first value "23" and second value "45"
#    And I enter "Avoidance Stop" first value "34" and second value "55"
#    When I add a "Use of stand" driver fault
#    And the driver fault count is "3"
#    When I add a "Controlled stop" driver fault
#    And the driver fault count is "4"
#    When I add a "Control" driver fault
#    And the driver fault count is "5"
#    When I add a "Precautions" driver fault
#    And the driver fault count is "6"
#    And I add a "Slow control" driver fault
#    And the driver fault count is "7"
#    And I add a "Emergency stop" driver fault
#    And the driver fault count is "8"
#    And I add a "Avoidance ex. C/Stop" driver fault
#    And the driver fault count is "9"
#    And I add a "Avoidance ex. C/Stop" driver fault
#    And the driver fault count is "10"
#    And I add a "Avoidance ex. C/Stop" driver fault
#    And the driver fault count is "11"
#    When I end the test
#    And I continue to debrief
#    Then I should see the Debrief page with outcome "Unsuccessful"
#    And I see a "driving" fault for "Move Away - Safety"
#    And I see a "driving" fault for "Move Away - Control"
#    And I see a "driving" fault for "Precautions"
#    And I see a "driving" fault for "Manual handling"
#    And I see a "driving" fault for "Use of stand"
#    And I see a "driving" fault for "Slow control"
#    And I see a "driving" fault for "Controlled stop"
#    Then I should see the "Debrief - Richard Rhys" page
#    When I end the debrief
#    Then I am on the post debrief holding page
#    When I continue to the non pass finalisation page
#    And I complete the fail details
#    And I am on the back to office page
#    And I continue to the office write up
#    Then I should see the "Office" page
#    And the office page test outcome is "Unsuccessful"
#    When I complete the office write up
#    And I enter a comment for "driving" fault "Move Away - Safety"
#    And I enter a comment for "driving" fault "Move Away - Control"
#    And I enter a comment for "driving" fault "Precautions"
#    And I enter a comment for "driving" fault "Manual handling"
#    And I enter a comment for "driving" fault "Use of stand"
#    And I enter a comment for "driving" fault "Controlled stop"
#    And I enter a comment for "driving" fault "Slow control"
#    And I enter a comment for "driving" fault "Emergency stop"
#    And I enter a comment for "driving" fault "Avoidance ex. C/Stop"
#    And I upload the test
#    Then I should see the "Journal" page
#    And the test result for "Mr Richard Rhys" is "2"

