const successStatus = {
  GET: { status: 200, code: 'ok', message: 'Success' },

  DELETED: {
    status: 200,
    code: 'deleted',
    message: 'Deleted success',
  },

  DELETED_BOARD: {
    status: 200,
    code: 'deleted',
    message: 'Board deleted successfully',
  },

  CREATED: { status: 201, code: 'created', message: 'Created success' },

  CREATED_BOARD: {
    status: 201,
    code: 'created',
    message: 'Board created successfully',
  },

  UPDATED: {
    status: 200,
    code: 'updated',
    message: 'Updated success',
  },

  UPDATED_BOARD: {
    status: 200,
    code: 'updated',
    message: 'Board updated successfully',
  },
};

export default successStatus;
