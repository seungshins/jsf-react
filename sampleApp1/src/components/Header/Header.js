/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import Link from '../Link';
import logoUrl from './logo-small.png';

//<Navigation className={s.nav} />

function Header() {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <Link className={s.brand} to="/">
          <span className={s.brandTxt}>IOT-JSF</span>
        </Link>
        <div className={s.banner}>
          <h1 className={s.bannerTitle}>React Sample Apps</h1>
        </div>
      </div>
    </div>
  );
}

export default withStyles(s)(Header);
