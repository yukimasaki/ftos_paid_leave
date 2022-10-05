function isTokenMismatch(id_new, paramToken) {
  const latestApprover = tablePaidLeaves
  .select(['token'])
  .where({'id': ['==', id_new]})
  .result(false);

  return latestApprover[0].token != paramToken;
}
