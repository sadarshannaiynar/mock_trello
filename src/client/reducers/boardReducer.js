import _map from 'lodash/map';
import _findIndex from 'lodash/findIndex';
import _uniqueId from 'lodash/uniqueId';
import actions from '../constants/actionTypes';

const defaultState = {
  boards: [],
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.ADD_BOARD:
      return { ...state, boards: [].concat(state.boards, action.payload) };
    case actions.ADD_TASK: {
      const boards = _map([].concat(state.boards), (board) => {
        const tasks = [].concat(board.tasks);
        if (board.title === action.boardTitle) {
          tasks.push({
            ...action.task,
            id: _uniqueId('task_'),
          });
        }
        return {
          ...board,
          tasks: [].concat(tasks),
        };
      });
      return { ...state, boards };
    }
    case actions.REMOVE_TASK: {
      const boards = _map([].concat(state.boards), (board) => {
        const tasks = [].concat(board.tasks);
        if (board.title === action.boardTitle) {
          const index = _findIndex(tasks, task => task.id === action.taskId);
          tasks.splice(index, 1);
        }
        return {
          ...board,
          tasks: [].concat(tasks),
        };
      });
      return { ...state, boards };
    }
    case actions.EDIT_TASK: {
      const boards = _map([].concat(state.boards), (board) => {
        const tasks = [].concat(board.tasks);
        if (board.title === action.boardTitle) {
          const index = _findIndex(board.tasks, task => task.id === action.taskId);
          tasks.splice(index, 1, { ...action.task, id: action.taskId });
        }
        return {
          ...board,
          tasks: [].concat(tasks),
        };
      });
      return { ...state, boards };
    }
    default:
      return { ...state };
  }
};

export default reducer;
