import React from 'react';
import "../../styles/createSet.css";

const MuAlert = React.forwardRef((props = {}, ref) => {

  return (
    <div ref={ref} {...props} className='my-alert'>123</div>
  );
})

export default MuAlert;
