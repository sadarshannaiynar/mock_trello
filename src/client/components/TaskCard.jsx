import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { DragSource } from 'react-dnd';
import AddNewDialog from './AddNewDialog';

const taskSource = {
  beginDrag(props) {
    return { ...props };
  },
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

class TaskCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editTaskModal: false,
    };
    this.editTask = this.editTask.bind(this);
    this.toggleEditTaskModal = this.toggleEditTaskModal.bind(this);
    this.renderEditTaskModal = this.renderEditTaskModal.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  editTask(task) {
    this.props.editTask(this.props.boardTitle, this.props.id, task);
  }

  toggleEditTaskModal() {
    this.setState({
      editTaskModal: !this.state.editTaskModal,
    });
  }

  deleteTask() {
    this.props.deleteTask(this.props.boardTitle, this.props.id);
  }

  renderEditTaskModal() {
    return (
      <AddNewDialog
        type="task"
        task="edit"
        title={this.props.title}
        content={this.props.content}
        open={this.state.editTaskModal}
        onClose={this.toggleEditTaskModal}
        onAdd={this.editTask}
      />
    );
  }

  render() {
    const opacity = (this.props.isDragging) ? 0.5 : 1;
    return (
      this.props.connectDragSource((
        <div>
          <Card className="task-card" style={{ opacity }}>
            <CardHeader className="task-card__header" title={this.props.title} />
            <CardContent className="task-card__content">
              {this.props.content}
              {this.renderEditTaskModal()}
            </CardContent>
            <CardActions>
              <IconButton aria-label="Delete" onClick={this.deleteTask}>
                <DeleteIcon />
              </IconButton>
              <IconButton aria-label="Edit" onClick={this.toggleEditTaskModal}>
                <EditIcon />
              </IconButton>
            </CardActions>
          </Card>
        </div>
      ))
    );
  }
}

TaskCard.propTypes = {
  editTask: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  deleteTask: PropTypes.func.isRequired,
  boardTitle: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
};

export default DragSource('TASK', taskSource, collect)(TaskCard);
