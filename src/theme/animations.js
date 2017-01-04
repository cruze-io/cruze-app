/*@flow/

/**
 * The Animations
 **/

export const SPRING = {
	xSlow: {tension: 2.7, friction: 2, duration: 370},
	slow: { tension: 3, friction: 3.5, duration: 250 },
	medium: { tension: 3, friction: 3.5, duration: 150 },
	fast: { tension: 4, friction: 2, duration: 100 },
}

export const LINEAR = {
	slow: { duration: 250 },
	medium: { duration: 150 },
	fast: { duration: 100 },
}


export const Animations = {
  spring: SPRING,
  linear: LINEAR,
}
