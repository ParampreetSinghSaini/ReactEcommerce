import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Swal from 'sweetalert2'
import { Card, Table } from 'react-bootstrap';

export default function List() {

    const [products, setProducts] = useState([])

    useEffect(()=>{
        fetchProducts() 
    },[])

    const fetchProducts = async () => {
        await axios.get(`http://localhost:3001/api/product`).then(({data})=>{
            setProducts(data)
        })
    }

    const deleteProduct = async (id) => {
        const isConfirm = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            return result.isConfirmed
          });

          if(!isConfirm){
            return;
          }

          await axios.delete(`http://localhost:3001/api/product/${id}`).then(({data})=>{
            Swal.fire({
                icon:"success",
                text:data.message
            })
            fetchProducts()
          }).catch(({response:{data}})=>{
            Swal.fire({
                text:data.message,
                icon:"error"
            })
          })
    }

    return (
        <div className="container">
        <div className="row">
            <div className="col-12 mt-3 mb-2">
                <Link className="btn btn-primary float-end" to="/auth/admin/add-product">
                    Create Product
                </Link>
            </div>
            <div className="col-12">
                <Card>
                    <Card.Body>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>New Price</th>
                                    <th>Old Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((row, key) => (
                                    <tr key={key}>
                                        <td>{row.name}</td>
                                        <td>{row.category}</td>
                                        <td>{row.new_Price}</td>
                                        <td>{row.old_price}</td>
                                        <td>
                                            <Link to={`/auth/admin/edit-product/${row._id}`} className="btn btn-success me-2">
                                                Edit
                                            </Link>
                                            <Button variant="danger" onClick={() => deleteProduct(row._id)}>
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </div>
        </div>
    </div>
    
    )
}