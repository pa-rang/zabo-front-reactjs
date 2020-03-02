import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { colors } from 'lib/theme';

import { media } from '../../../lib/utils/style';

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  overflow: scroll;
  ${media.tablet (css`
    padding: 0 18px;
  `)};
  ${props => props.ownStyle || ''};
  background: ${props => (props.background ? props.theme[props.background] : 'transparent')};
`;

Container.propTypes = {
  ownStyle: PropTypes.oneOfType ([PropTypes.string, PropTypes.array]),
  background: PropTypes.oneOf (Object.keys (colors)),
};

export default Container;
