import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';

export default function CreateProduct() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [newPrice, setNewPrice] = useState(0);
  const [oldPrice, setOldPrice] = useState(0);
  const [validationError, setValidationError] = useState({});

  const changeHandler = (event) => {
		setImage(event.target.files[0]);
	};

  const createProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData()

    formData.append('name', name);
    formData.append('category', category);
    formData.append('image', image);
    formData.append('new_Price', newPrice);
    formData.append('old_price', oldPrice);

    try {
      
        const response = await axios.post('http://localhost:3001/addProduct', formData);
  
        Swal.fire({
          icon: "success",
          text: response.data.message
        });
  
        navigate("/");
      } catch (error) {
        if (error.response && error.response.status === 422) {
          setValidationError(error.response.data.errors);
        } else {
          Swal.fire({
            text: error.response.data.message,
            icon: "error"
          });
        }
      }
    }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Create Product</h4>
              <hr />
              <div className="form-wrapper">
                {
                  Object.keys(validationError).length > 0 && (
                    <div className="row">
                      <div className="col-12">
                        <div className="alert alert-danger">
                          <ul className="mb-0">
                            {
                              Object.entries(validationError).map(([key, value]) => (
                                <li key={key}>{value}</li>
                              ))
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  )
                }
                <Form onSubmit={createProduct}>
                  <Form.Group controlId="Name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={name} onChange={(event) => setName(event.target.value)} />
                  </Form.Group>
                  <Form.Group controlId="Category">
                    <Form.Label>Category</Form.Label>
                    <Form.Control type="text" value={category} onChange={(event) => setCategory(event.target.value)} />
                  </Form.Group>
                  <Form.Group controlId="Image" className="mb-3">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="file" onChange={changeHandler} />
                  </Form.Group>
                  <Form.Group controlId="NewPrice">
                    <Form.Label>New Price</Form.Label>
                    <Form.Control type="number" value={newPrice} onChange={(event) => setNewPrice(event.target.value)} />
                  </Form.Group>
                  <Form.Group controlId="OldPrice">
                    <Form.Label>Old Price</Form.Label>
                    <Form.Control type="number" value={oldPrice} onChange={(event) => setOldPrice(event.target.value)} />
                  </Form.Group>
                  <Button variant="primary" className="mt-2" size="lg" block="block" type="submit">
                    Save
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}