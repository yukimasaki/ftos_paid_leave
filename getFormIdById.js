function getFormIdById(id) {
  const result = tablePaidLeaves
  .select(['form_id'])
  .where({'id': ['==', id]})
  .result(false);
  
  const formId = result[0].form_id;

  return formId;
}
