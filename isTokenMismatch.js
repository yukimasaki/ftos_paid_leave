function isTokenMismatch(id, paramToken) {
  const latestApprover = tablePaidLeaves
  .select(['token'])
  .where({'id': ['==', id]})
  .result(false);

  return latestApprover[0].token != paramToken;
}
