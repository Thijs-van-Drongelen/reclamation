// Common validation functions

function validateReclamation(reclamation, requiredFields) {
  for (const field of requiredFields) {
    if (reclamation[field] === undefined || reclamation[field] === null || reclamation[field] === '') {
      console.error(`Error: ${field} is required`);
      return false;
    }
  }
  return true;
}

module.exports = {
  validateReclamation
};
