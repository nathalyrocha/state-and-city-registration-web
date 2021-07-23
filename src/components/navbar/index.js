import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css'

function Navbar() {
  return (
    <nav>
      <p className="nav-title">Cadastro de Estados e Cidades</p>

      <ul>
        <li>
          <Link to="/">Lista de Estados</Link>
        </li>
        <li>
          <Link to="/cities">Lista de Cidade</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;