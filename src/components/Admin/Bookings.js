import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import { Table } from "react-bootstrap";
import moment from "moment/moment";
import axios from "axios";
function AdminBookings() {
  let token = Cookies.get("token");
  const history = useHistory();
  if (token != "admin") {
    history.push("/admin/login");
    window.location.reload();
  }
  const [getProperties, setProperties] = useState(undefined);

  const getData = async () => {
    try {
      const { data } = await axios.get(`http://localhost:4000/admin/bookings`);
      setProperties(data);
    } catch (e) {
      if (e.response.status === 404) {
      } else {
      }
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>No.</th>
          <th>Booking Id</th>
          <th>Property Id</th>
          <th>Booking Dates</th>
          <th>Booked By</th>
          <th>Phone</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {getProperties ? (
          getProperties.map((i, index) => {
            return (
              <tr key={i._id}>
                <td>{index + 1}</td>
                <td>{i._id.toString()}</td>
                <td>{i.propertyId.toString()}</td>
                <td>
                  {moment(i.startDate).format("MMM Do YYYY")} {" to  "}
                  {moment(i.endDate).format("MMM Do YYYY")}
                </td>
                <td>
                  {i.fName} {i.lName}
                </td>
                <td>{i.phone}</td>
                <td>{i.email}</td>
              </tr>
            );
          })
        ) : (
          <div>No Data To show</div>
        )}
      </tbody>
    </Table>
  );
}

export default AdminBookings;
