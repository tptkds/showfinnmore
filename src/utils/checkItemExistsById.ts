const checkItemExistsById = (id: number, items: {} | any[]) => {
  const stringifyId = id.toString();

  if (Array.isArray(items)) {
    return items.includes(stringifyId);
  } else {
    return Object.keys(items).includes(stringifyId);
  }
};

export default checkItemExistsById;
