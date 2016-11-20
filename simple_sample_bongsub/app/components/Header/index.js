import React from 'react';

/**
 * Import locally scoped styles using css-loader
 * See style.sass in this directory.
 *
 * More info: https://github.com/webpack/css-loader#local-scope
 */
import styles from './style';

/**
 * Reference an image and get back a URL automatically via webpack.
 * webpack takes care of versioning, bundling for production, etc.
 */
import logoURL from './images/react-logo.svg';

const Header = () => {
  return <header className={styles.main}>
    <img className={styles.logo} src={logoURL} height="125"/>

    <div className={styles.wrap}>
      <h1 className={styles.title}>IoT Jsf</h1>
      <h2 className={styles.tagline}>2016 study JavaScript framework part</h2>
    </div>
  </header>;
};

Header.displayName = 'Header';

export default Header;
