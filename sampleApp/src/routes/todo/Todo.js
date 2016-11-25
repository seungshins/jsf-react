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
import style from './Todo.css';
import BootStrap from 'react-bootstrap';

function Todo({ title }) {
  return (
    <Layout>
      <div className={style.root}>
        <div className={style.container}>
          <App11></App11>
        </div>
      </div>
    </Layout>
  );
}

var services = [
    { name: 'JAVA', price: 80 },
    { name: 'SQL', price: 33 },
    { name: 'SERVLET', price: 66 },
    { name: 'JSP', price: 99 }
];

var App11 = React.createClass({

    getInitialState: function(){
        return { total: 0, items: services, avg: 0, count: 0 };
    },

    addTotal: function( price, count ){
        var curtotal = this.state.total + price;
        var curcount = this.state.count + count;
        
        this.setState( { total: curtotal } );
        this.setState( { count: curcount } );
        
        if( curcount > 0) {
            this.setState( { avg: curtotal / curcount } );
        } else {
            this.setState( { avg: 0 } );
        }
    },
    
    /*addCount: function( count ){
        this.setState( { count: this.state.count + count } );
        this.setState( { avg: (this.state.count + count) } );
    },
    
    addAvg: function( avg ) {
        this.setState( { avg: avg} );
    },*/

    render: function() {

        var self = this;

        var services = this.state.items.map(function(ser, idx){

            // Create a new Service component for each item in the items array.
            // Notice that I pass the self.addTotal function to the component.

            return <ServiceLayer name={ser.name} price={ser.price} active={ser.active} addTotal={self.addTotal} addCount={self.addCount} addAvg={self.addAvg} key={idx}/>;
        });

        return <div>
                    <h1>Exam</h1>
                    
                    <div className={style.services}>
                        {services}

                        <p className={style.total}>Total <b>{this.state.total.toFixed(2)}점</b></p>
                        <p className={style.avg}>Average <b>{this.state.avg.toFixed(2)}점</b></p>

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

        this.setState({ active: active });
        
        // Notify the Todo, by calling its addTotal method
        // this.props.addTotal( active ? this.props.price : -this.props.price );
        
        var currentTotal = 0;
        var currentCount = 0;
        
        if(active) {
            this.props.addTotal(this.props.price, 1);
            // this.props.addCount(1);
            // currentTotal = this.props.total + this.props.price;
            // currentCount = this.props.count + 1 ;
        } else {
            this.props.addTotal(-this.props.price, -1);
            // this.props.addCount(-1);
            // currentTotal = this.props.total - this.props.price;
            // currentCount = this.props.count - 1 ;
        }
        
        // console.log("this.props.count",  this.props.count);
        
        // if(currentCount > 0) {
        //     this.props.addAvg(currentTotal/currentCount);
        // } else {
        //     this.props.addAvg(0);
        // }

    },

    render: function(){
        return  <p className={ this.state.active ? style.active : '' } onClick={(event)=>this.clickHandler()}>
                    {this.props.name} <b>{this.props.price.toFixed(2)}점</b>
                </p>;

    }

});

Todo.propTypes = {
  title: PropTypes.string.isRequired,
};

export default withStyles(style)(Todo);
