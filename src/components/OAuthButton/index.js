/* @flow */

import React, { PropTypes } from 'react'
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import styles from './styles'
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {
	type: PropTypes.string,
	onPress: PropTypes.func,
	style: PropTypes.object,
}

const OAuthButton = (props: Props) => {

	const {type, onPress, style} = props;
	const buttonText = props.type === 'google' ? 'GOOGLE' : 'FACEBOOK';
	const iconColor = props.type === 'facebook' ? '#3b5998' : '#d14836';
  return (
  	<TouchableOpacity onPress={() => onPress()} style={{height: 60}}>
    <View style={[styles.container, style]}>
    	<Text style={styles.buttonText}>{buttonText}</Text>
    </View>
  	<View style={styles.iconContainer}>
  		<Icon
  			name={type} 
  			color={iconColor}
  		/>
  	</View>    
    </TouchableOpacity>
  )
}

export default OAuthButton;
