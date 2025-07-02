// // Candidates.jsx
// import './Candidatess.css';
// import { useEffect, useState } from 'react';
// import api from '../../services/api';
// import { FiMoreVertical, FiDownload, FiEdit2, FiTrash2 } from 'react-icons/fi';
// import AddCandidateModal from './AddCandidatesModal';

// const Candidates = () => {
//   const [candidates, setCandidates] = useState([]);
//   const [filteredCandidates, setFilteredCandidates] = useState([]);
//   const [positions, setPositions] = useState([]);
//   const [statusFilter, setStatusFilter] = useState('');
//   const [positionFilter, setPositionFilter] = useState('');
//   const [activeAction, setActiveAction] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     const fetchCandidates = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await api.get('candidates/get', {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });
//         setCandidates(response.data);
//         setFilteredCandidates(response.data);

//         const uniquePositions = [...new Set(response.data.map(c => c.position))];
//         setPositions(uniquePositions);
//       } catch (error) {
//         console.error('Error fetching candidates:', error);
//       }
//     };

//     fetchCandidates();
//   }, []);

//   useEffect(() => {
//     const filtered = candidates.filter(candidate => {
//       const statusMatch = statusFilter ? candidate.status === statusFilter : true;
//       const positionMatch = positionFilter ? candidate.position === positionFilter : true;
//       return statusMatch && positionMatch;
//     });
//     setFilteredCandidates(filtered);
//   }, [statusFilter, positionFilter, candidates]);

//   const handleStatusChange = async (id, newStatus) => {
//     try {
//       const token = localStorage.getItem('token');
//       await api.patch(`candidates/update/${id}`, { status: newStatus }, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       const updated = candidates.map(candidate =>
//         candidate._id === id ? { ...candidate, status: newStatus } : candidate
//       );
//       setCandidates(updated);
//     } catch (err) {
//       console.error('Error updating status:', err);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const token = localStorage.getItem('token');
//       await api.delete(`candidates/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       const updated = candidates.filter(c => c._id !== id);
//       setCandidates(updated);
//     } catch (err) {
//       console.error('Error deleting candidate:', err);
//     }
//   };

//   const handleDownload = (url) => {
//     window.open(`http://localhost:5000/${url}`, '_blank');
//   };

//   const handleAddCandidate = async (formData) => {
//   try {
//     const token = localStorage.getItem('token');
//     await api.post('candidates/create', formData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     setShowModal(false);
//     // refetch or update local state
//     const updated = await api.get('candidates/get', {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     setCandidates(updated.data);
//   } catch (err) {
//     console.error('Error adding candidate:', err);
//   }
// };
  

//   return (
//     <div className="candidates-page">
//       <div className="candidates-header">
//         <div className="filters">
//           <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
//             <option value="">Status</option>
//             <option>New</option>
//             <option>Scheduled</option>
//             <option>Ongoing</option>
//             <option>Selected</option>
//             <option>Rejected</option>
//           </select>

//           <select value={positionFilter} onChange={(e) => setPositionFilter(e.target.value)}>
//             <option value="">Position</option>
//             {positions.map((pos, i) => (
//               <option key={i}>{pos}</option>
//             ))}
//           </select>
//         </div>

//         <div className="right-tools">
//           <input type="text" placeholder="Search" className="search-input" />
//           <button className="add-btn" onClick={() => setShowModal(true)}>
//             Add Candidate
//           </button>
//         </div>
//       </div>

