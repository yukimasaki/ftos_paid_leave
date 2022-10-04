function isPendingApproval(id) {
  const results = tablePaidLeaves
  .select(['current_approval_step', 'max_approval_step'])
  .where({'id': ['==', id]})
  .result(false)

  const currentApprovalStep = results[0].current_approval_step;
  const maxApprovalStep = results[0].max_approval_step;

  return currentApprovalStep < maxApprovalStep ? true : false;
}