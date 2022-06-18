import React from 'react';
import "../../styles/createSet.css";

const MuAlert = React.forwardRef((props = {}, ref) => {

  return (
    <div ref={ref} {...props} className='my-alert'></div>
  );
})

export default MuAlert;
