import CountDown from 'react-native-countdown-component';
import React, { useEffect, useState } from 'react'

const Timer = ({handleSubmit, handleScore}) => { 

    return (
      <CountDown
      until={900}
      size={30}
      onChange={handleScore}
      onFinish={() => handleSubmit('times up')}
      digitStyle={{backgroundColor: '#FFF'}}
      digitTxtStyle={{color: 'grey'}}
      timeToShow={['M', 'S']}
      timeLabels={{m: 'MM', s: 'SS'}}
      />
    )
}

export default Timer