//       <div className="candidates-table">
//         <table>
//           <thead>
//             <tr>
//               <th>Sr no.</th>
//               <th>Candidates Name</th>
//               <th>Email Address</th>
//               <th>Phone Number</th>
//               <th>Position</th>
//               <th>Status</th>
//               <th>Experience</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredCandidates.map((c, idx) => (
//               <tr key={c._id}>
//                 <td>{String(idx + 1).padStart(2, '0')}</td>
//                 <td>{c.name}</td>
//                 <td>{c.email}</td>
//                 <td>{c.phoneNumber}</td>
//                 <td>{c.position}</td>
//                 <td>
//                   <select
//                     value={c.status}
//                     className={`status-select ${c.status.toLowerCase()}`}
//                     onChange={(e) => handleStatusChange(c._id, e.target.value)}
//                   >
//                     <option>New</option>
//                     <option>Scheduled</option>
//                     <option>Ongoing</option>
//                     <option>Selected</option>
//                     <option>Rejected</option>
//                   </select>
//                 </td>
//                 <td>{c.experience}</td>
//                 <td className="action-cell">
//                   <div className="action-wrapper">
//                     <FiMoreVertical
//                       className="action-icon"
//                       onClick={() => setActiveAction(activeAction === c._id ? null : c._id)}
//                     />
//                     {activeAction === c._id && (
//                       <div className="dropdown-actions">
//                         <div onClick={() => handleDownload(c.resumeUrl)}><FiDownload /> Download</div>
//                         <div><FiEdit2 /> Update</div>
//                         <div onClick={() => handleDelete(c._id)}><FiTrash2 /> Delete</div>
//                       </div>
//                     )}
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       {showModal && (
//     <AddCandidateModal
//       onClose={() => setShowModal(false)}
//       onSubmit={handleAddCandidate}
//     />
//     )}
//     </div>
//   );
// };

// export default Candidates;

// Candidates.jsx
// import './Candidatess.css';
// import { useEffect, useState } from 'react';
// import api from '../../services/api';
// import { FiMoreVertical, FiDownload, FiEdit2, FiTrash2 } from 'react-icons/fi';
// import AddCandidateModal from './AddCandidatesModal';
// import SearchInput from '../../components/SearchInput';

// const Candidates = () => {
//   const [candidates, setCandidates] = useState([]);
//   const [filteredCandidates, setFilteredCandidates] = useState([]);
//   const [positions, setPositions] = useState([]);
//   const [statusFilter, setStatusFilter] = useState('');
//   const [positionFilter, setPositionFilter] = useState('');
//   const [activeAction, setActiveAction] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     const fetchCandidates = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await api.get('candidates/get', {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });
//         setCandidates(response.data);
//         setFilteredCandidates(response.data);

//         const positionMap = {};
//         response.data.forEach(c => {
//           const raw = c.position || '';
//           const normalized = raw.trim().toLowerCase();
//           if (!positionMap[normalized]) {
//             positionMap[normalized] = raw.trim();
//           }
//         });

//         const uniquePositions = Object.values(positionMap);
//         setPositions(uniquePositions);
//       } catch (error) {
//         console.error('Error fetching candidates:', error);
//       }
//     };

//     fetchCandidates();
//   }, []);

//   useEffect(() => {
//     const filtered = candidates.filter(candidate => {
//       const statusMatch = statusFilter ? candidate.status === statusFilter : true;
//       const positionMatch = positionFilter ? candidate.position === positionFilter : true;
//       const searchMatch = searchTerm
//         ? [candidate.name, candidate.email, candidate.phoneNumber, candidate.position]
//             .some(field => field?.toLowerCase().includes(searchTerm))
//         : true;

//       return statusMatch && positionMatch && searchMatch;
//     });

//     setFilteredCandidates(filtered);
//   }, [statusFilter, positionFilter, candidates]);

//   const handleStatusChange = async (id, newStatus) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await api.patch(`candidates/update/${id}`, { status: newStatus }, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.status === 200) {
//         const updated = candidates.map(candidate =>
//           candidate._id === id ? { ...candidate, status: newStatus } : candidate
//         );
//         setCandidates(updated);
//       }
//     } catch (err) {
//       console.error('Error updating status:', err);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const token = localStorage.getItem('token');
//       await api.delete(`candidates/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       const updated = candidates.filter(c => c._id !== id);
//       setCandidates(updated);
//     } catch (err) {
//       console.error('Error deleting candidate:', err);
//     }
//   };

//   const handleDownload = (url) => {
//     window.open(`http://localhost:5000/${url}`, '_blank');
//   };

//   const handleAddCandidate = async (formData) => {
//     try {
//       const token = localStorage.getItem('token');
//       await api.post('candidates/create', formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setShowModal(false);
//       const updated = await api.get('candidates/get', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCandidates(updated.data);
//     } catch (err) {
//       console.error('Error adding candidate:', err);
//     }
//   };

//   return (
//     <div className="candidates-page">
//       <div className="candidates-header">
//         <div className="filters">
//           <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
//             <option value="">Status</option>
//             <option>New</option>
//             <option>Scheduled</option>
//             <option>Ongoing</option>
//             <option>Selected</option>
//             <option>Rejected</option>
//           </select>

//           <select value={positionFilter} onChange={(e) => setPositionFilter(e.target.value)}>
//             <option value="">Position</option>
//             {positions.map((pos, i) => (
//               <option key={i}>{pos}</option>
//             ))}
//           </select>
//         </div>

//         <div className="right-tools">
//           <SearchInput onSearch={(query) => setSearchTerm(query)} />
//           <button className="add-btn" onClick={() => setShowModal(true)}>
//             Add Candidate
//           </button>
//         </div>
//       </div>

//       <div className="candidates-table">
//         <table>
//           <thead>
//             <tr>
//               <th>Sr no.</th>
//               <th>Candidates Name</th>
//               <th>Email Address</th>
//               <th>Phone Number</th>
//               <th>Position</th>
//               <th>Status</th>
//               <th>Experience</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredCandidates.map((c, idx) => (
//               <tr key={c._id}>
//                 <td>{String(idx + 1).padStart(2, '0')}</td>
//                 <td>{c.name}</td>
//                 <td>{c.email}</td>
//                 <td>{c.phoneNumber}</td>
//                 <td>{c.position}</td>
//                 <td>
//                   <select
//                     value={c.status}
//                     className={`status-select ${c.status.toLowerCase()}`}
//                     onChange={(e) => handleStatusChange(c._id, e.target.value)}
//                   >
//                     <option value="New">New</option>
//                     <option value="Scheduled">Scheduled</option>
//                     <option value="Ongoing">Ongoing</option>
//                     <option value="Selected">Selected</option>
//                     <option value="Rejected">Rejected</option>
//                   </select>
//                 </td>
//                 <td>{c.experience}</td>
//                 <td className="action-cell">
//                   <div className="action-wrapper">
//                     <FiMoreVertical
//                       className="action-icon"
//                       onClick={() => setActiveAction(activeAction === c._id ? null : c._id)}
//                     />
//                     {activeAction === c._id && (
//                       <div className="dropdown-actions">
//                         <div onClick={() => handleDownload(c.resumeUrl)}><FiDownload /> Download</div>
//                         <div onClick={() => handleDelete(c._id)}><FiTrash2 /> Delete</div>
//                       </div>
//                     )}
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {showModal && (
//         <AddCandidateModal
//           onClose={() => setShowModal(false)}
//           onSubmit={handleAddCandidate}
//         />
//       )}
//     </div>
//   );
// };

// export default Candidates;


// Candidates.jsx
import './Candidatess.css';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { FiMoreVertical, FiDownload, FiEdit2, FiTrash2 } from 'react-icons/fi';
import AddCandidateModal from './AddCandidatesModal';

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [positions, setPositions] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [positionFilter, setPositionFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeAction, setActiveAction] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('candidates/get', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCandidates(response.data);
        setFilteredCandidates(response.data);

        const positionMap = {};
        response.data.forEach(c => {
          const raw = c.position || '';
          const normalized = raw.trim().toLowerCase();
          if (!positionMap[normalized]) {
            positionMap[normalized] = raw.trim();
          }
        });

        const uniquePositions = Object.values(positionMap);
        setPositions(uniquePositions);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };

    fetchCandidates();
  }, []);

  useEffect(() => {
    const filtered = candidates.filter(candidate => {
      const statusMatch = statusFilter ? candidate.status === statusFilter : true;
      const positionMatch = positionFilter ? candidate.position === positionFilter : true;
      return statusMatch && positionMatch;
    });
    setFilteredCandidates(filtered);
  }, [statusFilter, positionFilter, candidates]);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      const filtered = candidates.filter(candidate =>
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCandidates(filtered);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.patch(`candidates/update/${id}`, { status: newStatus }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const updated = candidates.map(candidate =>
          candidate._id === id ? { ...candidate, status: newStatus } : candidate
        );
        setCandidates(updated);
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await api.delete(`candidates/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const updated = candidates.filter(c => c._id !== id);
      setCandidates(updated);
    } catch (err) {
      console.error('Error deleting candidate:', err);
    }
  };

  const handleDownload = (url) => {
    window.open(`http://localhost:5000/${url}`, '_blank');
  };

  const handleAddCandidate = async (formData) => {
    try {
      const token = localStorage.getItem('token');
      await api.post('candidates/create', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setShowModal(false);
      const updated = await api.get('candidates/get', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCandidates(updated.data);
    } catch (err) {
      console.error('Error adding candidate:', err);
    }
  };

  return (
    <div className="candidates-page">
      <div className="candidates-header">
        <div className="filters">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">Status</option>
            <option>New</option>
            <option>Scheduled</option>
            <option>Ongoing</option>
            <option>Selected</option>
            <option>Rejected</option>
          </select>

          <select value={positionFilter} onChange={(e) => setPositionFilter(e.target.value)}>
            <option value="">Position</option>
            {positions.map((pos, i) => (
              <option key={i}>{pos}</option>
            ))}
          </select>
        </div>

        <div className="right-tools">
          <input
            type="text"
            placeholder="Search"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
          />
          <button className="add-btn" onClick={() => setShowModal(true)}>
            Add Candidate
          </button>
        </div>
      </div>

      <div className="candidates-table">
        <table>
          <thead>
            <tr>
              <th>Sr no.</th>
              <th>Candidates Name</th>
              <th>Email Address</th>
              <th>Phone Number</th>
              <th>Position</th>
              <th>Status</th>
              <th>Experience</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.map((c, idx) => (
              <tr key={c._id}>
                <td>{String(idx + 1).padStart(2, '0')}</td>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.phoneNumber}</td>
                <td>{c.position}</td>
                <td>
                  <select
                    value={c.status}
                    className={`status-select ${c.status.toLowerCase()}`}
                    onChange={(e) => handleStatusChange(c._id, e.target.value)}
                  >
                    <option value="New">New</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Selected">Selected</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
                <td>{c.experience}</td>
                <td className="action-cell">
                  <div className="action-wrapper">
                    <FiMoreVertical
                      className="action-icon"
                      onClick={() => setActiveAction(activeAction === c._id ? null : c._id)}
                    />
                    {activeAction === c._id && (
                      <div className="dropdown-actions">
                        <div onClick={() => handleDownload(c.resumeUrl)}><FiDownload /> Download</div>
                        <div onClick={() => handleDelete(c._id)}><FiTrash2 /> Delete</div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <AddCandidateModal
          onClose={() => setShowModal(false)}
          onSubmit={handleAddCandidate}
        />
      )}
    </div>
  );
};

export default Candidates;

