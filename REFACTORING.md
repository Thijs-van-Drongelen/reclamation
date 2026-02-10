# Reclamation Code Refactoring

## Overview
This document describes the refactoring performed to eliminate code duplication in the reclamation processing system.

## Identified Duplications

The original code in `src/reclamationProcessor.js` contained significant duplication between `processUserReclamation()` and `processBusinessReclamation()` functions:

1. **Validation Logic** - Both functions had nearly identical field validation with only field names differing
2. **Priority Calculation** - Exact same date-based priority calculation appeared in both functions  
3. **Reference Number Generation** - Similar pattern with only prefix differing
4. **Date Calculations** - Identical date difference calculations in both functions

## Refactoring Changes

### 1. Extracted Validation Logic
Created `src/validator.js` with a generic `validateReclamation()` function that:
- Accepts a reclamation object and an array of required field names
- Validates all required fields are present
- Returns boolean result

**Before:** ~24 lines of duplicated validation code
**After:** Single reusable function (~10 lines)

### 2. Extracted Priority Calculation
Created `src/priorityCalculator.js` with `calculatePriority()` function that:
- Calculates days since a given date
- Returns priority level: 'high' (<7 days), 'medium' (<30 days), or 'low' (>30 days)

**Before:** ~11 lines of duplicated priority logic
**After:** Single reusable function (~10 lines)

### 3. Extracted Reference Number Generation
Created `src/referenceGenerator.js` with `generateReferenceNumber()` function that:
- Accepts a prefix and ID
- Generates unique reference with timestamp

**Before:** ~3 lines of similar code
**After:** Single reusable function (~3 lines)

## Benefits

1. **Maintainability**: Changes to validation, priority calculation, or reference generation now only need to be made in one place
2. **Testability**: Each utility function can be tested independently
3. **Reusability**: These utilities can be easily used by new reclamation types or other modules
4. **Readability**: Main processor functions are now cleaner and focus on their specific logic
5. **Code Size**: Reduced code from ~105 lines to ~60 lines in main processor

## Testing

Added comprehensive test suite in `test/test.js` covering:
- Validation with valid and invalid data
- Priority calculation for different date ranges
- Reference number generation
- Full end-to-end processing for both user and business reclamations

All tests pass successfully.

## Code Structure

```
src/
├── reclamationProcessor.js  (refactored main logic)
├── validator.js             (validation utilities)
├── priorityCalculator.js    (priority logic)
└── referenceGenerator.js    (reference number generation)

test/
└── test.js                  (comprehensive test suite)
```
