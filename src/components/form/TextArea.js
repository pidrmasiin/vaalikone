import React from 'react';

const TextArea = ( { placeholder, name, label }) => {
    return(
      <div>
      <b>{label}</b>
      <textarea type="text" className="form-control" 
      placeholder={placeholder} 
      rows="10" cols="20" name={name} form='htmlform'>
      </textarea>
      </div>
  )
}

  export default TextArea