import { combineReducers } from 'redux';
import appReducer from './slices/app';
import profileReducer from "./slices/profile";
import chatReducer from "./slices/chat";
import authReducer from './slices/auth';
import conversationReducer from "./slices/conversation";
// import audioCallReducer from './slices/audioCall';
// import videoCallReducer from './slices/videoCall';
// import conversationReducer from './slices/conversation';

// ----------------------------------------------------------------------

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  profile: profileReducer,
  chat:chatReducer,
   conversation:conversationReducer,
//   conversation: conversationReducer,
//   audioCall: audioCallReducer,
//   videoCall: videoCallReducer,
});

export default rootReducer ;