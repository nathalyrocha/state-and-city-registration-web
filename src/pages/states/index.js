import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Client from "../../api/client";

function States() {
  const [states, setStates] = useState([]);

  async function fetchData() {
    const { data } = await Client.get('/states');

    setStates(data.states);
  }

  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <div className="container">
      <div className="content">
        <div className="table-header">
          <p className="table-title">Estados Cadastrados</p>
          <Link to="/state" className="register-link">Cadastrar Estado</Link>
        </div>

        <table className="table">
            <tbody>
              {states.map((item) => (
                <tr key={item.id}>
                  <td>{item.name} - {item.abbreviation}</td>
                </tr>
              ))}
            </tbody>
        </table>
      </div>
    </div>
  );
}

export default States;