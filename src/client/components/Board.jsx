import React from 'react';
import PropTypes from 'prop-types';
import _map from 'lodash/map';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { DropTarget } from 'react-dnd';
import TaskCard from './TaskCard';
import AddNewDialog from './AddNewDialog';

const boardTarget = {
  drop(props, monitor) {
    const droppedTask = monitor.getItem();
    props.addTaskToBoard(props.title, {
      title: droppedTask.title,
      content: droppedTask.content,
    });
    props.deleteTask(droppedTask.boardTitle, droppedTask.id);
    return { ...props };
  },
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
});

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addNewTaskModal: false,
    };
    this.toggleNewTaskModal = this.toggleNewTaskModal.bind(this);
    this.renderAddNewTaskModal = this.renderAddNewTaskModal.bind(this);
    this.addTask = this.addTask.bind(this);
    this.renderTasks = this.renderTasks.bind(this);
  }

  addTask(task) {
    this.props.addTaskToBoard(this.props.title, task);
  }

  toggleNewTaskModal() {
    this.setState({
      addNewTaskModal: !this.state.addNewTaskModal,
    });
  }

  renderAddNewTaskModal() {
    return (
      <AddNewDialog
        type="task"
        open={this.state.addNewTaskModal}
        onClose={this.toggleNewTaskModal}
        onAdd={this.addTask}
      />
    );
  }

  renderTasks() {
    return _map(this.props.tasks, task => (
      <TaskCard
        key={task.title}
        boardTitle={this.props.title}
        editTask={this.props.editTask}
        deleteTask={this.props.deleteTask}
        {...task}
      />
    ));
  }

  render() {
    return this.props.connectDropTarget((
      <div>
        <Card className="board">
          <CardHeader title={this.props.title} />
          <CardContent className="board__content">
            {this.renderTasks()}
            {this.renderAddNewTaskModal()}
          </CardContent>
          <CardActions>
            <IconButton aria-label="Add" onClick={this.toggleNewTaskModal}>
              <AddIcon />
            </IconButton>
          </CardActions>
        </Card>
      </div>
    ));
  }
}

Board.propTypes = {
  title: PropTypes.string.isRequired,
  deleteTask: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
};

export default DropTarget('TASK', boardTarget, collect)(Board);
