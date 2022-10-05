function getCurrentApprovalStep(id) {
  const result =
  Number(
    tablePaidLeaves
    .select(['current_approval_step'])
    .where({'id': ['==', id]})
    .result(true)
  );

  return currentApprovalStep;
}
