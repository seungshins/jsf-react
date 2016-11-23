import React from 'react';
import Layout from '../../components/Layout';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TrelloUI.css';

const TrelloUI = React.createClass({
  getInitialState() {
    return {
      title: this.props.title,
      boardName: 'Sample Board',
      editPopup: this.editMemo,
      openMemoEditor: false,
      editContents: '',
      memoCallback: null,
      promptDelete: this.promptListDelete,
      openDeleteConfirm: false,
      deleteConfirmCallback: null
    };
  },

  editMemo(contents, callback) {
    this.setState({
      openMemoEditor: true,
      editContents: contents,
      memoCallback: callback
    });
  },

  promptListDelete(callback) {
    this.setState({
      openDeleteConfirm: true,
      deleteConfirmCallback: callback
    })
  },

  closePopup() {
    this.setState({
      openMemoEditor: false,
      editContents: '',
      memoCallback: null,
      openDeleteConfirm: false,
      deleteConfirmCallback: null
    });
  },

  render() {
    let popup;

    if (this.state.openMemoEditor) {
      popup = <EditPopup
        contents={this.state.editContents} callback={this.state.memoCallback} closer={this.closePopup} />
    } else if (this.state.openDeleteConfirm) {
      popup = <ConfirmDelete callback={this.state.deleteConfirmCallback} closer={this.closePopup} />
    } else {
      popup = null;
    }

    return (
      <div>
        <Layout>
          <DashBoard info={this.state} />
        </Layout>
        {popup ? <div className={s.shade} onClick={this.closePopup}></div> : null}
        {popup}
      </div>
    );
  }
});

class DashBoard extends React.Component {
  render() {
    let popupCall = {
      editPopup: this.props.info.editPopup,
      promptDelete: this.props.info.promptDelete
    };

    return (
      <div id={s.dashBoard}>
        <div id={s.header}>
          {this.props.info.title}
        </div>
        <div id={s.contentArea}>
          <div id={s.titleArea}>
            <span className={s.title}>{this.props.info.boardName}</span>
          </div>
          <ListBoard popupCall={popupCall} />
        </div>
      </div>
    );
  }
}

class ListBoard extends React.Component {
  constructor(props) {
    super(props);
    this.addList = this.addList.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      listName: '',
      lists: [],
    }
  }

  addList() {
    if (this.state.listName.length > 0) {
      this.state.lists.push(this.state.listName);
      this.setState({
        listName: '',
        lists: this.state.lists
      });
    }
  }

  handleChange(e) {
    this.setState({
      listName: e.target.value
    });
  }

  render() {
    let popupCall = this.props.popupCall;

    return (
      <div className={s.listBoard}>
        {this.state.lists.map(function(listName, index) {
          return <List key={index} listName={listName} popupCall={popupCall} />;
        })}
        <div id={s.listAddArea}>
          <input value={this.state.listName} onChange={this.handleChange} placeholder="Add a list…" />
          <button onClick={this.addList}>Save</button>
        </div>
      </div>
    );
  }
}

class List extends React.Component {
  constructor(props) {
    super(props);
    this.toggleAddMemo = this.toggleAddMemo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addMemo = this.addMemo.bind(this);
    this.removeList = this.removeList.bind(this);
    this.state = {
      name: props.listName,
      memos: [],
      addMemoForm: false,
      memoContents: '',
      remove: false
    }
  }

  toggleAddMemo() {
    this.setState(previousState => ({
      addMemoForm: !previousState.addMemoForm,
      memoContents: ''
    }));
  }

  handleChange(e) {
    this.setState({
      memoContents: e.target.value
    });
  }

  addMemo() {
    this.state.memos.push(this.state.memoContents);
    this.setState({
      memos: this.state.memos,
      addMemoForm: false,
      memoContents: ''
    });
  }

  removeList() {
    this.setState({
      remove: true
    });
  }

  render() {
    let editPopup = this.props.popupCall.editPopup;
    let bottomArea;

    if (this.state.addMemoForm) {
      bottomArea =
        <div className={s.addMemoForm}>
          <div className={s.textAreaWrap}>
            <textarea value={this.state.memoContents} onChange={this.handleChange} />
          </div>
          <div className={s.addMemoFormButtonDiv}>
            <button onClick={this.addMemo}>Add</button>
            <button onClick={this.toggleAddMemo}>Cancel</button>
          </div>
        </div>;

    } else {
      bottomArea = <a href="#" className={s.listButtonArea} onClick={this.toggleAddMemo}>Add memo...</a>;
    }

    return this.state.remove ? null : (
      <div className={s.listEntity}>
        <div className={s.listHeaderArea}>
          <span className={s.listTitle}>{this.state.name}</span>
          <i className={s.deleteIcon} onClick={() => this.props.popupCall.promptDelete(this.removeList)} />
        </div>
        <div className={s.listContentArea}>
          {this.state.memos.map(function(contents, index) {
            return <Memo key={index} contents={contents} editPopup={editPopup} />;
          })}
        </div>
        {bottomArea}
      </div>
    );
  }
}

class Memo extends React.Component {
  constructor(props) {
    super(props);
    this.editCallback = this.editCallback.bind(this);
    this.deleteCallback = this.deleteCallback.bind(this);
    this.state = {
      contents: props.contents,
      lastUpdated: new Date().toLocaleString(),
      editMemo: false,
      remove: false
    }
  }

  editCallback(editedContents) {
    this.setState({
      contents: editedContents,
      lastUpdated: new Date().toLocaleString()
    });
  }

  deleteCallback() {
    this.setState({
      remove: true
    });
  }

  render() {
    let memoCallback = {
      editCallback: this.editCallback,
      deleteCallback: this.deleteCallback
    };

    return this.state.remove ? null : (
      <div className={s.memo} onClick={() => this.props.editPopup(this.state.contents, memoCallback)}>
        <div className={s.memoContents}>{this.state.contents}</div>
        <div className={s.memoUpdateTime}>{this.state.lastUpdated}</div>
      </div>
    );
  }
}

class EditPopup extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.saveMemo = this.saveMemo.bind(this);
    this.deleteMemo = this.deleteMemo.bind(this);
    this.state = {
      editText: this.props.contents
    }
  }

  handleChange(e) {
    this.setState({
      editText: e.target.value
    });
  }

  saveMemo() {
    this.props.callback.editCallback(this.state.editText);
    this.props.closer();
  }

  deleteMemo() {
    this.props.closer();
    this.props.callback.deleteCallback();
  }

  render() {
    return (
      <div id={s.editPopup}>
        Edit Memo
        <div className={s.textAreaWrap}>
          <textarea id={s.editTextArea} value={this.state.editText} onChange={this.handleChange} />
        </div>
        <div className={s.addMemoFormButtonDiv}>
          <button onClick={this.saveMemo}>Save</button>
          <button onClick={this.deleteMemo}>Delete</button>
          <button onClick={this.props.closer}>Cancel</button>
        </div>
      </div>
    );
  }
}

class ConfirmDelete extends React.Component {
  constructor(props) {
    super(props);
    this.confirmDelete = this.confirmDelete.bind(this);
  }

  confirmDelete() {
    this.props.closer();
    this.props.callback();
  }

  render() {
    return (
      <div id={s.confirmDeletePopup}>
        All memos under this list will be deleted. Proceed?
        <div className={s.addMemoFormButtonDiv}>
          <button onClick={this.confirmDelete}>Yes</button>
          <button onClick={this.props.closer}>No</button>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(TrelloUI);
