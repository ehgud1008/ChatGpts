// 기본 Redux를 사용한 store.js 설정 예제
import { createStore, combineReducers } from 'redux';
import messageReducer from './message_reducer'; // 가정된 리듀서 경로

const rootReducer = combineReducers({
    message: messageReducer, // 여러 리듀서가 있을 경우 이곳에 추가
});

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;