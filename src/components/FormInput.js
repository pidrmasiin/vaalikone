
import React from 'react';

const FormInput = ( { placeholder, name, label }) => {
    return(
    <div className="form-group">
        <b>{label}</b>
        <input type="text" className="form-control" placeholder={placeholder} name={name}/>
    </div>
  )
}

  export default FormInput