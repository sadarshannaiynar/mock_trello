import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import { DialogTitle } from '@material-ui/core';

class AddNewDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      content: props.content,
    };
    this.onAddClick = this.onAddClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onAddClick() {
    if (this.props.type === 'board') {
      this.props.onAdd(this.state.title);
    } else {
      this.props.onAdd(this.state);
    }
    this.props.onClose();
    if (this.props.task === 'add') {
      this.setState({
        title: '',
        content: '',
      });
    }
  }

  handleChange(name) {
    return (
      event => this.setState({
        [name]: event.target.value,
      })
    );
  }

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onClose}
        aria-labelledby="add-new"
      >
        <DialogTitle id="add-new">Add New</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            id="title"
            type="text"
            label="Title"
            defaultValue={this.state.title}
            onChange={this.handleChange('title')}
          />
          <br />
          {
            (this.props.type === 'task') ?
              <TextField
                id="content"
                type="text"
                label="Content"
                defaultValue={this.state.content}
                onChange={this.handleChange('content')}
              /> : <span />
          }
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={this.onAddClick}>Add</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

AddNewDialog.defaultProps = {
  title: '',
  content: '',
  task: 'add',
};

AddNewDialog.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  type: PropTypes.oneOf(['board', 'task']).isRequired,
  task: PropTypes.string,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default AddNewDialog;
