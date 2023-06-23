import { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Container } from "@mui/material";

export function UploadButtons() {
    const [file, setFile] = useState();
  const [imageReader, setImageReader] = useState(null);

  const handleFileSelect = (event) => {
    setFile(event.target.files)

    const fileReader = event.target.files[0];
    const reader = new FileReader();


    reader.onloadend = () => {
      setImageReader(reader.result);
    };

    reader.readAsDataURL(fileReader);
  };

  const handleFileUpload = (file) => {
    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", "fw-avatars")
    data.append("cloud_name", "freakyworld")

    // const mediaType = 
  }

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <label htmlFor="upload-image">
          <Button variant="contained" component="span">
            Seleccionar avatar
          </Button>
          <input
            id="upload-image"
            hidden
            accept="image/*"
            type="file"
            onChange={handleFileSelect}
          />
        </label>
        {imageReader && <img src={imageReader} alt="Uploaded user avatar" className="avatar-image"/>}
      </Stack>
    </Container>
  );
}