import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../components/Layout';
import s from './Assignment.css';

function assign1({ title }) {
  return (
    <Layout>
      <div className={s.root}>
        <div className={s.container}>
        	<assignment></assignment>
        </div>
      </div>
    </Layout>
  );
}

var assignment = React.createClass({
	answer: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8],
	squares: [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
	
	shuffle(){
		this.answer.shuffle();
		this.squares.restart();
	},
	
	getInitialState: function(){
		
    return {
    	squares: this.squares,
    	count: 0,
    	compVal: [],
    	choosen: [],
    	answer: this.answer,
    	xIsNext: true
    };
  },
  
  handleClick(i) {
    var squares = this.state.squares.slice();
    var choosen = this.state.choosen.slice();
    var compVal = this.state.compVal.slice();
    
    squares[i] = this.state.answer[i];
    choosen[this.state.count] = i;
    compVal[this.state.count] = this.state.answer[i];
    
    this.setState({
      squares: squares,
      choosen: choosen,
      compVal: compVal,
      count: this.state.count + 1
    });
    
    if(this.state.count == 1){
    	if(this.state.compVal[0] != this.state.answer[i]){
    		for(var i=0 ; i<2 ; i++){
	    		squares[choosen[i]] = null;
	    		choosen[i] = null;
	    		compVal[i] = null;
	    	}
    		
    		this.setState({
    			squares:squares
    		});
    	}
    	this.setState({
    		count: 0
    	});
    }
  },
  
  renderSquare(i) {
    return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />;
  },
  
  render() {
    const status = 'Fine Same number';
    
    return (
	    <Layout>
	      <div>
	        <div className={s.state}>{status}</div>
	        <div className={s.state}><button className={s.start} onClick={this.shuffle}>Start Game</button></div>
	        <div className={s.mainFrame}>
		        <div className={s.boardRow}>
		          {this.renderSquare(0)}
		          {this.renderSquare(1)}
		          {this.renderSquare(2)}
		          {this.renderSquare(3)}
		        </div>
		        <div className={s.boardRow}>
		          {this.renderSquare(4)}
		          {this.renderSquare(5)}
		          {this.renderSquare(6)}
		          {this.renderSquare(7)}
		        </div>
		        <div className={s.boardRow}>
		          {this.renderSquare(8)}
		          {this.renderSquare(9)}
		          {this.renderSquare(10)}
		          {this.renderSquare(11)}
		        </div>
		        <div className={s.boardRow}>
		          {this.renderSquare(12)}
		          {this.renderSquare(13)}
		          {this.renderSquare(14)}
		          {this.renderSquare(15)}
		        </div>
		      </div>
	      </div>
	    </Layout>
    );
  }
});

var TimerExample = React.createClass({

    getInitialState: function(){
        return { elapsed: 0 };
    },

    componentDidMount: function(){
        this.timer = setInterval(this.tick, 50);
    },

    componentWillUnmount: function(){
        clearInterval(this.timer);
    },

    tick: function(){
        this.setState({elapsed: new Date() - this.props.start});
    },

    render: function() {
        
        var elapsed = Math.round(this.state.elapsed / 100);
        var seconds = (elapsed / 10).toFixed(1);
        return <p>This example was started <b>{seconds} seconds</b> ago.</p>;
    }
});

Array.prototype.shuffle = function() {
  var i = this.length, j, temp;
  if ( i == 0 ) return this;
  while ( --i ) {
     j = Math.floor( Math.random() * ( i + 1 ) );
     temp = this[i];
     this[i] = this[j];
     this[j] = temp;
  }
  
  return this;
}

Array.prototype.restart = function(){
	var i = this.length;
	if( i == 0 ) return this;

	Square(this);
}

function Square(props) {
  return (
    <button className={s.square} onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}


assignment.propTypes = {
    title: PropTypes.string.isRequired,
};

export default withStyles(s)(assignment);