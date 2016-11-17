/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Sample1 from './Sample1';

const title = 'Sample1';

export default {

  path: '/sample1',

  action() {
    return {
      title,
      component: <Sample1 title={title} />,
    };
  },

};