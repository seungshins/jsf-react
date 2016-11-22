import React from 'react';
import TrelloUI from './TrelloUI';

const title = 'Trello UI';

export default {

  path: '/sangjoonchoi',

  action() {
    return {
      title,
      component: <TrelloUI title={title} />,
    };
  },

};
