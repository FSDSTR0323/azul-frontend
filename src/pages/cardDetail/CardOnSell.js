import React, {useState, useEffect} from 'react';
import CardImagesModal from "./CardImagesModal";
import { getFlag } from '../../utils/languageToFlag'
import MessageModal from "./MessageModal";
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import moment from 'moment';
import axios from 'axios';
import { authorizationConfig } from '../../security';
import { useNavigate } from 'react-router-dom';
import deleteimage from "../../assets/delete.png";
import bidimage from "../../assets/bid.png";
import { useForm } from 'react-hook-form';
import Menu from "@mui/material/Menu";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import buynowimage from "../../assets/buynow.png";
import buyimage from "../../assets/buy.png";

export const CardOnSell = ({card, setKeyUpdate, keyUpdate}) => {

    const navigate = useNavigate()
    const {userData, setUserDataChangeDummy, userDataChangeDummy} = useContext(UserContext)
    const [cardPrice, setCardPrice] = useState("")
    const [anchorElBid, setAnchorElBid] = useState(null);
    const [idCard, setIdCard] = useState(null);
    const [BidsCard, setBidsCard] = useState(null);

    const { control: BidControl, register: BidRegister, handleSubmit: BidHandleSubmit, formState: BidFormState, reset } = useForm();

    useEffect(() => {
        setCardPrice(card.price)
    }, [keyUpdate, card] ); 

    const getStatus = (status) => {
        switch (status) {
            case "new" :
                return <span span className="status-new">Nueva</span>;
            case "almost_new" :
                return <span span className="status-almost_new">Casi nueva</span>;
            case "excellent" :
                return <span span className="status-excellent">Excelente</span>;
            case "good" :
                return <span span className="status-good">Buena</span>;
            case "lightly_played" :
                return <span span className="status-lightly_played">Ligeramente jugada</span>;
            case "played" :
                return <span span className="status-played">Jugada</span>;
            case "poor" :
                return <span span className="status-poor">Pobre</span>;
            default:
                return null;
        }
    };

    const getBidDate = (date) => {
    if (date) {
        const formatedDate = moment(date).format('DD/MM/YYYY HH:mm')
        return (formatedDate)
    }else{
        return ('-')
    }
    }

    const onClickDel = async (card) => {
    try {
        const userDataRes = await axios.get(`${process.env.REACT_APP_BASE_URL}/getUserData`, authorizationConfig.getHeaders())
        console.log('estoy en el try de onclickDEL')
        let cardDelData = {
        _id: card._id,
        };
        console.log('cardDelData es:', cardDelData)
        await axios.post(`${process.env.REACT_APP_BASE_URL}/cards/delcard`, cardDelData, authorizationConfig.getHeaders())
        
        console.log('Carta eliminada:', cardDelData)
        setKeyUpdate(keyUpdate + 1); 
                
    } catch (error){
        console.log('Error al eliminar la carta en la base de datos', error);
        navigate("/login")
    }
    }

    const handleClickBid = (event) => {
        setIdCard(event.currentTarget.id)
        setBidsCard(event.currentTarget.bids)
        setAnchorElBid(event.currentTarget);
    };

    const handleCloseBid = () => {
        setAnchorElBid(null);
    };

    const BidOnSubmit = async (formData) => {
    try{
        const userDataRes = await axios.get(`${process.env.REACT_APP_BASE_URL}/getUserData`, authorizationConfig.getHeaders())
        let cardToBidData = {
        id_card: idCard,
        user: userDataRes.data.userData._id,
        price: formData.price,
        }
        console.log("id_card es:", cardToBidData.id_card)
        await axios.post(`${process.env.REACT_APP_BASE_URL}/cards/bidupcard`, cardToBidData, authorizationConfig.getHeaders());
        setKeyUpdate(!keyUpdate)
        reset()
        handleCloseBid()
        toast.success("¡Puja realizada!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }catch(error){}
    }

    const getBidsAmount = (card) => {
        const amount = card.bids.length;
        return amount
    }

    const onClickBuy = async (card) => {
        try {
            const userDataRes = await axios.get(`${process.env.REACT_APP_BASE_URL}/getUserData`, authorizationConfig.getHeaders())
            console.log('estoy en el try de onclickbuy')
            let cardBuyedData = {
            _id: card._id,
            buyer: userDataRes.data.userData._id,
            };
            console.log('cardBuyedData es:', cardBuyedData)
            await axios.post(`${process.env.REACT_APP_BASE_URL}/cards/buycard`, cardBuyedData, authorizationConfig.getHeaders())
            
            console.log('Carta comprada:', cardBuyedData)
            setKeyUpdate(keyUpdate + 1); 
            toast.success("La compra se ha realizado correctamente", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (error){
            console.log('Error al comprar la carta en la base de datos', error);
            toast.warning("Para poder comprar cartas necesitas estar conectado, redirigiendo al login", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            navigate("/login")
        }
    }

    const onClickCart = async (card) => {
    try {
        console.log("llamamos al token!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", authorizationConfig.getHeaders())
        const userDataRes = await axios.get(`${process.env.REACT_APP_BASE_URL}/getUserData`, authorizationConfig.getHeaders())
        console.log('estoy en el try de onclickcart')
        let cardOnCartData = {
        _id: card._id,
        onCart: userDataRes.data.userData._id,
        };
        await axios.post(`${process.env.REACT_APP_BASE_URL}/cards/oncartcard`, cardOnCartData, authorizationConfig.getHeaders())
        setKeyUpdate(keyUpdate + 1); 
        setUserDataChangeDummy(!userDataChangeDummy)
        toast.success("Carta añadida al carrito", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    } catch (error){
        console.log('Error al comprar la carta en la base de datos', error);
        toast.warning("Para poder comprar cartas necesitas estar conectado, redirigiendo al login", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        navigate("/login")
    }
    }


    return (
        <React.Fragment key={card._id}>
            <div className="grid-content-smaller">
                <div id="selector" className="grid-content-smaller">{card.set_name}</div>
                <CardImagesModal cardImages={card.image}/>
            </div>
            <div className="grid-content">{getFlag(card.lang)}</div>
            <div className="grid-content">{card.foil ? "Sí" : "No"}</div>
            <div className="grid-content">{getStatus(card.status)}</div>
            {/* <div className="grid-content">{getTypeSell(card.type_sell)}</div> */}
            <div className="grid-content">{card.price} €</div>
            <div className="grid-content-smaller">{getBidDate(card.end_of_bid)}</div>
            <div className="grid-content">
                <div className="grid-content">{card.user.username}</div>
                <MessageModal receiverUsername={card.user.username} receiverId={card.user._id}/>
            </div>
            {card.user.username === userData?.username ? (
                <div className="grid-content-colspan" >
                        <button className="buy-button" title="Eliminar">
                            <img
                            className="buy-symbol-image"
                            onClick={() => onClickDel(card)}
                            src={deleteimage}
                            alt="Eliminar"
                            id={card._id}
                            />
                        </button>
                </div>
            ) : (
                <>
                    {card.type_sell === "Subasta" ? (
                        <div className="grid-content-colspan" >
                            <button className="buy-button" title="Pujar">
                                <img
                                className="buy-symbol-image"
                                //onClick={() => onClickBid(card)}
                                onClick={handleClickBid}
                                src={bidimage}
                                alt="Pujar"
                                id={card._id}
                                />
                            </button>
                            <Menu onSubmit={BidHandleSubmit(BidOnSubmit)} 
                                    id="bidform"
                                    className="bid-form-box"
                                    component="form"
                                    noValidate
                                    autoComplete="off"
                                    anchorEl={anchorElBid}
                                    open={Boolean(anchorElBid)}
                                    onClose={handleCloseBid}
                            >
                                {console.log("cardpriceeeeeeeeeeee:", typeof card.price)}
                                <input
                                    type="number"
                                    id="price"
                                    {...BidRegister("price", { 
                                        required: true,
                                        min: +cardPrice +1
                                    //validate: value => value > (card.price) 
                                    }
                                        )}
                                    />
                                <br></br>
                                <div className="grid-content">Pujas realizadas: {getBidsAmount(card)}</div>
                                <button id="Pujar" type="submit" disabled={!BidFormState.isValid}>Pujar</button>
                            </Menu>
                        </div>
                    ) :  (
                        <>
                            <div className="grid-content">
                                <button className="buynow-button" title="Comprar ya!">
                                    <img
                                    className="buynow-symbol-image"
                                    onClick={() => onClickBuy(card)}
                                    src={buynowimage}
                                    alt="Comprar"
                                    />
                                </button>
                            </div>
                            <div className="grid-content">
                                <button className="buy-button" data-toggle="tooltip" title="Añadir al carrito">
                                    <img
                                    className="buy-symbol-image"
                                    onClick={() => onClickCart(card)}
                                    src={buyimage}
                                    alt="Añadir"
                                    />
                                </button>
                            </div>
                        </>
                    )}
                </>
            )}
        </React.Fragment>
    )
} 