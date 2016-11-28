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
import Link from '../../components/Link';
import s from './Home.css';

function Home({ news }) {
  return (
    <Layout>
      <div className={s.root}>
        <div className={s.container}>
          <h1 className={s.title}>Exam</h1>
          <Link className={s.link} to="/todo">App Link</Link><br/>
          <h1 className={s.title}>Employee Management</h1>
          <Link className={s.link} to="/sample1">App Link</Link>
          <h1 className={s.title}>Trello UI</h1>
          <Link className={s.link} to="/sangjoonchoi">App Link</Link>
          <h1 className={s.title}>Assignment</h1>
          <Link className={s.link} to="/kim">App Link</Link>
          <h1 className={s.title}>SamplePage</h1>
          <a href="https://seungshins.github.io/jsf-react/">App Link</a>
        </div>
      </div>
    </Layout>
  );
}

Home.propTypes = {
  news: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    contentSnippet: PropTypes.string,
  })).isRequired,
};

export default withStyles(s)(Home);
