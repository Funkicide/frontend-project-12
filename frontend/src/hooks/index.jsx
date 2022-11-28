import { useContext } from 'react';

import { AuthContext, ChatContext } from '../contexts/index.jsx';

const useAuth = () => useContext(AuthContext);

const useChat = () => useContext(ChatContext);

export { useAuth, useChat };
