import React, { useState, useEffect } from 'react';
import './styles.css'; 

import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import LogoImage from '../../assets/logo.svg'

import api from '../../services/api';

export default function Profile(){
    const [incidents, setIncidents] = useState([]);

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    const history = useHistory();
    
    useEffect(() => {
        api.get('incidents', {
            headers: {
                Authorization: ongId
            }
        }).then(response => {            
            setIncidents(response.data);
        }) 

    }, [ongId]);

    async function handleDeleteIncident(id) {
      
        try{
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id));

        }catch(err){
            alert('Ero ao deletar caso, tente novamente');

        }
    }


    function handleLogout(){
        localStorage.clear();
        history.push('/');

    }


    return (
        <div>
            <div className="profile-container">
                <header>
                    <img src={LogoImage} alt="Be The Hero" />
    <span>Bem vinda, {ongName}</span>

                    <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                    <button type="button" onClick={() => handleLogout()}>
                        <FiPower size={18} color="#E04120"/>

                    </button>
                </header>

                <h1>Casos cadastrados</h1>

                <ul>
                   {incidents.map(incident => (

                        <li key={incident.id}>
                            <strong>Caso</strong>
                            <p>{incident.title}</p>

                            <strong>Descrição</strong>
                            <p>{incident.description}</p>
                            

                            <strong>Valor</strong>
                            <p>R$ {incident.value} reais</p>

                            <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                                
                                <FiTrash2 size={20} color="#a8a8b3"/>
                            </button>

                        </li>
                   ))}
                    
                </ul>
            
            </div>
        </div>
    );
}