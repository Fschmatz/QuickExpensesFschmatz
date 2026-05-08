import { getAppParameter, getAllAppParameters, setAppParameter, deleteAppParameter } from '../dao/appParameterDAO';

const appParameterService = {
  get: async (key) => await getAppParameter(key),
  getAll: async () => await getAllAppParameters(),
  insert: async (key, value) => await setAppParameter(key, value),
  update: async (key, value) => await setAppParameter(key, value), // uses INSERT OR REPLACE
  remove: async (key) => await deleteAppParameter(key),
};

export default appParameterService;
