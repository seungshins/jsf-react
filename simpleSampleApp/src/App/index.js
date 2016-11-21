import React from 'react';
import Header from '../components/Header';

/**
 * Import locally scoped styles using css-loader
 * See style.sass in this directory.
 *
 * More info: https://github.com/webpack/css-loader#local-scope
 */
import styles from './style';

class App extends React.Component {
	render = () => {
		return (
			<div className={styles.main}>
				<div className={styles.wrap}>
					<Header />
					<main className={styles.body}>
						<p> Study book for React, Angular, NodeJs, etc</p>
						<p> Visit <a href="https://iotjsf.gitbooks.io/iot-jsf/content/">Readme</a> for iot-jsf study doc.</p>
					</main>
				</div>
			</div>
		)
	};
};

export default App;
