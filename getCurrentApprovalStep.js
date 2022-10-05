function getCurrentApprovalStep(id_new) {
  const currentApprovalStep =
  tablePaidLeaves
  .select(['current_approval_step'])
  .where({'id': ['==', id_new]})
  .result(true);

  return currentApprovalStep;
}
