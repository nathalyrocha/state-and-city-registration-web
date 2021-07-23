import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Client from "../../api/client";

function Cities() {
  const [cities, setCities] = useState([]);

  async function fetchData() {
    const { data } = await Client.get('/cities');

    setCities(data.cities);
  }

  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <div className="container">
      <div className="content">
        <div className="table-header">
          <p className="table-title">Cidades Cadastradas</p>
          <Link to="/city" className="register-link">Cadastrar Cidade</Link>
        </div>

        <table className="table">
            <tbody>
              {cities.map((item) => (
                <tr key={item.id}>
                  <td>{item.name} - {item.state.name}</td>
                </tr>
              ))}
            </tbody>
        </table>
      </div>
    </div>
  );
}

export default Cities;