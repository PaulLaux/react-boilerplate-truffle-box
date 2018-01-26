/**
 *
 * Dashboard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectWeb3 } from './selectors';
import reducer from './reducer';
import saga from './saga';

import Web3Status from 'components/Web3Status';

export class Dashboard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    console.log('componentDidMount()');

    //this.props.onInitDashboard();
  }
  render() {

    const { 
      web3
     } = this.props;

    return (
      <div>
        <Helmet>
          <title>Dashboard</title>
          <meta name="description" content="Description of Dashboard" />
        </Helmet>
        <Web3Status web3={web3} />
        My Dash
      </div>
    );
  }
}

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  web3: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  // dashboard: makeSelectDashboard(),
  web3: makeSelectWeb3(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'dashboard', reducer });
const withSaga = injectSaga({ key: 'dashboard', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Dashboard);
