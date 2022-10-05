function isTokenMismatch(id_new, paramToken) {
  const latestApprover = tablePaidLeaves
  .select(['token'])
  .where({'id_new': ['==', id_new]})
  .result(false);

  return latestApprover[0].token != paramToken;
}
