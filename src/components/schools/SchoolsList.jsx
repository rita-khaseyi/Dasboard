import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './SchoolsList.css';

const SchoolsList = () => {
    const [schools, setSchools] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [schoolsPerPage] = useState(7); // Adjust as needed

    useEffect(() => {
        const fetchSchools = async () => {
            try {
                const response = await axios.get('http://localhost:3001/schools');
                setSchools(response.data);
            } catch (error) {
                console.error('Error fetching schools:', error);
            }
        };

        fetchSchools();
    }, []);

    // Logic for pagination
    const indexOfLastSchool = currentPage * schoolsPerPage;
    const indexOfFirstSchool = indexOfLastSchool - schoolsPerPage;
    const currentSchools = schools.slice(indexOfFirstSchool, indexOfLastSchool);

    // Change page
    const nextPage = () => setCurrentPage(currentPage + 1);
    const prevPage = () => setCurrentPage(currentPage - 1);

    // Disable next and prev buttons based on currentPage
    const isFirstPage = currentPage === 1;
    const isLastPage = indexOfLastSchool >= schools.length;

    return (
        <div className="schools-list">
            <h3>Schools</h3>
            <ul>
                {currentSchools.map(school => (
                    <li key={school.id}>
                        <Link to={`/schools/${school.id}`}>{school.name}</Link>
                    </li>
                ))}
            </ul>
            {/* Pagination controls */}
            <div className="pagination">
                <button className='left-arrow' onClick={prevPage} disabled={isFirstPage}>{'<'}</button>
                <button className='right-arrow' onClick={nextPage} disabled={isLastPage}>{'>'}</button>
            </div>
        </div>
    );
};

export default SchoolsList;
