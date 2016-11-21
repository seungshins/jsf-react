/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../components/Layout';
import s from './Todo.css';
import BootStrap from 'react-bootstrap';

// function Todo({ title }) {
//   return (
//     <Layout>
//       <div className={s.root}>
//         <div className={s.container}>
//           <App11></App11>
//         </div>
//       </div>
//     </Layout>
//   );
// }

var serverData = [
  { id: 1, name: 'kss' },
  { id: 2, name: 'kss1' },
  { id: 3, name: 'kss2' },
];

var Todo = React.createClass({
  getInitialState() {
    return {
      message: 'loading...',
      data: serverData
    };
  },

  componentWillMount() {
    this.setState({message: 'welcome!', data: serverData});
  },

  render() {
    if(this.state.data) {
      var list = this.state.data.map(obj => <li key={obj.id}>{obj.id}:{obj.name}</li>);
    }
    return (
      <div>
        <p>server-side rendering sample</p>
        <p>{this.state.message}</p>
        <ul>{list}</ul>
      </div>
    );
  }
});

Todo.propTypes = {
  title: PropTypes.string.isRequired,
};

export default withStyles(s)(Todo);
