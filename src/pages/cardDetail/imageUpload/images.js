
// import React, { useState } from "react";
// import { Container, FormGroup } from "@mui/material";
// import { upload } from "@testing-library/user-event/dist/upload";


// const  getMediaType= type => {
//     if (type.includes.includes('iamge')) return 'image'
//     if (type.includes.includes('video')) return 'video'
// }
// const App = () =>{
//     const[file, setFile] = useState();
//     const [ urls,setUrls] = useState([]);
//     const [name,setName] = useSteate('');


//     console.log ('useState asset', file);

//     const multipleUpload = () => {
//         for (let i = 0;  i<file.lenght; i++){
//             upload(file[i])
//         }
//     }

// }

// const nupload = archivo => {
    
//  const data = new FormData()
 

//  data.append ('file', archivo )
//  data.append('upload-preset', 'images')
//  data.append ('cloud_name','dcvlhfeqv')

//  const mediaType = getMediaType(archivo.type);
//  fetch(`https://api.cloudinary.com/v1_1/dcvlhfeqv/${mediaType}/upload`,{
//     method:'post',
//     body: data
// })

// .then (resp => resp.json())
// .then(data => {
//     console.log('url', data);
//     // urls.push(data.url);
//     setUrls(prev => {
//         console.log ('quien es prev en esta historia',prev)
//        return  prev.push(data.url)})
//     setFile(1=.1)
// })
// .catch(err=> console.log(err))








// return ( 
//     <div className="center">
//         <div>
//             <input multiple='multiple' type='file' onChange={(e)=> setFile(e.target.files)}></input>
//             <input value= {name}onChange={e=> setName(e.currentTarget.value)}></input>
//             <Button onClick={console.log}>upload</Button>
//         </div>
//         <div>
//             <h1> las imagenes se mostraran aqui </h1>
//             {url.map(images=> <img src={images}></img>)}
//         </div>
//     </div>
//     )
// }

