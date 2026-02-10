// Reference number generation utility

function generateReferenceNumber(prefix, id) {
  const timestamp = Date.now();
  return `${prefix}-${id}-${timestamp}`;
}

module.exports = {
  generateReferenceNumber
};
