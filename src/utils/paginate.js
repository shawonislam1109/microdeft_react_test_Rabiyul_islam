/**
 *This function wo
 * @param {array} array
 * @param {number} pageNumber
 * @param {number} pageSize
 * @returns
 */
const paginate = (array = [], pageNumber, pageSize) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return array?.slice(startIndex, startIndex + pageSize);
};

export { paginate };
