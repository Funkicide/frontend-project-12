import React, { createContext, useContext } from 'react';
import { useDispatch } from 'react-redux';

import { actions } from '../slices/index.js';

const ApiContext = createContext({});

const useApi = () => useContext(ApiContext);

const ApiProvider = ({ children, socket }) => {
  const dispatch = useDispatch();

  return (
    <ApiContext.Provider value={socket}>
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;

export { useApi };
