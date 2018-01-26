/**
*
* Web3Status
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

function Status({web3}) { 
  const provider = web3.currentProvider && web3.currentProvider.constructor.name;
  return (
    <span>
      Initiated, provider: {provider || 'No connection to http provider, check connectivity to local node'}
    </span>
  );

}

function Web3Status(props) {
  const { web3 } = props;

  return (
    <div>
      web3 status: {web3 ? <Status web3={web3} /> : 'null'}
    </div>
  );
}

Web3Status.propTypes = {
  web3: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default Web3Status;
