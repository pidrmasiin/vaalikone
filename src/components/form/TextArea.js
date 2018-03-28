import React from 'react';
import { Form} from 'semantic-ui-react'

const TextArea = ( { placeholder, name, label }) => {
    return(
      <div>
      <b>{label}</b>
      <Form.TextArea type="text" className="form-control" 
      placeholder={placeholder} 
      rows="10" cols="20" name={name} form='htmlform'>
      </Form.TextArea>
      </div>
  )
}

  export default TextArea