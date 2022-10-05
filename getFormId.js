function getFormId(e) {
  const formId = FormApp.getActiveForm().getResponses().length - 1;

  return formId;
}
