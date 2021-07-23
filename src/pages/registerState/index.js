import React, { useState } from "react";
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import Client from "../../api/client";

const initialValues = {
  name: "",
  abbreviation: ""
}

function RegisterState() {
  const [state, setState] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const schema = yup.object().shape({
    name: yup.string().required('campo obrigatório'),
    abbreviation: yup.string().required('campo obrigatório')
  });
  
  const handleChange = (event) => {
    setState({
      ...state, 
      [event.target.name]: event.target.value
    });
  }

  const submitForm = async (event) => {
    event.preventDefault()

    try {
      schema.validateSync(state, { abortEarly: false })

      const response = await Client.post('/states', state)

      if (response.data.errors) {
        const formattedErrors = response.data.errors
        setErrors(formattedErrors);
      } else {
        setErrors({})
        history.push('/');
      }


    } catch(err) {
      const formattedErrors = err.inner.map((error) => {
        return [error.path, error.message ]
      })

      setErrors(Object.fromEntries(formattedErrors));
    }
  }

  return (
    <div className="container">
      <div className="content">
        <div className="form">
          <h4 className="title-form">Cadastro de Estado</h4>
          <form onSubmit={submitForm}>
            <input type="text" name="name" onInput={handleChange} placeholder="Nome" />
            <div className="input-error">{errors && errors?.name}</div>
            <input type="text" name="abbreviation" onInput={handleChange} placeholder="Sigla" />
            <div className="input-error">{errors && errors?.abbreviation}</div>

            <input type="submit" id="submit" value="Cadastrar Estado" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterState;