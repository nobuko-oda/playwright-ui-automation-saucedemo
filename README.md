# Playwright UI Automation – SauceDemo

## Overview
This project demonstrates automated end-to-end testing using Playwright.

## Test Scope
High-priority login and session scenarios:

- TC-01: Login with valid credentials
- TC-02: Login with locked out user
- TC-03: Login with invalid password
- TC-06: Access inventory without login

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