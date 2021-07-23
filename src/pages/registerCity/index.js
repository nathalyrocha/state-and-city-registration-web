import React, { useState, useEffect } from "react";
import * as yup from 'yup';
import { useHistory, Link } from 'react-router-dom';
import Client from "../../api/client";
import Select from 'react-select';

const initialValues = {
  name: "",
  state_id: ""
}

function transformData(data) {
  return data.map((element) => ({ value: element.id, label: element.name }))
}

function RegisterCity() {
  const [city, setCity] = useState(initialValues);
  const [states, setStates] = useState([]);
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const schema = yup.object().shape({
    name: yup.string().required('campo obrigatório'),
    state_id: yup.string().required('campo obrigatório')
  });
  
  const handleChange = (event) => {
    setCity({
      ...city, 
      [event.target.name]: event.target.value
    });
  }

  const handleSelect = (option) => {
    setCity({
      ...city, 
      state_id: option.value
    });
  }

  const submitForm = async (event) => {
    event.preventDefault()
    console.log(city);

    try {
      schema.validateSync(city, { abortEarly: false })

      const response = await Client.post('/cities', city)

      if (response.data.errors) {
        const formattedErrors = response.data.errors
        setErrors(formattedErrors);
      } else {
        setErrors({})
        history.push('/cities');
      }


    } catch(err) {
      const formattedErrors = err.inner.map((error) => {
        return [error.path, error.message ]
      })

      setErrors(Object.fromEntries(formattedErrors));
    }
  }

  async function fetchData() {
    const { data } = await Client.get('/states');

    setStates(transformData(data.states));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="content">
        <div className="form">
          <h4 className="title-form">Cadastro de Cidade</h4>
          <form onSubmit={submitForm}>
            <input type="text" name="name" onInput={handleChange} placeholder="Nome" />
            <div className="input-error">{errors && errors?.name}</div>

            <Select options={states} onChange={handleSelect} className="select-states" />
            <div className="select-bottom">
              <Link to="/state" className="select-link">Cadastrar novo estado</Link>
              <div className="input-error">{errors && errors?.state_id}</div>
            </div>

            <input type="submit" id="submit" value="Cadastrar Estado" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterCity;