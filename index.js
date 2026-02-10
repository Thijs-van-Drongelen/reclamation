// Main entry point for the reclamation application

const { processUserReclamation, processBusinessReclamation } = require('./src/reclamationProcessor');

// Example usage
const userReclamation = {
  id: '001',
  type: 'user',
  name: 'John Doe',
  email: 'john@example.com',
  issue: 'Defective product',
  purchaseDate: '2024-01-15'
};

const businessReclamation = {
  id: '002',
  type: 'business',
  companyName: 'ACME Corp',
  contactEmail: 'contact@acme.com',
  issue: 'Wrong shipment',
  orderDate: '2024-02-01'
};

console.log('Processing User Reclamation:');
processUserReclamation(userReclamation);

console.log('\nProcessing Business Reclamation:');
processBusinessReclamation(businessReclamation);
