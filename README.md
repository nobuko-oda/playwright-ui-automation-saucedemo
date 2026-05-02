# Playwright UI Automation – SauceDemo

## Overview
This project demonstrates automated end-to-end testing using Playwright.

## Test Scope / Covered Scenarios
High-priority login and session scenarios:

- TC-01: Valid login and inverntory page validation
- TC-02: Locked out user validation
- TC-03: Invalid password validation
- TC-06: Unauthorized inventory access validation

## Test Data
The following test users are used for validation:
- `standard_user` / `secret_sauce`
    - Valid user for positive login scenarios
- `locked_out_user` / `secret_sauce`
    - Used to validate account lock behavior
- Invalid credentials (e.g., wrong password)
    - Used for negative testing and error handling validation

## Test Design Approach
- Focusd on high-risk authentication and access control scenarios
- Selected stable and repeatable test cases (high ROI for automation)
- Mapped test cases to QA IDs for traceability (TC-XX format)

## Framework Structure
- Reusable login function to reduce duplication
- Test grouping using `test.describe`
- Clear separation between:
    - Authentication tests
    - Session/navigation tests
- Page Object Model (POM) implementation:
    - `LoginPage` handles login actions and error validation
    - `InventoryPage` handles post-login validations
- Improved maintainability by separating UI interactions from test logic

## Execution
- Run across:
    - Chromium
    - Firefox
    - WebKit
- Example: 
npx playwright test

## Reporting 
- HTML report generated after execution:
npx playwright show-report

## Tech Stack
- Playwright
- TypeScript
- Node.js


## Known Limitations / Future Improvements

- No API-level validation (UI-only testing)
- No test data management strategy (hardcoded credentials)
- No CI/CD integration (e.g., GitHub Actions)
- Limited negative scenarios
- No visual regression testing
- No mobile/responsive test coverage (currently desktop only)

### Future Improvements

- Add API tests for backend validation
- Integrate with CI/CD pipeline (GitHub actions)
- Expand negative and edge case coverage
- Implement test data management strategy
- Add mobile browser testing