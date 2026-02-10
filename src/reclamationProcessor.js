// Reclamation processor with duplicated code patterns

function processUserReclamation(reclamation) {
  // Validate reclamation
  if (!reclamation.id) {
    console.error('Error: Reclamation ID is required');
    return false;
  }
  if (!reclamation.name) {
    console.error('Error: User name is required');
    return false;
  }
  if (!reclamation.email) {
    console.error('Error: Email is required');
    return false;
  }
  if (!reclamation.issue) {
    console.error('Error: Issue description is required');
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
  const today = new Date();
  const purchaseDate = new Date(reclamation.purchaseDate);
  const daysSincePurchase = Math.floor((today - purchaseDate) / (1000 * 60 * 60 * 24));
  
  let priority = 'low';
  if (daysSincePurchase < 7) {
    priority = 'high';
  } else if (daysSincePurchase < 30) {
    priority = 'medium';
  }
  
  console.log(`Priority: ${priority}`);

  // Generate reference number
  const timestamp = Date.now();
  const referenceNumber = `USER-${reclamation.id}-${timestamp}`;
  console.log(`Reference Number: ${referenceNumber}`);

  return true;
}

function processBusinessReclamation(reclamation) {
  // Validate reclamation
  if (!reclamation.id) {
    console.error('Error: Reclamation ID is required');
    return false;
  }
  if (!reclamation.companyName) {
    console.error('Error: Company name is required');
    return false;
  }
  if (!reclamation.contactEmail) {
    console.error('Error: Contact email is required');
    return false;
  }
  if (!reclamation.issue) {
    console.error('Error: Issue description is required');
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
  const today = new Date();
  const orderDate = new Date(reclamation.orderDate);
  const daysSinceOrder = Math.floor((today - orderDate) / (1000 * 60 * 60 * 24));
  
  let priority = 'low';
  if (daysSinceOrder < 7) {
    priority = 'high';
  } else if (daysSinceOrder < 30) {
    priority = 'medium';
  }
  
  console.log(`Priority: ${priority}`);

  // Generate reference number
  const timestamp = Date.now();
  const referenceNumber = `BUSINESS-${reclamation.id}-${timestamp}`;
  console.log(`Reference Number: ${referenceNumber}`);

  return true;
}

module.exports = {
  processUserReclamation,
  processBusinessReclamation
};
