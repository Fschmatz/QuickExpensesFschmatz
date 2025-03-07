import React from 'react';
import styled from 'styled-components/native';

const SizedBoxView = styled.View`
  margin-top: ${({ height }) => height / 2 || 0}px;
  margin-bottom: ${({ height }) => height / 2 || 0}px;
  margin-left: ${({ width }) => width / 2 || 0}px;
  margin-right: ${({ width }) => width / 2 || 0}px;
`;

const SizedBox = ({ height, width }) => {
  return <SizedBoxView height={height} width={width} />;
};

export default SizedBox;