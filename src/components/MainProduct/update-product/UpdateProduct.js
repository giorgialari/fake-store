import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { editProduct, getAllCategories, getProductById } from '../../../api/Api';
import '../update-product/UpdateProduct.css'


function UpdateProduct() {
  const [Data, setData] = useState({});
  const [Category, setCategory] = useState([]);


  useEffect(() => {
    getAllCategories().then((categories) => setCategory(categories));
    getProductById().then((product) => setData(product));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { title, image, price, category, description } = event.target.elements;
    const CurrentProduct = {
      title: title.value,
      image: image.value,
      price: price.value,
      category: category.value,
      description: description.value,
    };
    const idCurrent = localStorage.getItem('id')
    editProduct(idCurrent, CurrentProduct)
      .then((response) => {
        setData(response)
        document.getElementById('alert').style.display = 'block'
      })
  };

  return (
    <div className='form-container'>
      {Data && Data.id ? (
        <Form onSubmit={handleSubmit}>
          <h3>Edit product</h3>
          <Alert variant="success" id='alert' style={{ display: 'none', fontSize: '12px', maxWidth: '410px' }}>
            <Alert.Heading style={{ fontSize: '14px' }}>Prodotto aggiornato con successo</Alert.Heading>
            <div>
              I suoi valori aggioranti:
              <Table striped bordered hover size="sm">
                  <tr>
                    <th>Title</th>
                    <td>{Data.title}</td>
                  </tr>
                  <tr>
                    <th>Price</th>
                    <td>{Data.price}</td>
                  </tr>
                  <tr>
                    <th>Image</th>
                    <td>{Data.image}</td>
                  </tr>
                  <tr>
                    <th>Category</th>
                    <td>{Data.category}</td>
                  </tr>
                  <tr>
                    <th>Description</th>
                    <td>{Data.description}</td>
                  </tr>
              </Table>
              N.B.: Il prodotto non verrà aggiunto al DB e quindi non è visibile.
            </div>
          </Alert>
          <div className='title-price-container'>
            <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                className="title-input"
                type="text"
                name="title"
                defaultValue={Data.title}
                placeholder="Title"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                className="price-input"
                type="number" min="1" step="any" name='price'
                defaultValue={Data.price}
                placeholder="Price" />
            </Form.Group>
          </div>
          <div className='image-category-container'>
            <Form.Group className="mb-3" controlId="formBasicImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                className="url-input" type="url"
                name='image'
                defaultValue={Data.image}
                placeholder="url image" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCategory">
              <Form.Label>Category</Form.Label>
              <Form.Select
                className="category-select"
                name='category'
                defaultValue={Data.category}>
                {Category && Category.length > 0 ? (
                  Category.map((data) => {
                    return (
                      <option key={data}>{data}</option>
                    );
                  })
                ) : (
                  <option>Loading...</option>
                )}
              </Form.Select>
            </Form.Group>
          </div>
          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea"
              type="text"
              className="desc-select"
              name='description'
              defaultValue={Data.description}
              placeholder="Description" />
          </Form.Group>
          <Button variant="success" type="submit">
            Add
          </Button>
        </Form>
      ) : (
        <option>Loading...</option>
      )}
    </div>
  )
}

export default UpdateProduct