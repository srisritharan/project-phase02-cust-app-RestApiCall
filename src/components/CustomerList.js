/** @format */
import React from "react";

export default function CustomerList(props) {
  const customers = props.customers;
  const formObject = props.formObject;
  const handleListClick = props.handleListClick;
  return (
    <div className="boxed">
      <h4>Customer List</h4>
      <table id="customer-list">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Pass</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((item, index) => {
            return (
              <tr
                key={item.id}
                onClick={() => handleListClick(item)}
                className={item.id === formObject.id ? "selected" : ""}
              >
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.password}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
