import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import koyaxan from "assets/koyaxan.png";
import BATTLE from "assets/BATTLE.jpg";

function UserPage() {
  const [user, setUser] = useState({});
  const [editUser, setEditUser] = useState({
    id: "",
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    profileImage: "", // Add profile image field
  });
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setUser(loggedInUser);
      setEditUser({
        id: loggedInUser._id,
        firstname: loggedInUser.firstname,
        lastname: loggedInUser.lastname,
        username: loggedInUser.username,
        email: loggedInUser.email,
        password: "",
        profileImage: loggedInUser.profileImage || "", // Set profile image
      });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

  const handleUpdateUser = () => {
    const updatedUser = { ...editUser };
    if (updatedUser.password === "") {
      delete updatedUser.password; // Do not send empty password to the backend
    }

    axios
      .put(`http://localhost:3001/update/${editUser.id}`, updatedUser)
      .then((res) => {
        console.log("User updated successfully");
        const updatedUserData = { ...user, ...editUser, password: undefined };
        setUser(updatedUserData); // Update the user state
        localStorage.setItem("user", JSON.stringify(updatedUserData)); // Update localStorage
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">Edit Profile</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="px-1" md="6">
                      <FormGroup>
                        <label>Username</label>
                        <Input
                          value={editUser.username}
                          placeholder="Username"
                          type="text"
                          name="username"
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>Email address</label>
                        <Input
                          value={editUser.email}
                          placeholder="@gmail.com"
                          type="email"
                          name="email"
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>First Name</label>
                        <Input
                          value={editUser.firstname}
                          placeholder="First Name"
                          type="text"
                          name="firstname"
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>Last Name</label>
                        <Input
                          value={editUser.lastname}
                          placeholder="Last Name"
                          type="text"
                          name="lastname"
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Password</label>
                        <Input
                          value={editUser.password}
                          placeholder="Password"
                          type="password"
                          name="password"
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Profile Image URL</label>
                        <Input
                          value={editUser.profileImage}
                          placeholder="Profile Image URL"
                          type="text"
                          name="profileImage"
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <div className="text-center">
                    <Button
                      className="btn btn-success"
                      onClick={handleUpdateUser}
                    >
                      Update Profile
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <div className="image">
                <img alt="..." src={BATTLE} />
              </div>
              <CardBody>
                <div className="author">
                  <a
                    href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    onClick={(e) => e.preventDefault()}
                  >
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={editUser.profileImage || koyaxan} // Use profile image if available
                    />
                    <h5 className="title">
                      {user.firstname + " " + user.lastname}
                    </h5>
                  </a>
                  <p className="description">{user.username}</p>
                </div>
                <p className="description text-center">{user.email}</p>
              </CardBody>
              <hr />
              <div className="button-container">
                <Button
                  className="btn-neutral btn-icon btn-round"
                  color="default"
                  href="https://www.facebook.com/"
                  onClick={(e) => e.preventDefault()}
                  size="lg"
                >
                  <i className="fab fa-facebook-f" />
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default UserPage;
