import React, { useEffect, useState } from 'react'
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
  CModal,
  CButton,
  CModalHeader,
  CModalBody, CModalFooter, CModalTitle
} from '@coreui/react'
// import '../../css/styles.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Select from 'react-select';
import toast from 'react-hot-toast';
const setWorkflow = () => {

  const [allbranches, setallbranches] = useState([]);
  const [allineofbusinesses, setalllineofbusinesses] = useState([]);
  const [allorgs, setallorgs] = useState([]);
  const [visible, setVisible] = useState(false);

  const [selectedLOB, setselectedLOB] = useState('');
  const [selectedBranch, setselectedBranch] = useState('');
  const [selectedOrg, setselectedOrg] = useState('');

  const [WorkFlowsData, setWorkflowsData] = useState([]);

  const [filteredMilestones, setFilteredMilestones] = useState([]);
  const [allmilestones, setallmilestones] = useState([]);



  const [workflowData, setworkflowData] = useState({
    workflowname: '',
    duration: '',
    days: '',
    hours: '',
    minutes: '',
    milestone: '',
    plandatechange: '',

  })

  const [selectedWorkflow, setSelectedWorkflow] = useState(null);

  // const readAllWorkflows = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:5000/readallworkflows', {
  //       params: {
  //         orgname: localStorage.getItem('orgname'),
  //         orgcode: localStorage.getItem('orgcode'),
  //       }
  //     });
  //     setWorkflowsData(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }


  const getAllBranches = async () => {
    try {
      const response = await axios.get('http://localhost:5000/fetchBranchesofOwn', {
        params: {
          orgname: localStorage.getItem('orgname'),
          orgcode: localStorage.getItem('orgcode'),
        }
      })
      setallbranches(response.data);
    } catch (error) {
      console.log(error);
    }
  }


  const getAllLineofBusinesses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getlob', {
        params: {
          orgname: localStorage.getItem('orgname'),
          orgcode: localStorage.getItem('orgcode'),
        }
      })
      setalllineofbusinesses(response.data);
    } catch (error) {
      console.log(error);
    }
  }


  const getAllOrgs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getorgforTAT', {
        params: {
          orgname: localStorage.getItem('orgname'),
          orgcode: localStorage.getItem('orgcode'),
        }
      })
      setallorgs(response.data);
    } catch (error) {
      console.log(error);
    }
  }


  const getMilestones = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getmilestones', {
        params: {
          orgname: localStorage.getItem('orgname'),
          orgcode: localStorage.getItem('orgcode')
        }
      });
      setallmilestones(response.data);
    } catch (error) {
      console.log(error);
    }
  };


  const openEditModal = (workflow) => {
    setSelectedWorkflow(workflow); // Set the selected workflow data
    setworkflowData({ // Populate the workflowData state with the selected workflow data
      workflowname: workflow.workflowmilestone,
      duration: workflow.duration,
      days: workflow.days,
      hours: workflow.hours,
      minutes: workflow.minutes,
      milestone: workflow.workflowname,
      plandatechange: workflow.plandatechange,
    });
    setVisible(true); // Open the modal
  };


  const handleChange = (name, value) => {
    setworkflowData({ ...workflowData, [name]: value });
  };



  const updateWorkflow = async () => {
    try {

      // Send request to update workflow data
      const response = await axios.put('http://localhost:5000/updatesetworkflow', {
        id: selectedWorkflow.id,
        ...workflowData,
      });

      setVisible(false);


    } catch (error) {
      console.log(error);
    }
  };




  const handleCheckboxChange = (name, checked) => {
    let checkvalue = 0;
    if (checked) {
      checkvalue = 1;
    }
    setworkflowData({ ...workflowData, [name]: checkvalue });
  };


  const handleModalClose = () => {
    setVisible(false);
    setworkflowData({
      workflowname: '',
      duration: '',
      days: '',
      hours: '',
      minutes: '',
      milestone: '',
      plandatechange: '',
    });
    setSelectedWorkflow(null);
  };








  // const renderOrgOptions = () => {
  //   // Create a map to store unique client names
  //   const uniqueClientNames = new Map();
  //   // Iterate through allorgs to extract unique client names
  //   allorgs.forEach(org => {
  //     uniqueClientNames.set(org.clientname, org.id); // Assuming org.id is the unique identifier
  //   });
  //   // Create options array from unique client names
  //   const options = Array.from(uniqueClientNames, ([label, value]) => ({ label, value }));
  //   return options;
  // };


  const CreateWorkflow = async () => {
    try {
      const response = await axios.post('http://localhost:5000/createworkflow', {
        orgname: localStorage.getItem('orgname'),
        orgcode: localStorage.getItem('orgcode'),
        workflowData: workflowData,
        branchName: localStorage.getItem('workflowbranchname'),
        lob: localStorage.getItem('workflowlobname'),
        importername: localStorage.getItem('workflowimportername')
      });
      readsetworkflow();
      toast.success('Workflow created successfully');
      setVisible(false);

    } catch (error) {
      console.log(error);
    }
  }



  const handleDelete = async (workflow) => {
    try {

      const response = await axios.delete('http://localhost:5000/deletesetworkflow', {
        data: {
          id: workflow.id,
          orgname: workflow.orgname,
          orgcode: workflow.orgcode,
          importername: workflow.importername,
          ownbranchname: workflow.ownbranchname,
          lobname: workflow.lobname
        }
      });
      if (response.status === 200) {
        toast.success('Milestone deleted successfully');
        readsetworkflow();
      }
    } catch (error) {
      console.log(error);
    }
  };


  const handleorg = (selectedOrg) => {
    setselectedOrg(selectedOrg)
  }



  async function readsetworkflow() {
    try {
      const response = await axios.get('http://localhost:5000/readsetworkflow', {
        params: {
          orgname: localStorage.getItem('orgname'),
          orgcode: localStorage.getItem('orgcode'),
          importername: localStorage.getItem('workflowimportername'),
          lobname: localStorage.getItem('workflowlobname'),
          branchname: localStorage.getItem('workflowbranchname')
        }
      })
      setWorkflowsData(response.data);
    } catch (error) {
      console.log(error);
    }
  }



  useEffect(() => {
    try {
      getAllBranches();
      getAllLineofBusinesses();
      getAllOrgs();
      getMilestones();
      // readAllWorkflows();
      readsetworkflow();
    } catch (error) {
      console.log(error);
    }
  }, [])



  return (
    <CCol xs={12}>
      <CCard className="mb-2 container-div">
        <CCardBody>
          <div className='grid-container-import'>
            <div>
              <label htmlFor="Locations" className='text-field-3'>Applicable for</label>
              <input value={localStorage.getItem('workflowbranchname')} readOnly />

            </div>
            <div>
              <label htmlFor="Locations" className='text-field-3'>Line of Business</label>
              <input value={localStorage.getItem('workflowlobname')} readOnly />

            </div>

            <div>
              <label for="Locations" className='text-field-3'>Customer/Organization</label>

              <div className='left-div'>

                <input value={localStorage.getItem('workflowimportername')} readOnly />
              </div>
            </div>
          </div>

        </CCardBody>

      </CCard>
      <CTable hover responsive striped className=''>
        <CTableHead>
          <CTableRow color='dark' >
            <CTableHeaderCell scope="col">Milestone Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">TAT</CTableHeaderCell>
            <CTableHeaderCell scope="col">Assigned Person</CTableHeaderCell>
            <CTableHeaderCell scope="col">Operation</CTableHeaderCell>
          </CTableRow>
        </CTableHead>

        <CTableBody>
          {WorkFlowsData && WorkFlowsData.map((workflow, index) => {
            return (
              <CTableRow key={index}>
                <CTableDataCell>{workflow.workflowmilestone}</CTableDataCell>
                <CTableDataCell>{workflow.days ? `${workflow.days + ' days ' + workflow.hours + ' hours ' + workflow.minutes + ' mins '}` : 'NA'}</CTableDataCell>
                <CTableDataCell>{workflow.assignedPerson ? workflow.assignedPerson : 'NA'}</CTableDataCell>
                <CTableDataCell>
                  <CButton onClick={() => openEditModal(workflow)}>Edit</CButton>
                  <CButton onClick={() => handleDelete(workflow)}>Delete</CButton>
                </CTableDataCell>
              </CTableRow>
            )
          })}
        </CTableBody>


        <CTableBody>
          <CTableRow> <div className='search-button'>
            <CButton color="success" type="submit" className='contact-add-button' onClick={() => { setVisible(!visible); }}>
              +
            </CButton>
          </div></CTableRow>
        </CTableBody>


        <CModal
          visible={visible}
          onClose={() => setVisible(false)}
          aria-labelledby="LiveDemoExampleLabel"
          className='workflow-modal custom-modal '
          size="xl"
        >
          <CModalHeader onClose={handleModalClose}>
            <CModalTitle id="LiveDemoExampleLabel">
              Add Workflow
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <div>
              <div>
                <label for="Job Date" className='text-field-3'>Milestone Names</label>

                <CDropdown>
                  <CDropdownToggle className="dropdown-btn" color='secondary'>{workflowData.workflowname ? workflowData.workflowname : 'Select'}</CDropdownToggle>
                  <CDropdownMenu className="text-field-4">
                    {allmilestones && allmilestones.map((milestone, index) => (
                      <CDropdownItem key={index} onClick={() => handleChange('workflowname', milestone.milestonename)}>{milestone.milestonename}</CDropdownItem>
                    ))}
                  </CDropdownMenu>
                </CDropdown>


              </div>

              <CModalTitle id="LiveDemoExampleLabel">
                Planning
              </CModalTitle>

              <div>
                <label for="Job Date" className='text-field-3'>Duration</label>
                <CDropdown>
                  <CDropdownToggle className="dropdown-btn" color='secondary'>{workflowData.duration ? workflowData.duration : 'Select'}</CDropdownToggle>
                  <CDropdownMenu className="text-field-4">
                    <CDropdownItem onClick={() => handleChange('duration', 'Before')}>Before</CDropdownItem>
                    <CDropdownItem onClick={() => handleChange('duration', 'After')}>After</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
                <input type="text" placeholder="" className='text-field-4' onChange={(e) => handleChange('days', e.target.value)} value={workflowData.days} />
                <label for="Job Date" className='text-field-3'>Days</label>
                <input type="text" placeholder="" className='text-field-4' onChange={(e) => handleChange('hours', e.target.value)} value={workflowData.hours} />
                <label for="Job Date" className='text-field-3'>Hours</label>
                <input type="text" placeholder="" className='text-field-4' onChange={(e) => handleChange('minutes', e.target.value)} value={workflowData.minutes} />
                <label for="Job Date" className='text-field-3'>Mins.</label>
                <label for="Job Date" className='text-field-3'>of</label>

                <CDropdown>
                  <CDropdownToggle className="dropdown-btn" color='secondary'>{workflowData.milestone ? workflowData.milestone : 'Select'}</CDropdownToggle>
                  <CDropdownMenu className="text-field-4">
                    <CDropdownItem onClick={() => handleChange('milestone', 'Job Creation Date')}>Job Creation Date</CDropdownItem>
                    {allmilestones && allmilestones.map((milestone, index) => (
                      <React.Fragment key={index}>
                        <CDropdownItem onClick={() => handleChange('milestone', milestone.milestonename)}>{milestone.milestonename}</CDropdownItem>
                      </React.Fragment>
                    ))}
                  </CDropdownMenu>
                </CDropdown>

              </div>
              <div>
                <label for="Job Date" className='text-field-3'>Can Change Plan Date</label> </div>
              <CTableDataCell><input type="checkbox" placeholder="" className='o2d-field-4' onChange={(e) => handleCheckboxChange('plandatechange', e.target.checked)} checked={workflowData.plandatechange} /></CTableDataCell>
            </div>
          </CModalBody>

          <CModalFooter>
            <CButton color="secondary" onClick={handleModalClose}>
              Close
            </CButton>
            <CButton color="primary" onClick={selectedWorkflow ? updateWorkflow : CreateWorkflow}>
              {selectedWorkflow ? 'Update Workflow' : 'Create Workflow'}
            </CButton>

            {/* <CButton color="primary" onClick={CreateWorkflow}>
              Create Workflow
            </CButton> */}
          </CModalFooter>
        </CModal>


      </CTable>
    </CCol>

  )
}

export default setWorkflow;