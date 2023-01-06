import React from 'react';
import { useSelector } from 'react-redux';

import { modalSelectors } from '../../slices/modalSlice.js';
import Add from './Add.jsx';
import Remove from './Remove.jsx';
import Rename from './Rename.jsx';

const modals = {
  add: Add,
  remove: Remove,
  rename: Rename,
};

const ModalWindow = () => {
  const modalType = useSelector(modalSelectors.type);
  const Modal = modals[modalType];

  if (!Modal) {
    return null;
  }
  return <Modal />;
};

export default ModalWindow;
