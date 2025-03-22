import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import { sectionService } from '../../services/sectionService';
import { uploadService } from '../../services/uploadService';
import { Section } from '../../types/section';

const SectionManagement: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  // Edit modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editSection, setEditSection] = useState<Section | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [uploadingAudio, setUploadingAudio] = useState(false);
  
  // Available audio files
  const [availableAudioFiles, setAvailableAudioFiles] = useState<string[]>([]);
  const [selectedExistingAudio, setSelectedExistingAudio] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch all sections
        const sectionsData = await sectionService.getAllSections();
        setSections(sectionsData);
        
        // Fetch available audio files
        const audioFiles = await uploadService.getAudioFiles();
        setAvailableAudioFiles(audioFiles);
      } catch (err) {
        setError('Failed to load sections data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = (section: Section) => {
    setEditSection(section);
    setVideoUrl(section.videoUrl);
    setSelectedExistingAudio('');
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setEditSection(null);
    setAudioFile(null);
    setVideoUrl('');
    setSelectedExistingAudio('');
  };

  const handleAudioFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAudioFile(e.target.files[0]);
      setSelectedExistingAudio(''); // Clear selected existing audio when a new file is chosen
    }
  };

  const handleExistingAudioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedExistingAudio(e.target.value);
    setAudioFile(null); // Clear uploaded file when an existing audio is selected
  };

  const handleVideoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(e.target.value);
  };

  const handleSaveChanges = async () => {
    if (!editSection) return;
    
    try {
      setError(null);
      
      let audioUrl = editSection.audioUrl;
      
      // If a new audio file is selected, upload it
      if (audioFile) {
        setUploadingAudio(true);
        const uploadResult = await uploadService.uploadAudio(audioFile);
        audioUrl = uploadResult.url;
        setUploadingAudio(false);
      } else if (selectedExistingAudio) {
        // If an existing audio file is selected
        audioUrl = selectedExistingAudio;
      }
      
      // Update section with new audio and video URLs
      const updatedSection = await sectionService.updateSection(editSection._id, {
        audioUrl,
        videoUrl
      });
      
      // Update sections list
      setSections(sections.map(s => 
        s._id === updatedSection._id ? updatedSection : s
      ));
      
      setSuccessMessage('Section updated successfully');
      handleCloseModal();
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (err) {
      setError('Failed to update section');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-2">Loading sections...</p>
      </div>
    );
  }

  return (
    <div>
      <h4 className="mb-3">Section Management</h4>
      
      {error && <Alert variant="danger">{error}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      
      <Table responsive striped hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Course</th>
            <th>Video</th>
            <th>Audio</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sections.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center">No sections found</td>
            </tr>
          ) : (
            sections.map(section => (
              <tr key={section._id}>
                <td>{section.title}</td>
                <td>{section.course ? (section.course as any).title : 'Unknown'}</td>
                <td>
                  {section.videoUrl ? (
                    <span className="text-success">✓</span>
                  ) : (
                    <span className="text-danger">✗</span>
                  )}
                </td>
                <td>
                  {section.audioUrl ? (
                    <span className="text-success">✓</span>
                  ) : (
                    <span className="text-danger">✗</span>
                  )}
                </td>
                <td>
                  <Button 
                    variant="outline-primary" 
                    size="sm"
                    onClick={() => handleEditClick(section)}
                  >
                    Edit Media
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      
      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Section Media</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editSection && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Section Title</Form.Label>
                <Form.Control
                  type="text"
                  value={editSection.title}
                  disabled
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Video URL</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter video URL (YouTube, Vimeo, etc.)"
                  value={videoUrl}
                  onChange={handleVideoUrlChange}
                />
                <Form.Text className="text-muted">
                  Enter a URL for YouTube, Vimeo, or other supported video platforms.
                </Form.Text>
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Audio File</Form.Label>
                
                <div className="mb-2">
                  <Form.Label>Select Existing Audio File</Form.Label>
                  <Form.Select
                    value={selectedExistingAudio}
                    onChange={handleExistingAudioChange}
                  >
                    <option value="">-- Select an existing audio file --</option>
                    {availableAudioFiles.map((file, index) => (
                      <option key={index} value={file}>
                        {file.split('/').pop()}
                      </option>
                    ))}
                  </Form.Select>
                </div>
                
                <div className="mb-2">
                  <Form.Label>Or Upload New Audio File</Form.Label>
                  <Form.Control
                    type="file"
                    accept="audio/*"
                    onChange={handleAudioFileChange}
                  />
                  <Form.Text className="text-muted">
                    Supported formats: WAV, MP3, OGG
                  </Form.Text>
                </div>
                
                {editSection.audioUrl && (
                  <div className="mt-2">
                    <Form.Label>Current Audio File</Form.Label>
                    <div className="d-flex align-items-center">
                      <audio controls className="me-2" style={{ maxWidth: '100%' }}>
                        <source src={editSection.audioUrl} />
                        Your browser does not support the audio element.
                      </audio>
                      <small className="text-muted">
                        {editSection.audioUrl.split('/').pop()}
                      </small>
                    </div>
                  </div>
                )}
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleSaveChanges}
            disabled={uploadingAudio}
          >
            {uploadingAudio ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Uploading...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SectionManagement;
