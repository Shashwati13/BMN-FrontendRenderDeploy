import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import { Badge, Table } from "react-bootstrap";
import moment from "moment/moment";
import axios from "axios";
function AdminProperties() {
  let token = Cookies.get("token");
  const history = useHistory();
  if (token != "admin") {
    history.push("/admin/login");
    window.location.reload();
  }
  const [getProperties, setProperties] = useState(undefined);

  const getData = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/admin/properties`
      );
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
          <th>Property ID</th>
          <th>Property Name</th>
          <th>Property Address</th>
          <th>Added By</th>
          <th>Added Date</th>
          <th>Is Booked</th>
        </tr>
      </thead>
      <tbody>
        {getProperties ? (
          getProperties.map((i, index) => {
            return (
              <tr key={i._id}>
                <td>{index + 1}</td>
                <td>{i._id.toString()}</td>
                <td>{i.propertyName}</td>
                <td>
                  {i.propertyAddress.addressOne} {i.propertyAddress.addressTwo},{" "}
                  {i.propertyAddress.city},{i.propertyAddress.state}{" "}
                  {i.propertyAddress.zip}
                </td>
                <td>
                  {i.personalInfo.firstName} {i.personalInfo.lastName}
                </td>
                <td>{moment(i.createdAt).format("MMM Do YYYY")}</td>
                <td>
                  {i.isBooked === true ? (
                    <Badge pill bg="success">
                      Booked
                    </Badge>
                  ) : (
                    <Badge pill bg="warning">
                      Not Booked
                    </Badge>
                  )}
                </td>
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

export default AdminProperties;
