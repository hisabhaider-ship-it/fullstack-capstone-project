# User Story: Browse and Filter Gifts

## User Story
**As a** registered user,  
**I want to** search and filter available gifts by category and condition,  
**So that** I can easily find household items I need in my local area.

## Details and Assumptions
- The application fetches list data from the MongoDB database collection `gifts`.
- Users can filter by category (e.g., Furniture, Electronics, Toys).
- The system defaults to displaying all available active items if no filter criteria are specified.
- The user must be connected to the internet to perform real-time searching.

## Acceptance Criteria
```gherkin
Feature: Filter items by category

  Scenario: User filters gifts by category successfully
    Given the user is on the GiftLink homepage
    When the user selects "Furniture" from the category dropdown menu
    And clicks the "Search" button
    Then only items with category "Furniture" should be displayed in the list
    And a total count of matching items should be displayed above the grid

  Scenario: User resets search filters
    Given the user has applied a category filter
    When the user clicks the "Reset" button
    Then all available gifts across all categories should be listed again
