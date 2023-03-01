import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Products.css';
import { getAllProducts, deleteProduct } from '../../../api/Api';



function Products() {
    const [Data, setData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.clear()
        getAllProducts().then((data) => setData(data));
    }, [])

    const goToProductDetails = (id) => {
        localStorage.setItem('id', id)
        navigate('/product/' + id)
    }
    const goToProductEdit = (id) => {
        localStorage.setItem('id', id)
        navigate('/edit-product/' + id)
    }
    //METODO CORRETTO CHE SI ADATTA A UN'API REALE. 
    //Questa api manda solo un messaggio di successo ma non elimina davvero il prodotto dal DB

    // const deleteCurrentProduct = (id) =>{
    //     deleteProduct(id)
    //     .then(() => getAllProducts().then((data) => setData(data)))
    // }

    //Metodo con filter per eliminare i dati dal db in maniera fittizia
    const deleteCurrentProduct = (id) => {
        deleteProduct(id)
            .then(() => {
                setData(prevData => prevData.filter(product => product.id !== id))
            })
    }
    return (
        <div className='products'>
            {Data.map((data) => {
                return (
                    <div key={data.id}>
                        <Card className="single-product" style={{ width: '18rem' }}>
                            <div className='img-container'>
                                <Card.Img className="single-product-img" variant="top" src={data.image} />
                            </div>
                            <Card.Body>
                                <Card.Title>{data.title}</Card.Title>
                                <div className='btn-container'>
                                    <Button variant="danger" onClick={() => deleteCurrentProduct(data.id)}>Delete</Button>
                                    <Button variant="warning" onClick={() => goToProductEdit(data.id)}>Edit</Button>
                                    <Button variant="primary" onClick={() => goToProductDetails(data.id)}>Details</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                )
            })}
        </div>
    )
}

export default Products