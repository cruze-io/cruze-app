/**
 * The native <Text> tag
 * Can pass and return different versions such as heading, subheading, paragraph, ellipsis etc...
 **/

import React, { PropTypes } from 'react';
import { Text } from 'react-native';
import styles from './styles';
import { FONT_COLOR, FONT_SIZE, FONT_WEIGHT } from 'mixins/theme/fonts';

type Props = {
  color: string,
  size: string,
  weight: string,
  fontStyle: string,
  textAlign: string,
  styles: PropTypes.object
}

const T = (props: Props) => {
  const { children, color, size, weight, textAlign, styles, fontStyle } = props;

  let style = {...styles};

  // Font Color
  const textColor = FONT_COLOR[color] ? FONT_COLOR[color] : color;
  style.color = textColor ? textColor : FONT_COLOR.secondary;
  style.fontSize = (size && FONT_SIZE[size]) ? FONT_SIZE[size] : size || FONT_SIZE.medium;
  style.fontWeight = (weight && FONT_WEIGHT[weight]) ? FONT_WEIGHT[weight] : FONT_WEIGHT.regular;
  style.textAlign = textAlign || 'center';
  style.fontStyle = fontStyle ? fontStyle : 'normal';
  style.backgroundColor = 'rgba(0,0,0,0)';

  return (
    <Text style={style}>{children}</Text>
  )
}

export default T
