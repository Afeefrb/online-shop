import React from 'react';
// import Banner from '../images/banner2.png';
import WinterSale from '../images/winter-sale2.png';
import './Home.css'

import Product from './Product';
import Counter from './Counter';
import  {products} from '../products';

// import AstroHurry from './images/book1.png';
// import Sapiens from './images/sapiens.png';
// import Letters from './images/letters.jpg'; 
// import Death from './images/death.png';

import { UseStateValue } from '../StateProvider';

const Home = () => {
    const [{searchProduct},dispatch] = UseStateValue();

    let filteredProducts = products.filter(product => {
        return product.title.toLowerCase().indexOf(searchProduct.toLowerCase()) !== -1
    })

    console.log("filteredProducts: ", filteredProducts);




    return (


        <div className="home">
            <div className="home__container">    
                <img className="home__banner" src={WinterSale} alt="banner" />

                {/* <h1>Top Selling Books</h1> */}

                <Counter />

                <div className="home__row">

                    {filteredProducts.map(product => (
                        <Product 
                            id={product.id}
                            title={product.title}
                            image={product.image}
                            price={product.price}
                            rating={product.rating} />
                    ))}

                  

                   
                   {/* <Product
                   id="1"
                     title="Astrophysics for People in a Hurry"
                     image={AstroHurry}
                     price={316}
                     rating={5} />



                    <Product
                    id="2"                
                                        title="Letters from an Astrophysicist"
                                        image={Letters}
                                        price={349}
                                        rating={4} />
                    <Product
                    id="3"                  
                                        title="Death by Black Hole"
                                        image={Death}
                                        price={689}
                                        rating={4} />

                    <Product
                    id="4"
                                        title="Sapiens: A Brief History of Humankind"
                                        image={Sapiens}
                                        price={419}
                                        rating={5} /> */}


                    
        

                    

            
                  
            
                </div>

            </div>
        </div>
    )
}

export default Home
