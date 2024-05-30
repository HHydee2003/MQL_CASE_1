import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
} from "reactstrap";
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const categories = ["Computers", "Peripherals", "Storage", "Networking", "Components", "Accessories", "Software"];

function Inventory() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    productName: "",
    category: "",
    price: "",
    quantity: "",
    sales: "",
    description: "",
    imageUrl: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editProduct, setEditProduct] = useState({
    id: "",
    productName: "",
    category: "",
    price: "",
    quantity: "",
    sales: "",
    description: "",
    imageUrl: "",
  });
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get("http://localhost:3001/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  };

  const toggleAddModal = () => setAddModal(!addModal);
  const toggleEditModal = () => setEditModal(!editModal);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const handleCreateProduct = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/products", newProduct)
      .then((res) => {
        fetchProducts();
        setNewProduct({
          productName: "",
          category: "",
          price: "",
          quantity: "",
          sales: "",
          description: "",
          imageUrl: "",
        });
        toggleAddModal();
      })
      .catch((err) => console.log(err));
  };

  const handleEditProduct = (id, productName, category, price, quantity, sales, description, imageUrl) => {
    setIsEditing(true);
    setEditProduct({
      id,
      productName,
      category,
      price,
      quantity,
      sales,
      description,
      imageUrl,
    });
    toggleEditModal();
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3001/products/${editProduct.id}`, editProduct)
      .then((res) => {
        fetchProducts();
        setIsEditing(false);
        setEditProduct({
          id: "",
          productName: "",
          category: "",
          price: "",
          quantity: "",
          sales: "",
          description: "",
          imageUrl: "",
        });
        toggleEditModal();
      })
      .catch((err) => console.log(err));
  };

  const confirmDeleteProduct = (product) => {
    setProductToDelete(product);
    toggleDeleteModal();
  };

  const handleDeleteProduct = () => {
    axios
      .delete(`http://localhost:3001/products/${productToDelete._id}`)
      .then((res) => {
        fetchProducts();
        toggleDeleteModal();
        setProductToDelete(null);
      })
      .catch((err) => console.log(err));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter((product) => {
    return product.productName && product.productName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row className="justify-content-end mb-3">
          <Col md={4}>
            <Form>
              <FormGroup>
                <InputGroup className="no-border">
                  <Input
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  <InputGroupAddon addonType="append">
                    <InputGroupText>
                      <i className="now-ui-icons ui-1_zoom-bold" />
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
            </Form>
          </Col>
        </Row>
        <Button className="btn btn-primary" color="success" onClick={toggleAddModal}>
          Add New Product
        </Button>
        <Row>
          {filteredProducts.length > 0 && (
            filteredProducts.map((product) => (
              <Col md={12} key={product._id}>
                <Card>
                  <CardBody style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px', overflow: 'hidden' }}>
                      <img
                        src={product.imageUrl}
                        alt={product.productName}
                        style={{ width: 'auto', height: '100%' }}
                      />
                    </div>
                    <div style={{ flex: '4', padding: '0 20px' }}>
                      <h5>{product.productName}</h5>
                      <p>Category: {product.category}</p>
                      <p>Quantity: {product.quantity}</p>
                      <p>Price: {new Intl.NumberFormat("en-us", { style: "currency", currency: "PHP" }).format(product.price)}</p>
                      <p>Sales: {new Intl.NumberFormat("en-us", { style: "currency", currency: "PHP" }).format(product.sales)}</p>
                      <p>Description: {product.description}</p>
                    </div>
                    <div style={{ flex: '1', display: 'flex', justifyContent: 'center' }}>
                      <Button
                        className="mr-2"
                        color="info"
                        onClick={() =>
                          handleEditProduct(
                            product._id,
                            product.productName,
                            product.category,
                            product.price,
                            product.quantity,
                            product.sales,
                            product.description,
                            product.imageUrl
                          )
                        }
                      >
                        <FiEdit />Update
                      </Button>
                      <Button
                        color="danger" onClick={() => confirmDeleteProduct(product)}> Delete
                        <FiTrash2 />
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))
          )}
        </Row>
        
        <Modal isOpen={addModal} toggle={toggleAddModal}>
          <ModalHeader toggle={toggleAddModal}>Add New Product</ModalHeader>
          <ModalBody>
            <Form onSubmit={handleCreateProduct}>
              <FormGroup>
                <Label for="productName">Product Name</Label>
                <Input
                  type="text"
                  name="productName"
                  id="productName"
                  value={newProduct.productName}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, productName: e.target.value })
                  }
                  placeholder="Enter product name"
                  className="form-control"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="category">Category</Label>
                <Input
                  type="select"
                  name="category"
                  id="category"
                  value={newProduct.category}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, category: e.target.value })
                  }
                  className="form-control"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="quantity">Quantity</Label>
                <Input
                  type="number"
                  name="quantity"
                  id="quantity"
                  value={newProduct.quantity}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, quantity: e.target.value })
                  }
                  placeholder="Enter quantity"
                  className="form-control"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="price">Price</Label>
                <Input
                  type="number"
                  name="price"
                  id="price"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                  placeholder="Enter price"
                  className="form-control"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="sales">Sales</Label>
                <Input
                  type="number"
                  name="sales"
                  id="sales"
                  value={newProduct.sales}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, sales: e.target.value })
                  }
                  placeholder="Enter sales"
                  className="form-control"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="description">Description</Label>
                <Input
                  type="textarea"
                  name="description"
                  id="description"
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, description: e.target.value })
                  }
                  placeholder="Enter description"
                  className="form-control"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="imageUrl">Image URL</Label>
                <Input
                  type="text"
                  name="imageUrl"
                  id="imageUrl"
                  value={newProduct.imageUrl}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      imageUrl: e.target.value,
                    })
                  }
                  placeholder="Enter image URL"
                  className="form-control"
                  required
                />
              </FormGroup>
              <Button type="submit" color="success" className="btn btn-primary">
                Add Product
              </Button>
            </Form>
          </ModalBody>
        </Modal>

        {isEditing && (
          <Modal isOpen={editModal} toggle={toggleEditModal}>
            <ModalHeader toggle={toggleEditModal}>Edit Product</ModalHeader>
            <ModalBody>
              <Form onSubmit={handleUpdateProduct}>
                <FormGroup>
                  <Label for="productName">Product Name</Label>
                  <Input
                    type="text"
                    name="productName"
                    id="productName"
                    value={editProduct.productName}
                    onChange={(e) =>
                      setEditProduct({
                        ...editProduct,
                        productName: e.target.value,
                      })
                    }
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="category">Category</Label>
                  <Input
                    type="select"
                    name="category"
                    id="category"
                    value={editProduct.category}
                    onChange={(e) =>
                      setEditProduct({
                        ...editProduct,
                        category: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category}>{category}</option>
                    ))}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="quantity">Quantity</Label>
                  <Input
                    type="number"
                    name="quantity"
                    id="quantity"
                    value={editProduct.quantity}
                    onChange={(e) =>
                      setEditProduct({
                        ...editProduct,
                        quantity: e.target.value,
                      })
                    }
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="price">Price</Label>
                  <Input
                    type="number"
                    name="price"
                    id="price"
                    value={editProduct.price}
                    onChange={(e) =>
                      setEditProduct({
                        ...editProduct,
                        price: e.target.value,
                      })
                    }
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="sales">Sales</Label>
                  <Input
                    type="number"
                    name="sales"
                    id="sales"
                    value={editProduct.sales}
                    onChange={(e) =>
                      setEditProduct({
                        ...editProduct,
                        sales: e.target.value,
                      })
                    }
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="description">Description</Label>
                  <Input
                    type="textarea"
                    name="description"
                    id="description"
                    value={editProduct.description}
                    onChange={(e) =>
                      setEditProduct({
                        ...editProduct,
                        description: e.target.value,
                      })
                    }
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="imageUrl">Image URL</Label>
                  <Input
                    type="text"
                    name="imageUrl"
                    id="imageUrl"
                    value={editProduct.imageUrl}
                    onChange={(e) =>
                      setEditProduct({
                        ...editProduct,
                        imageUrl: e.target.value,
                      })
                    }
                    required
                  />
                </FormGroup>
                <Button type="submit" color="success">Update Product</Button>
              </Form>
            </ModalBody>
          </Modal>
        )}

        <Modal isOpen={deleteModal} toggle={toggleDeleteModal}>
          <ModalHeader toggle={toggleDeleteModal}>Confirm Delete</ModalHeader>
          <ModalBody>
            Are you sure you want to delete the product "{productToDelete?.productName}"?
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={handleDeleteProduct}>Delete</Button>
            <Button color="success" onClick={toggleDeleteModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
}

export default Inventory;
