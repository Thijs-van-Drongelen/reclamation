// Simple test suite for refactored code

const { processUserReclamation, processBusinessReclamation } = require('../src/reclamationProcessor');
const { validateReclamation } = require('../src/validator');
const { calculatePriority } = require('../src/priorityCalculator');
const { generateReferenceNumber } = require('../src/referenceGenerator');

let testsRun = 0;
let testsPassed = 0;

function test(description, fn) {
  testsRun++;
  try {
    fn();
    testsPassed++;
    console.log(`✓ ${description}`);
  } catch (error) {
    console.error(`✗ ${description}`);
    console.error(`  ${error.message}`);
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

// Test validation
test('validateReclamation accepts valid data', () => {
  const data = { id: '1', name: 'Test', email: 'test@test.com' };
  const result = validateReclamation(data, ['id', 'name', 'email']);
  assert(result === true, 'Should return true for valid data');
});

test('validateReclamation rejects missing fields', () => {
  const data = { id: '1', name: 'Test' };
  const result = validateReclamation(data, ['id', 'name', 'email']);
  assert(result === false, 'Should return false for missing fields');
});

// Test priority calculation
test('calculatePriority returns high for recent dates', () => {
  const recentDate = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();
  const priority = calculatePriority(recentDate);
  assert(priority === 'high', 'Should return high priority for dates within 7 days');
});

test('calculatePriority returns medium for dates within 30 days', () => {
  const mediumDate = new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString();
  const priority = calculatePriority(mediumDate);
  assert(priority === 'medium', 'Should return medium priority for dates within 30 days');
});

test('calculatePriority returns low for old dates', () => {
  const oldDate = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString();
  const priority = calculatePriority(oldDate);
  assert(priority === 'low', 'Should return low priority for dates older than 30 days');
});

// Test reference number generation
test('generateReferenceNumber creates valid reference', () => {
  const ref = generateReferenceNumber('TEST', '123');
  assert(ref.startsWith('TEST-123-'), 'Should start with prefix and id');
  assert(ref.length > 10, 'Should include timestamp');
});

// Test user reclamation processing
test('processUserReclamation succeeds with valid data', () => {
  const data = {
    id: '001',
    name: 'John Doe',
    email: 'john@example.com',
    issue: 'Test issue',
    purchaseDate: '2024-01-15'
  };
  const result = processUserReclamation(data);
  assert(result === true, 'Should process valid user reclamation');
});

test('processUserReclamation fails with missing data', () => {
  const data = {
    id: '001',
    email: 'john@example.com'
  };
  const result = processUserReclamation(data);
  assert(result === false, 'Should fail with missing required fields');
});

// Test business reclamation processing
test('processBusinessReclamation succeeds with valid data', () => {
  const data = {
    id: '002',
    companyName: 'ACME Corp',
    contactEmail: 'contact@acme.com',
    issue: 'Test issue',
    orderDate: '2024-02-01'
  };
  const result = processBusinessReclamation(data);
  assert(result === true, 'Should process valid business reclamation');
});

test('processBusinessReclamation fails with missing data', () => {
  const data = {
    id: '002',
    contactEmail: 'contact@acme.com'
  };
  const result = processBusinessReclamation(data);
  assert(result === false, 'Should fail with missing required fields');
});

// Print summary
console.log('\n' + '='.repeat(50));
console.log(`Tests run: ${testsRun}`);
console.log(`Tests passed: ${testsPassed}`);
console.log(`Tests failed: ${testsRun - testsPassed}`);
console.log('='.repeat(50));

if (testsPassed === testsRun) {
  console.log('✓ All tests passed!');
  process.exit(0);
} else {
  console.log('✗ Some tests failed');
  process.exit(1);
}
