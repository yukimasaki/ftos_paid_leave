function updatePaidLeaves(id, status, token, currentApprovalStep) {
  tablePaidLeaves
  .update({
    'status': status,
    'token': token,
    'current_approval_step': currentApprovalStep
  },{
    'id': ['==', id]
  });  
}
