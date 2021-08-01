import React, {useState,useEffect} from 'react'
import './Header.css';
import Store from '../images/store.png';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import MenuIcon from '@material-ui/icons/Menu';
import CancelIcon from '@material-ui/icons/Cancel';
import {Link} from 'react-router-dom';
import { UseStateValue } from '../StateProvider';
import {auth} from '../firebase';
import M from 'materialize-css';


const Header = () => {

    const [{basket,user},dispatch] = UseStateValue();
    //#  basket:[{id,title,image,price,rating}]
    //# user:{displayName, email, etc}


    const [search, setSearch] = useState("");
    
    console.log(search);
    const [showMenu, setShowMenu] = useState(false);
    
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    const updateWidthAndHeight  = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    }

    useEffect(() => {
        window.addEventListener("resize", updateWidthAndHeight);
        if(window.innerWidth > 635){
            setShowMenu(false);
        }
        return () => window.removeEventListener("resize", updateWidthAndHeight);
    })

    const handleAuth = () => {
        if(user)
        M.toast({html:`Logged out successfully`,classes:"toast__success"})
        auth.signOut();
    }

    const searchProducts = () => {
    
        dispatch({
            type:"SEARCH_PRODUCT",
            searchProduct: search
        })
    }

    useEffect(() => {
        dispatch({
            type:"SEARCH_PRODUCT",
            searchProduct: search
        })  
    }, [search])

    return (
        <div className={!showMenu? "header" : "header__mobile"}>

            <Link to="/">
                
                <div className="header__title__logo" onClick={showMenu? (()=>setShowMenu(prevState => !prevState)) : null} >

                        <div className="header__title">
                            <h1>Online Shop</h1>
                        </div>

                        <div >
                            <img className="header__logo" src={Store} alt="store" />
                            
                        </div>



                </div>
            </Link>

            
           
            <div  className={!showMenu?"header__menu":"header__menuMobile"}>

                <div className="header__search" >
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className="header__searchInput"/>
                    <SearchIcon className="header__searchIcon" onClick={searchProducts} />
                </div>

                <div className="header__nav" onClick={showMenu? (()=>setShowMenu(prevState => !prevState)) : null}>

                
                
                    <div onClick={handleAuth} className="header__option">
                        <span className="header__optionLineOne">
                            Hello,  
                            <br></br>  
                            <p className="header__optionLineOneSMALL">{user? user.email : "Guest"}</p> 
                        </span>
                        <span className="header__optionLineTwo">
                        <Link to={!user && "/signin"}>
                            {user? "Sign out":"Sign in"}
                        </Link>
                        </span>
                    </div>
                
               
              

                <div className="header__option">
                    <span className="header__optionLineOne">
                        Returns
                    </span>
                    <span className="header__optionLineTwo">
                        <Link to="/orders">
                        & Orders
                        </Link>
                     </span>
                </div>

                <div className="header__option">
                    <span className="header__optionLineOne">
                        Your
                    </span>
                    <span className="header__optionLineTwo">
                        Prime
                     </span> 
                </div>

                <Link to="/checkout">
                <div className="header__optionBasket">
                    <ShoppingBasketIcon style={{color: basket?.length? "yellow" : "white"}} />
                <span className={
                    basket?.length?(
                        "header__optionLineTwo header__basketCount header_cart_true"
                    ):(
                        "header__optionLineTwo header__basketCount"
                    )
                }>
                    {basket?.length}
                </span>
                </div>

                </Link> 

              
               

            </div>

            </div>

            <div className="header__menuButton">

            

                 {basket.length > 0 && !showMenu && (
                            <Link to="/checkout">
                         <div className="header__optionBasket">
                         <ShoppingBasketIcon style={{color: basket?.length? "yellow" : "white"}} />
                     <span className={
                         basket?.length?(
                             "header__optionLineTwo header__basketCount header_cart_true"
                         ):(
                             "header__optionLineTwo header__basketCount"
                         )
                     }>
                         {basket?.length}
                     </span>
                     </div>
                     </Link>
                 ) }

    
                <div className="header__menu_close"> 
                   {!showMenu? (<MenuIcon className="menu__icon" onClick={()=>setShowMenu(prevState => !prevState)} />) 
                    : 
                    (<CancelIcon className="close__icon"  onClick={()=>setShowMenu(prevState => !prevState)} />) }
                    
                </div>


                   
            </div> 

            
        </div>
    )
}

export default Header
