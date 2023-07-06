// import React, { useState } from "react";
// import axios from "axios";  


// const  getMediaType= type => {
//          if (type.includes.includes('iamge')) return 'image'
//          if (type.includes.includes('video')) return 'video'
//      }



//      export const SubiendoImagen = () => {
//     const [file, setFile] = useState();
//     const [url,setUrls] = useState([]);
//     const[name, setName] = useState('');

//     console.log('useestate assets', file);
//     const multipleUpload = () => {
//         for (let i = 0; i<file.length; i++){
//             upload(file[i])
//         }
//     }

//     const upload = archivo => {
//         const data = new FormData()
//         data.append('file', archivo)
//         data.append ('upload_preset', ' images')
//         data.append ('cloud_name', 'dcvlhfeqv')
       
//         const mediaType = getMediaType(archivo.type);
//         fetch(`https://api.cloudinary.com/v1_1/dcvlhfeqv/${mediaType}/upload`,{
//                  method:'post',
//                  body: data
//             })
//             .then(resp=> resp.jsno ())
//             .then(data=> {
//                 console.log('url', data);
//                 setUrls(prev =>prev.concat(data.url))
//             })
//      .catch (err => console.log(err))
    
//      return ( 
//             <div className="center">
//                 <div>
//                     <input multiple='multiple' type='file' onChange={(e)=> setFile(e.target.files)}></input>
//                     <input value= {name}onChange={e=> setName(e.currentTarget.value)}></input>
                    
//                     <button onClick={console.log}>upload</button>
                    
//                 </div>
//                 <div>
//                     <h1> las imagenes se mostraran aqui </h1>
//                     {url.map(images=> <img src={images}></img>)}
//                 </div>
//             </div>
//             )
        
        
    
//         }}