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

function Todo({ title }) {
  return (
    <Layout>
      <div className={s.root}>
        <div className={s.container}>
          <App11></App11>
        </div>
      </div>
    </Layout>
  );
}

// var serverData = [
//   { id: 1, name: 'kss' },
//   { id: 2, name: 'kss1' },
//   { id: 3, name: 'kss2' },
// ];

// var Todo = React.createClass({
//   getInitialState() {
//     return {
//       message: 'loading...',
//       data: serverData
//     };
//   },

//   componentWillMount() {
//     this.setState({message: 'welcome!', data: serverData});
//   },

//   render() {
//     if(this.state.data) {
//       var list = this.state.data.map(obj => <li key={obj.id}>{obj.id}:{obj.name}</li>);
//     }
//     return (
//       <div>
//         <p>server-side rendering sample</p>
//         <p>{this.state.message}</p>
//         <ul>{list}</ul>
//       </div>
//     );
//   }
// });

var services = [
    { name: 'JAVA', price: 80 },
    { name: 'SQL', price: 33 },
    { name: 'SERVLET', price: 66 },
    { name: 'JSP', price: 99 }
];

var App11 = React.createClass({

    getInitialState: function(){
        return { total: 0, items: services };
    },

    addTotal: function( price ){
        this.setState( { total: this.state.total + price } );
    },

    render: function() {

        var self = this;

        var services = this.state.items.map(function(ser, idx){

            // Create a new Service component for each item in the items array.
            // Notice that I pass the self.addTotal function to the component.

            return <ServiceLayer name={ser.name} price={ser.price} active={ser.active} addTotal={self.addTotal} key={idx}/>;
        });

        return <div>
                    <h1>Our services</h1>
                    
                    <div id="services">
                        {services}

                        <p id="total">Total <b>{this.state.total.toFixed(2)}점</b></p>

                    </div>

                </div>;

    }
});


var ServiceLayer = React.createClass({

    getInitialState: function(){
        return { active: false };
    },

    clickHandler: function (){

        var active = !this.state.active;
          console.log("activ",active);

        this.setState({ active: active });
        
        // Notify the Todo, by calling its addTotal method
        this.props.addTotal( active ? this.props.price : -this.props.price );

    },

    render: function(){
        return  <p className={ this.state.active ? 'active' : '' } onClick={this.clickHandler}>
                    {this.props.name} <b>{this.props.price.toFixed(2)}점</b>
                </p>;

    }

});

Todo.propTypes = {
  title: PropTypes.string.isRequired,
};

export default withStyles(s)(Todo);
