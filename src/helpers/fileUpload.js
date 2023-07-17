export const fileUpload = async (file) => {
    // Check if file exists
    if (!file) return null;
  
    // URL for cloudinary API
    const cloudUrl = 'https://api.cloudinary.com/v1_1/dqhi0fedb/upload';
  
    // Create a new FormData object
    const formData = new FormData();
  
    // Append necessary data to the form
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);
  
    try {
      // Send a POST request to cloudinary API with the form data
      const resp = await fetch(cloudUrl, {
        method: 'POST',
        body: formData,
      });
  
      // Check if the response is successful
      if (!resp.ok) throw new Error('No se pudo subir imagen');
  
      // Parse the response JSON
      const cloudResp = await resp.json();
  
      // Return the secure URL of the uploaded image
      return cloudResp.secure_url;
    } catch (error) {
      // Return null in case of any error
      return null;
    }
  };
  