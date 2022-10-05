function getCurrentApprovalStep(id) {
  const currentApprovalStep =
  tablePaidLeaves
  .select(['current_approval_step'])
  .where({'id': ['==', id]})
  .result(true);

  return currentApprovalStep;
}
