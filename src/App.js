/** @format */

import "./App.css";
import React, { useState, useEffect } from "react";
import CustomerList from "./components/CustomerList";
import CustomerAddUpdateForm from "./components/CustomerAddUpdateForm";
// import customers from "./memdb.js";
// import { getAll, post, put, deleteById } from "./memdb.js";
import { getAll, post, put, deleteById } from "./restdb.js";

export function log(message) {
  console.log(message);
}

export function App(params) {
  let blankCustomer = { id: -1, name: "", email: "", password: "" };
  // let formObject = customers[0];
  const [refreshFlag, setRefreshFlag] = useState(0);
  const [customers, setCustomers] = useState([]);
  const [formObject, setFormObject] = useState(blankCustomer);

  let mode = formObject.id >= 0 ? "Update" : "Add";

  useEffect(() => {
    getCustomers();
  }, [refreshFlag]);

  const refresh = function (noChanges = false) {
    if (!noChanges) {
      setRefreshFlag(refreshFlag + 1);
    }
    setFormObject(blankCustomer);
  };

  const getCustomers = function () {
    log("in getCustomers()");
    getAll(setCustomers);
  };

  const handleListClick = function (item) {
    log("in handleListClick()");
    if (item === formObject) {
      setFormObject(blankCustomer);
    } else {
      setFormObject(item);
    }
  };

  const handleInputChange = function (event) {
    log("in handleInputChange()");
    const name = event.target.name;
    const value = event.target.value;
    let newFormObject = { ...formObject };
    newFormObject[name] = value;
    setFormObject(newFormObject);
  };

  let onCancelClick = function () {
    log("in onCancelClick()");
    setFormObject(blankCustomer);
  };

  let onDeleteClick = function () {
    log("in onDeleteClick()");

    if (formObject.id >= 0) {
      deleteById(formObject.id, refresh);
    }
    setFormObject(blankCustomer);
  };
  function isValidEmail(email) {
    // regular expression pattern for email validation.
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return pattern.test(email);
  }
  let onSaveClick = function () {
    log("in onSaveClick()");

    // check if all the 3 inputs are not null
    if (!formObject.name || !formObject.email || !formObject.password) {
      alert("Please enter all the fields");
      return;
    }

    if (!isValidEmail(formObject.email)) {
      // Display an error message for invalid email.
      alert("Invalid email. Please enter valid");
      return;
    }

    // Email is valid, proceed
    if (mode === "Add") {
      post(formObject, refresh);
    }
    if (mode === "Update") {
      put(formObject, refresh);
    }
    setFormObject(blankCustomer);
  };

  return (
    <div>
      <CustomerList
        customers={customers}
        formObject={formObject}
        handleListClick={handleListClick}
      />
      <CustomerAddUpdateForm
        formObject={formObject}
        handleInputChange={handleInputChange}
        onDeleteClick={onDeleteClick}
        onSaveClick={onSaveClick}
        onCancelClick={onCancelClick}
        // mode={mode}
      />
    </div>
  );
}

export default App;
