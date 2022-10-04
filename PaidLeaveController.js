function updatePaidLeave(id, args) {
}

function storePaidLeave(id, args) {
  tablePaidLeaves.insert([
    {
      'id': id,
      'form_id': args.formId,
      'recipient_email': args.recipientEmail,
      'recipient_name': args.name,
      'department': args.department,
      'reason': args.answers[0],
      'date_between': args.answers[1],
      'full_or_half': args.answers[2],
      'contact': args.answers[3],
      'memo': args.answers[4],
      'status': '承認中',
      'current_approval_step': 1,
      'max_approval_step': args.maxApprovalStep,
      'created_at': args.date,
      'token': args.token,
    }
  ]);
}
