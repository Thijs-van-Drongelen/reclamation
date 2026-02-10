// Reclamation processor - refactored to remove duplication

const { validateReclamation } = require('./validator');
const { calculatePriority } = require('./priorityCalculator');
const { generateReferenceNumber } = require('./referenceGenerator');

function processUserReclamation(reclamation) {
  // Validate reclamation
  const requiredFields = ['id', 'name', 'email', 'issue'];
  if (!validateReclamation(reclamation, requiredFields)) {
    return false;
  }

  // Log reclamation details
  console.log(`ID: ${reclamation.id}`);
  console.log(`Type: User Reclamation`);
  console.log(`Name: ${reclamation.name}`);
  console.log(`Email: ${reclamation.email}`);
  console.log(`Issue: ${reclamation.issue}`);
  console.log(`Purchase Date: ${reclamation.purchaseDate}`);

  // Calculate processing priority
  const priority = calculatePriority(reclamation.purchaseDate);
  console.log(`Priority: ${priority}`);

  // Generate reference number
  const referenceNumber = generateReferenceNumber('USER', reclamation.id);
  console.log(`Reference Number: ${referenceNumber}`);

  return true;
}

function processBusinessReclamation(reclamation) {
  // Validate reclamation
  const requiredFields = ['id', 'companyName', 'contactEmail', 'issue'];
  if (!validateReclamation(reclamation, requiredFields)) {
    return false;
  }

  // Log reclamation details
  console.log(`ID: ${reclamation.id}`);
  console.log(`Type: Business Reclamation`);
  console.log(`Company: ${reclamation.companyName}`);
  console.log(`Email: ${reclamation.contactEmail}`);
  console.log(`Issue: ${reclamation.issue}`);
  console.log(`Order Date: ${reclamation.orderDate}`);

  // Calculate processing priority
  const priority = calculatePriority(reclamation.orderDate);
  console.log(`Priority: ${priority}`);

  // Generate reference number
  const referenceNumber = generateReferenceNumber('BUSINESS', reclamation.id);
  console.log(`Reference Number: ${referenceNumber}`);

  return true;
}

module.exports = {
  processUserReclamation,
  processBusinessReclamation
};
