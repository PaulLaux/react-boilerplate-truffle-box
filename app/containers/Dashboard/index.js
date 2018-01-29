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
import styled from 'styled-components';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import { initDashboard, setStorageValue, getStorageValue } from './actions';
import {
  makeSelectWeb3,
  makeSelectSetStorageValue,
  makeSelectSetStorageLoading,
  makeSelectSetStorageError,
  makeSelectStorageValue,
  makeSelectGetStorageValueLoading,
  makeSelectGetStorageValueError,
} from './selectors';

import Btn from './btn';
import Web3Status from 'components/Web3Status';
import SetStorageStatus from 'components/SetStorageStatus';
import GetStorageStatus from 'components/GetStorageStatus';

const Div = styled.div`
  padding:20px;
`


export class Dashboard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    console.log('componentDidMount()');

    this.props.onInitDashboard();
  }
  render() {

    const {
      web3,
      setStorageValue,
      setStorageLoading,
      setStorageError,
      storageValue,
      getStorageValueLoading,
      getStorageValueError,

      onSetStorageValue,
      onGetStorageValue,
     } = this.props;

    const setStorageStatusProps = { setStorageValue, setStorageLoading, setStorageError };
    const getStorageStatusProps = { storageValue, getStorageValueLoading, getStorageValueError };

    return (
      <Div>
        <Helmet>
          <title>react-boilerplate truffle box - Dashboard</title>
          <meta name="description" content="Description of Dashboard" />
        </Helmet>
        Dashboard <hr />
        <Web3Status web3={web3} />
        <br />
        <Btn className="btn" onClick={() => onSetStorageValue(99)}>Set Storage</Btn>
        <SetStorageStatus {...setStorageStatusProps} />
        <Btn className="btn" onClick={() => onGetStorageValue()}>Get Storage</Btn>
        <GetStorageStatus {...getStorageStatusProps} />
      </Div>
    );
  }
}

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  web3: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  setStorageValue: PropTypes.number,
  setStorageLoading: PropTypes.bool,
  setStorageError: PropTypes.oneOfType([PropTypes.bool,PropTypes.string]),
  storageValue: PropTypes.oneOfType([PropTypes.number]),
  getStorageValueLoading: PropTypes.bool,
  getStorageValueError:  PropTypes.oneOfType([PropTypes.bool,PropTypes.string]),

  onSetStorageValue: PropTypes.func,
  onGetStorageValue: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  // dashboard: makeSelectDashboard(),
  web3: makeSelectWeb3(),

  setStorageValue: makeSelectSetStorageValue(),
  setStorageLoading: makeSelectSetStorageLoading(),
  setStorageError: makeSelectSetStorageError(),
  storageValue: makeSelectStorageValue(),
  getStorageValueLoading: makeSelectGetStorageValueLoading(),
  getStorageValueError: makeSelectGetStorageValueError(),

});

function mapDispatchToProps(dispatch) {
  return {
    onInitDashboard: () => {
      dispatch(initDashboard());
    },
    onSetStorageValue: (val) => {
      dispatch(setStorageValue(val));
    },
    onGetStorageValue: () => {
      dispatch(getStorageValue());
    },
    dispatch
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'dashboard', reducer });
const withSaga = injectSaga({ key: 'dashboard', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(Dashboard);
