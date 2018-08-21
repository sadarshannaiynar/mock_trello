import { connect } from 'react-redux';
import App from 'components/App';
import actions from '../actions/boardActions';

const mapStateToProps = state => ({
  boards: state.boardReducer.boards,
});

const mapDispatchToProps = dispatch => ({
  addBoard: (title) => {
    dispatch(actions.addBoard(title));
  },
  addTaskToBoard: (boardTitle, task) => {
    dispatch(actions.addTaskToBoard(boardTitle, task));
  },
  deleteTask: (boardTitle, taskId) => {
    dispatch(actions.removeTask(boardTitle, taskId));
  },
  editTask: (boardTitle, taskId, task) => {
    dispatch(actions.editTask(boardTitle, taskId, task));
  },
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
