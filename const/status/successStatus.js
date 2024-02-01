const successStatus = {
  GET: { status: 200, code: 'ok', message: 'OK' },

  DELETED: {
    status: 200,
    code: 'deleted',
    message: 'Deleted success',
  },
  CREATED: { status: 201, code: 'created', message: 'Created success' },

  UPDATED: {
    status: 200,
    code: 'updated',
    message: 'Updated success',
  },
};

export default successStatus;
