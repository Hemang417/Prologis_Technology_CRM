import React, { useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CFormInput,
  CFormLabel,
  CForm,
  CButton
} from '@coreui/react'
import '../../css/styles.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
// import createjob from './CreateJob';

const organization = () => {
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [organization, setOrganization] = useState([]);


  useEffect(() => {
    const renderOverview = async () => {
      try {
        const nameoforg = localStorage.getItem('orgname');
        const codeoforg = localStorage.getItem('orgcode');

        const response = await axios.get('http://localhost:5000/getOrg', {
          params: {
            orgname: nameoforg,
            orgcode: codeoforg
          }
        });

        setOrganization(response.data);
      } catch (error) {
        console.log("Error: " + error);
      }
    }
    renderOverview();
  }, [])

console.log(organization);

  return (
    // JOB SEARCH - DROPDOWN & TEXT FIELD
    <CRow>
      <CCardBody className='button-div'>
        <div className='createjob-button'>
          <Link to={'/Createjob'}>
            <CButton color="primary" type="submit">
              +
            </CButton>
          </Link>
        </div>
        <div className='createjob-button'>
          <CButton color="primary" type="submit">
            <img src='../../importIcons/delete.png' />
          </CButton>
        </div>
        <div className='createjob-button'>
          <CButton color="primary" type="submit">
            <img src='../../importIcons/refresh.png' width="10px" height="10px" />
          </CButton>
        </div>
        <div className='createjob-button'>
          <CButton className="btn btn-primary" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="icon" role="img" aria-hidden="true">
              <polygon fill="var(--ci-primary-color, currentColor)" points="272 434.744 272 209.176 240 209.176 240 434.744 188.118 382.862 165.49 405.489 256 496 346.51 405.489 323.882 382.862 272 434.744" class="ci-primary"></polygon><path fill="var(--ci-primary-color, currentColor)" d="M400,161.176c0-79.4-64.6-144-144-144s-144,64.6-144,144a96,96,0,0,0,0,192h80v-32H112a64,64,0,0,1,0-128h32v-32a112,112,0,0,1,224,0v32h32a64,64,0,0,1,0,128H320v32h80a96,96,0,0,0,0-192Z" class="ci-primary"></path>
            </svg>
            <span class="visually-hidden">Download file</span>
          </CButton>
        </div>

      </CCardBody>

      <CCol xs={12}>
        <CCard className="mb-2 container-div">
          <CCardBody>
            {/* <CDropdown>
  <CDropdownToggle color="secondary">Job No.</CDropdownToggle>
  <CDropdownMenu>
    <CDropdownItem href="#">BE No.</CDropdownItem>
    <CDropdownItem href="#">HBL/HAWB No.</CDropdownItem>
    <CDropdownItem href="#">MBL/MAWB No.</CDropdownItem>
    <CDropdownItem href="#">Container No.</CDropdownItem>
  </CDropdownMenu>
    <CFormInput type="text" size="sm" placeholder="" aria-label="sm input example"/>
  </CDropdown> */}

            <input type="text" placeholder="Name" className='text-field' />

            <input type="text" placeholder="Alias" className='text-field' />

          </CCardBody>
          <div className='search-button'>
            <CButton color="primary" type="submit">
              Search
            </CButton>
          </div>

        </CCard>
      </CCol>

      <CForm>

        <CTable hover responsive striped className=''>
          <CTableHead>
            <CTableRow color='dark' >
              <CTableHeaderCell scope="col"></CTableHeaderCell>
              <CTableHeaderCell scope="col">Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Alias</CTableHeaderCell>

            </CTableRow>
          </CTableHead>
          <CTableBody>
            {organization.map((organization, index) => (
              <CTableRow key={index}>
                <th scope="row" className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <Link to={"./Creatjob"}>
                    Edit
                  </Link>
                </th>
                <CTableHeaderCell scope="row">{organization.clientname}</CTableHeaderCell>
                <CTableDataCell>{organization.alias}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>

        </CTable>
      </CForm>

    </CRow>

  )
}

export default organization;