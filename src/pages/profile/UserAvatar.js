import { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Container } from "@mui/material";


export function UploadButtons({ register, formDisabled, setFile, userAvatar }) {
    
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

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Stack direction="row" alignItems="center" spacing={2}>
          {imageReader && <img src={imageReader} alt="Uploaded user avatar" className="avatar-image"/>}
          {!imageReader && userAvatar && <img src={userAvatar} alt="Uploaded user avatar" className="avatar-image"/>}
        <label htmlFor="upload-image">
          <Button variant="contained" component="span" disabled={formDisabled}>
            Seleccionar avatar
          </Button>
          <input
            id="upload-image"
            hidden
            accept="image/*"
            type="file"
            
            {...register("avatar_image", {
              onChange: handleFileSelect,
            })}
          />
        </label>
      </Stack>
    </Container>
  );
}