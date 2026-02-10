// Priority calculation utility

function calculatePriority(dateString) {
  const today = new Date();
  const date = new Date(dateString);
  const daysSince = Math.floor((today - date) / (1000 * 60 * 60 * 24));
  
  if (daysSince < 7) {
    return 'high';
  } else if (daysSince < 30) {
    return 'medium';
  }
  
  return 'low';
}

module.exports = {
  calculatePriority
};
