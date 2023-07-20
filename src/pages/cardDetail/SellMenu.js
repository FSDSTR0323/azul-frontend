import React, { useEffect, useState } from "react";
import sellimage from "../../assets/sell.png";
import bidimage from "../../assets/bid.png";
import Menu from "@mui/material/Menu";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import { authorizationConfig } from "../../security";
import CardsOnSell from "./CardsOnSell";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import {MuiIdiomas} from "./estiladomenu/MuiIdiomas"
import { Estado } from "./estiladomenu/estado";
import{Box, MenuItem} from "@mui/material";
import Button from '@mui/material/Button';
import Stack from "@mui/material/Stack";
import { Container } from "@mui/material";
import {PujarIdiomas} from "./estiladomenu/pugjaridiomas";
import {PujarEstado} from "./estiladomenu/pujarEstado";


export default function SellMenu({ card }) {
  const [sellMessage, setSellMessage] = useState("");
  const [bidMessage, setBidMessage] = useState("");

  const [anchorElSell, setAnchorElSell] = useState(null);
  const handleClickSell = (event) => {
    setAnchorElSell(event.currentTarget);
  };
  const handleCloseSell = () => {
    setAnchorElSell(null);
  };

  const [anchorElBid, setAnchorElBid] = useState(null);
  const handleClickBid = (event) => {
    setAnchorElBid(event.currentTarget);
  };
  const handleCloseBid = () => {
    setAnchorElBid(null);
  };
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const navigate = useNavigate();

  const {
    control: sellControl,
    register: sellRegister,
    handleSubmit: sellHandleSubmit,
    formState: sellFormState,
  } = useForm();
  const {
    control: bidControl,
    register: bidRegister,
    handleSubmit: bidHandleSubmit,
    formState: bidFormState,
  } = useForm();
  const [updateKey, setUpdateKey] = useState(0);
  const [imageUrl, setImageUrl] = useState("")
  const [imageUrls, setImageUrls] = useState([])

  const handleFileUpload = async (files) => {
    const filesToUpload = files.target.files;
    console.log('SellMenu.js 58 | handling file upload', files.target.files );
  try {
    console.log('SellMenu.js 59 | uploading...', files);
    const uploadPromises = Array.from(filesToUpload).map(async (file) => {
      const image = file;

      const imageData = new FormData();
      imageData.append("file", image);
      imageData.append("upload_preset", "nuclio-fw");
      imageData.append("cloud_name", "freakyworld");

      const mediaType = image.type.split("/")[0];

      const imageRes = await axios.post(
        `https://api.cloudinary.com/v1_1/freakyworld/${mediaType}/upload`,
        imageData
      );

      return imageRes.data.url;
    });

    const uploadedImages = await Promise.all(uploadPromises);

    console.log("Uploaded images:", uploadedImages);
    // Perform any necessary operations with the uploaded images
    setImageUrls(uploadedImages)

  } catch (err) {
    console.log("Error uploading images to Cloudinary:", err);
  }
};

  const sellOnSubmit = async (formData) => {
    //On_click del boton vender. obtiene la info del usuario conectado.
    //Crea un array con la info de la carta actual + id de usuario y
    //hace post en el backend para actualizar la BBDD con la nueva carta
    console.log('SellMenu.js 119 | sending sell info to backend');
    try {
      const userDataRes = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/getUserData`,
        authorizationConfig.getHeaders()
      );
      let cardSelledData = {
        id_scryfall: card.id_scryfall,
        id_card: card._id,
        name: card.name,
        set_name: formData.set_name,
        lang: formData.lang,
        foil: formData.sellFoil ? true : false,
        status: formData.status,
        type_sell: "Venta",
        price: formData.price,
        user: userDataRes.data.userData._id,
        image: imageUrls
      };
      console.log('SellMenu.js 138 | sending card data', cardSelledData);
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/cards/sellcard`,
        cardSelledData,
        authorizationConfig.getHeaders()
      );
      handleCloseSell()
      setTimeout(() => {
        setUpdateKey(updateKey + 1);
        console.log("Carta puesta a la venta:", cardSelledData);
        setSellMessage("¡La carta se ha puesto a la venta!");
      }, 100);
    } catch (error) {
      console.log("Error al incluir la carta en la base de datos", error);

      toast.warning(
        "Para poder vender cartas necesitas estar conectado, redirigiendo al login",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      navigate("/login");
    }
  };

  const bidOnSubmit = async (formData) => {
    try {
      const userDataRes = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/getUserData`,
        authorizationConfig.getHeaders()
      );
      let cardSelledData = {
        id_scryfall: card.id_scryfall,
        id_card: card._id,
        name: card.name,
        set_name: formData.set_name,
        lang: formData.lang,
        foil: formData.sellFoil ? true : false,
        status: formData.status,
        type_sell: "Subasta",
        price: formData.price,
        end_of_bid: formData.end_of_bid,
        user: userDataRes.data.userData._id,
        image: imageUrls
      };
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/cards/sellcard`,
        cardSelledData,
        authorizationConfig.getHeaders()
      );
      handleCloseBid()
      setTimeout(() => {
        setUpdateKey(updateKey + 1);
        console.log("Carta puesta en subasta:", cardSelledData);
        setBidMessage("¡La carta se ha puesto en subasta!");
      }, 100);
    } catch (error) {
      console.log("Error al incluir la carta en la base de datos", error);
      setBidMessage(
        "Para poder vender cartas necesitas estar conectado, redirigiendo al login"
      );
      setTimeout(() => {
        window.location.href = "http://localhost:3000/login";
      }, 3000);
    }
  };

  const [setNameOptions, setSetNameOptions] = useState([]);
  useEffect(() => {
    const fetchSetNameOptions = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/cards/cardcollections?name=${card.name}`
        );
        setSetNameOptions(response.data);
      } catch (error) {
        console.error(
          "Error al obtener las colecciones de las cartas en venta:",
          error
        );
      }
    };
    fetchSetNameOptions();
  }, [card.name]);

  return (
    <div>
      <div className="sell-buttons-container">
        <div>
          <button className="sell-button" onClick={handleClickSell}>
            Vender{" "}
            <img
              className="card-detail-symbol-image"
              src={sellimage}
              alt="Vender"
            />
          </button>
          <button className="sell-button" onClick={handleClickBid}>
            Subastar{" "}
            <img
              className="card-detail-symbol-image"
              src={bidimage}
              alt="Subastar"
            />
          </button>
        </div>

        <Menu
          onSubmit={sellHandleSubmit(sellOnSubmit)}
          id="sellform"
          className="sell-form-box"
          component="form"
          noValidate
          autoComplete="off"
          anchorEl={anchorElSell}
          open={Boolean(anchorElSell)}
          onClose={handleCloseSell}
        >
          {/* <label>Foil:</label>
          <input
            type="checkbox"
            id="foil"
            {...sellRegister("foil", { required: false })}
          /> */}
          <Box component="span"  m="10px 10px" sx={{ p: 2, border: '1px dashed with'   }}>
          <label className="Foil">Foil:</label>
          <Checkbox
            {...label}
            id='foil'
            {...sellRegister("foil", { required: false })}
          />
          </Box>
          <br />
          <select
            id="set_name"
            {...sellRegister("set_name", { required: true })}
          >
            {setNameOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <br />
          <MuiIdiomas id='lang' sellRegister={sellRegister} />
          {/* <label>Idioma de la carta: </label>
          <select id="lang" {...sellRegister("lang", { required: true })}>
            <option value="es">Español</option>
            <option value="en">Inglés</option>
            <option value="fr">Francés</option>
            <option value="de">Alemán</option>
            <option value="it">Italiano</option>
            <option value="zh">Chino</option>
            <option value="ja">Japonés</option>
            <option value="pt">Portugués</option>
          </select> */}

          <br />
          <Estado id='status' sellRegister={sellRegister}/>
          {/* <label>Estado: </label>
          <select id="status" {...sellRegister("status", { required: true })}>
            <option value="new">Nueva</option>
            <option value="almost_new">Casi Nueva</option>
            <option value="excellent">Excelente</option>
            <option value="good">Buena</option>
            <option value="lightly_played">Ligeramente Jugada</option>
            <option value="played">Jugada</option>
            <option value="poor">Pobre</option>
          </select> */}

          <br />
          <TextField
            id='outlined-basic'
            label='precio'
            variant='outlined'
            type='number'
            min='0'
            max='1000000'
            step='0.01'
            required
            {...sellRegister("price", { required: true })}
          />
        
          <br />
          <Container maxWidth='md' sx={{ mt: 3}}>
            <Stack direction='row' alignItems='center' spacing={2}>
              <input
                id='image-upload'
                type='file'
                multiple
                onChange={(file) => handleFileUpload(file)}
              />
             
            </Stack>
          </Container>
          <button id='sellcard' type='submit' disabled={!sellFormState.isValid}>
            Poner en Venta{" "}
            <img
              className='card-detail-symbol-image'
              src={sellimage}
              alt='Vender'
            />
          </button>
          {sellMessage && <p>{sellMessage}</p>}
        </Menu>

        <Menu
          onSubmit={bidHandleSubmit(bidOnSubmit)}
          id="bidform"
          className="bid-form-box"
          component="form"
          noValidate
          autoComplete="off"
          anchorEl={anchorElBid}
          open={Boolean(anchorElBid)}
          onClose={handleCloseBid}
        >
          <label>Foil: </label>
          <input
            type="checkbox"
            id="foil"
            {...bidRegister("foil", { required: false })}
          />
          <br />
          <select
            id="set_name"
            {...bidRegister("set_name", { required: true })}
          >
            {setNameOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <br />
          <PujarIdiomas id='lang' bidRegister={bidRegister} />
          {/* <label>Idioma de la carta: </label>
          <select id="lang" {...bidRegister("lang", { required: true })}>
            <option value="es">Español</option>
            <option value="en">Inglés</option>
            <option value="fr">Francés</option>
            <option value="de">Alemán</option>
            <option value="it">Italiano</option>
            <option value="zh">Chino</option>
            <option value="ja">Japonés</option>
            <option value="pt">Portugués</option>
          </select> */}

          <br />
          <PujarEstado id='lang' bidRegister={bidRegister} />
          {/* <label>Estado: </label>
          <select id="status" {...bidRegister("status", { required: true })}>
            <option value="new">Nueva</option>
            <option value="almost_new">Casi Nueva</option>
            <option value="excellent">Excelente</option>
            <option value="good">Buena</option>
            <option value="lightly_played">Ligeramente Jugada</option>
            <option value="played">Jugada</option>
            <option value="poor">Pobre</option>
          </select> */}

<br />
         
         <TextField
           id='outlined-basic'
           label='precio'
           variant='outlined'
           type='number'
           min='0'
           max='1000000'
           step='0.01'
           required
           {...bidRegister("price", { required: true })}
         />
         <br />
          <Controller
            name="end_of_bid"
            control={bidControl}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Fecha fin de puja:"
                  {...field}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={Boolean(bidFormState.errors.end_of_bid)}
                      helperText={bidFormState.errors.end_of_bid?.message}
                    />
                  )}
                />
              </LocalizationProvider>
            )}
          />
          <br />
          <input type="file" multiple onChange={(file) => handleFileUpload(file)} />

         
          <button id='bidcard' type='submit' disabled={!bidFormState.isValid}>
          Subastar{" "}
            <img
              className='card-detail-symbol-image'
              src={bidimage}
              alt='Subastar'
            />
          </button>
          {bidMessage && <p>{bidMessage}</p>}
        </Menu>
      </div>
      <CardsOnSell key={updateKey} card={card.name} />
    </div>
  );
}
