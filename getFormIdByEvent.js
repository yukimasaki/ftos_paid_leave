function getFormIdByEvent(e) {
  const formId = FormApp.getActiveForm().getResponses().length - 1;
  
  return formId;
}
