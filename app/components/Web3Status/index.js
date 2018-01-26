/**
*
* Web3Status
*
*/

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';


function Web3Status(props) {
  const {web3} = props;
  return (
    <div>
      web3 status: {web3? web3:'null'}
    </div>
  );
}

Web3Status.propTypes = {

};

export default Web3Status;
