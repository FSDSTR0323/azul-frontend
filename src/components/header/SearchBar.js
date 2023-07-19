import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';
import { CardContext } from '../../contexts/CardContext';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    marginRight: 40,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
    
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

export default function SearchBar() {


  const [matchedCards, setMatchedCards] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [nameInput, setNameInput] = useState('');
  const { cardIdChangeDummy, setCardIdChangeDummy } = useContext(CardContext)
  const navigate = useNavigate()

  // function debounce(func, timeout = 300){
  //   let timer;
  //   return (...args) => {
  //     clearTimeout(timer);
  //     timer = setTimeout(() => { func.apply(this, args); }, timeout);
  //   };
  // }

  // const changeInputValue = (event) => {
  //   setNameInput(event.target.value)
  //   setShowSuggestions(true)
  // }
 
  const handleChange = async (event) => {
    if (event.target.value.length > 2) {
      setNameInput(event.target.value)
      setShowSuggestions(true)
      // debounce(() => changeInputValue(event))
    }
  }

  const clearResultInput = () => {
    const input = document.getElementById('searching-input')
    input.value=""
    setShowSuggestions(false)
  }

  useEffect(() => {
    if(nameInput !== "") {
      (async () => {
        try {
          setMatchedCards([])
          const allMatchedCards = await axios.get(`http://localhost:5000/cards/search?name=${nameInput}`)

          //Se seleccionan X número de cartas y posteriormente se filtran para que no haya cartas repetidas
          const firstXCards = allMatchedCards.data.slice(0, 30) //Se seleccionan las primeras X cartas que coinciden con el resultado
          const cardsNames = firstXCards.map(e => e.name) // se crea un array con el nombre de las cartas
          const uniqueCardsNames = [...new Set(cardsNames)] // se crea un nuevo array con nombres únicos (se elimina nombres repetidos)
          const indexOfUniqueCards = uniqueCardsNames.map(e => cardsNames.indexOf(e)) // Se crea un array que almacena el índice de la primera carta con cada uno de los nombres únicos 
          const uniqueCards = indexOfUniqueCards.map(index => firstXCards[index]) // se crea el array definitivo seleccionando las cartas con los índice del array anterior
          setMatchedCards(uniqueCards)
        }
        catch(err){
          console.log(err)
        }
      if(nameInput === "") {
        setMatchedCards([])
      }
      })()
    }
  }, [nameInput])
      
  const handleNavigateToCardDetail = (cardId) => {
    setCardIdChangeDummy(!cardIdChangeDummy)
    const input = document.getElementById('searching-input')
    input.value=""
    setShowSuggestions(false)
    navigate(`/carddetail/${cardId}`)
  }

  return (
    <>
      <Search id="search-bar">
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
        onChange={handleChange}
        placeholder="Buscar carta..."
        inputProps={{ 'aria-label': 'search', id:'searching-input'}}
        />  
        <>
        <div className='search-results'>
          <div className='results-box'>
          {nameInput && showSuggestions &&
            matchedCards.map(e =>  {
              return (
                <div key={e._id}>
                {/* <Link to={`/carddetail/${e._id}`}> */}
                    <div className='search-result-background' onClick={() => handleNavigateToCardDetail(e._id)}>
                      <div className='search-result-item'>{e.name}</div>
                    </div>
                {/* </Link> */}
                <Divider />
                </div>
              )
            })
          }
          </div>
          {nameInput && showSuggestions &&
          <>
          <Divider style={{background:'black'}}/>
            <div id='search-button-box'>
              <a href='/register' id='search-button'>Búsqueda avanzada</a>
            </div>
          </>
          }
        </div>
        </> 
      </Search>
      {nameInput && showSuggestions && <div className='box' onClick={clearResultInput}></div> }
      </>
  )
}