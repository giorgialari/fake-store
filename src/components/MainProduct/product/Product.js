import React, { useEffect, useState } from 'react';
import { getProductById } from '../../../api/Api';
import Button from 'react-bootstrap/Button';
import './Product.css'

function Product() {
    const [Data, setData] = useState([]);

    useEffect(() => {
        getProductById()
        .then((response) => setData([response])) // Nota l'uso di array per immagazzinare i dati
      }, []);
      

    return (
        <div>
            {Data.length > 0 ? (
                Data.map((data) => {
                    return (
                        <div key={data.id}>
                            <div className="container">

                                <div className="left-column">
                                    <img data-image="black" className="active image" src={data.image} alt="" />
                                </div>


                                <div className="right-column">

                                    <div className="product-description">
                                        <span>{data.category}</span>
                                        <h3>{data.title}</h3>
                                        <p>{data.description}</p>
                                    </div>

                                    <div className="product-price">
                                        <div>{data.price}$</div>
                                        <Button variant="primary">Add to cart</Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )
                })
            ) : (
                <p>Caricamento in corso...</p>
            )}
        </div>
    )
}

export default Product;
