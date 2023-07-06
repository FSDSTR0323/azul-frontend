import React, { useState } from "react";
import { Container, FormGroup } from "@mui/material";



export const SubiendoImagen = (props) => {
   
   const [images, setImages] = useState('');
   const [loading, setLoading] =useState(false);
  
   const uploadImage = async (e)=>{
    console.log('aqui se sube la imagen')
    const files = e.target.files;
    const data = new FormData();
    data.append('file',file[0]);
    data.append('upload_preset',"images")
    setLoading(true);
    const res = await fetch(
        "https://api.cloudinary.com/v1_1/dcvlhfeqv/images/upload",
        {
            method: "POST",
            body: data,
        }
    )

    

    const file = await res.json();
    console.log('este es el file ', file)
    
    // console.log(res)
    setImages (file.secure_urls)
    console.log(file.secure_urls)
    setLoading(false)

    
   }
   
   
   
   return(<div>
<Container style = {{textAlign: 'center'}}>

<FormGroup>
    <input 
    multiple='multiple'
    type='file'
    name= 'file'
    placeholder="sube tu imagen "
    onchange={uploadImage}
    />
    {loading ?(<h3>cargando..</h3>):(<img src={images}slot="" style={{width:"300px"}}/>)}
</FormGroup>
</Container>

    </div>)
};


/// test//

// multiples imagenes //

// export const SubiendoImagen = (props) => {
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const uploadImage = async (e) => {
//     const files = e.target.files;
//     const data = new FormData();

//     for (let i = 0; i < files.length; i++) {
//       data.append("file", files[i]);
//       data.append("upload_preset", "images");
//       setLoading(true);
//       const res = await fetch(
//         "https://api.cloudinary.com/v1_1/dcvlhfeqv/images/upload",
//         {
//           method: "POST",
//           body: data,
//         }
//       );
//       const file = await res.json();
//       setImages((prevImages) => [...prevImages, file.secure_url]);
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <Container style={{ textAlign: "center" }}>
//         <FormGroup>
//           <input
//             type="file"
//             name="file"
//             placeholder="sube tus imágenes"
//             multiple
//             onChange={uploadImage}
//           />
//           {loading ? (
//             <h3>Cargando...</h3>
//           ) : (
//             images.map((image, index) => (
//               <img
//                 key={index}
//                 src={image}
//                 alt={`Imagen ${index}`}
//                 style={{ width: "300px" }}
//               />
//             ))
//           )}
//         </FormGroup>
//       </Container>
//     </div>
//   );
// };







///// 3 /////////


// export const  getMediaType= type => {
//     if (type.includes.includes('iamge')) return 'image'
//     if (type.includes.includes('video')) return 'video'
// }



// export const SubiendoImagen = () => {
// const [file, setFile] = useState();
// const [url,setUrls] = useState([]);
// const[name, setName] = useState('');

// console.log('useestate assets', file);
// const multipleUpload = () => {
//    for (let i = 0; i<file.length; i++){
//        upload(file[i])
//    }
// }

// const upload = archivo => {
//    const data = new FormData()
//    data.append('file', archivo)
//    data.append ('upload_preset', ' images')
//    data.append ('cloud_name', 'dcvlhfeqv')
  
//    const mediaType = getMediaType(archivo.type);
//    fetch(`https://api.cloudinary.com/v1_1/dcvlhfeqv/${mediaType}/upload`,{
//             method:'post',
//             body: data
//        })
//        .then(resp=> resp.jsno ())
//        .then(data=> {
//            console.log('url', data);
//            setUrls(prev =>prev.concat(data.url))
//        })
// .catch (err => console.log(err))

// return ( 
//        <div className="center">
//            <div>
//                <input multiple='multiple' type='file' onChange={(e)=> setFile(e.target.files)}></input>
//                <input value= {name}onChange={e=> setName(e.currentTarget.value)}></input>
               
//                <button onClick={console.log}>upload</button>
               
//            </div>
//            <div>
//                <h1> las imagenes se mostraran aqui </h1>
//                {url.map(images=> <img src={images}></img>)}
//            </div>
//        </div>
//        )
   
 

//    }}
