/* eslint react/forbid-prop-types: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import _map from 'lodash/map';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Board from './Board';
import AddNewDialog from './AddNewDialog';


require('styles/app.scss');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addNewBoardModel: false,
    };
    this.renderBoards = this.renderBoards.bind(this);
    this.toggleNewBoardModal = this.toggleNewBoardModal.bind(this);
    this.renderAddNewBoardModal = this.renderAddNewBoardModal.bind(this);
    this.addBoard = this.addBoard.bind(this);
  }

  addBoard(title) {
    this.props.addBoard(title);
  }

  toggleNewBoardModal() {
    this.setState({
      addNewBoardModel: !this.state.addNewBoardModel,
    });
  }

  renderAddNewBoardModal() {
    return (
      <AddNewDialog
        type="board"
        open={this.state.addNewBoardModel}
        onClose={this.toggleNewBoardModal}
        onAdd={this.props.addBoard}
      />
    );
  }

  renderBoards() {
    return _map(this.props.boards, board => (
      <Board
        key={board.title}
        tasks={board.tasks}
        title={board.title}
        addTaskToBoard={this.props.addTaskToBoard}
        editTask={this.props.editTask}
        deleteTask={this.props.deleteTask}
      />
    ));
  }

  render() {
    return (
      <div>
        <Button variant="fab" color="primary" aria-label="Add" onClick={this.toggleNewBoardModal}>
          <AddIcon />
        </Button>
        {this.renderBoards()}
        {this.renderAddNewBoardModal()}
      </div>
    );
  }
}

App.propTypes = {
  boards: PropTypes.array.isRequired,
  addBoard: PropTypes.func.isRequired,
  addTaskToBoard: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
};

export default DragDropContext(HTML5Backend)(App);
