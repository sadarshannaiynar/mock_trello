import actions from '../constants/actionTypes';

const addBoard = title => ({
  type: actions.ADD_BOARD,
  payload: {
    title,
    tasks: [],
  },
});

const addTaskToBoard = (boardTitle, task) => ({
  type: actions.ADD_TASK,
  boardTitle,
  task,
});

const removeTask = (boardTitle, taskId) => ({
  type: actions.REMOVE_TASK,
  boardTitle,
  taskId,
});

const editTask = (boardTitle, taskId, task) => ({
  type: actions.EDIT_TASK,
  boardTitle,
  taskId,
  task,
});

const dragTask = (nextBoardTitle, previousBoardTitle, taskId, task) => ({
  type: actions.DRAG_TASK,
  nextBoardTitle,
  previousBoardTitle,
  taskId,
  task,
});

export default {
  addBoard,
  addTaskToBoard,
  removeTask,
  editTask,
  dragTask,
};
