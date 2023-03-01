import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../category/Category.css';
import { getCategoriyByType, deleteProduct } from '../../../api/Api';

function Category() {
  const [Data, setData] = useState([]);
  const navigate = useNavigate();
  const { category } = useParams();

  useEffect(() => {
    if (category) {
      getCategoriyByType(category)
        .then((response) => setData(response))
    }
  }, [category]); //ha [category] come dipendenza perché vogliamo che venga richiamato ogni volta che il parametro category cambia.

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
    <div className="products mt-5">
      {Data && Data.length > 0 ? (
        Data.map((data) => {
          return (
            <div key={data.id}>
              <Card className="single-product" style={{ width: '18rem' }}>
                <div className="img-container">
                  <Card.Img
                    className="single-product-img"
                    variant="top"
                    src={data.image}
                  />
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
          );
        })
      ) : (
        <p>Caricamento in corso...</p>
      )}
    </div>
  );
}

export default Category;
