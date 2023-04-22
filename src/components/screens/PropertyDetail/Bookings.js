import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";
import React, { useState } from "react";
import Cookies from "js-cookie";
import Table from "react-bootstrap/Table";
import { useEffect } from "react";
import Badge from "react-bootstrap/Badge";
import moment from "moment/moment";
function Bookings() {
  const history = useHistory();
  const idToken = Cookies.get("token");
  if (!idToken) {
    history.push("/login");
    window.location.reload();
  }
  const [getProperties, setProperties] = useState(undefined);
  let userId = Cookies.get("user");
  const getData = async () => {
    try {
      const header = {
        headers: {
          authorization: "Bearer " + idToken,
        },
      };
      const { data } = await axios.get(
        `http://localhost:4000/users/${userId}/bookings`,
        header
      );

      console.log(data)
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
          <th>Property Name</th>
          <th>Property Address</th>
          <th>Booking Dates</th>
          <th>Amount</th>
          <th>Booking Status</th>
        </tr>
      </thead>
      <tbody>
        {getProperties ? (
          getProperties.map((i) => {
            return (
              <tr
                key={i._id}
                onClick={() => {
                  history.push(`/property/${i.propertyId.toString()}`);
                  window.location.reload();
                }}
              >
                <td>{i.property[0]?.propertyName}</td>
                <td>
                  {i.property[0]?.propertyAddress.addressOne}{" "}
                  {i.property[0]?.propertyAddress.addressTwo},{" "}
                  {i.property[0]?.propertyAddress.city},
                  {i.property[0]?.propertyAddress.state}{" "}
                  {i.property[0]?.propertyAddress.zip}
                </td>
                <td>
                  {moment(i.startDate).format("MMM Do YYYY")} {" to  "}
                  {moment(i.endDate).format("MMM Do YYYY")}
                </td>
                <td>{i.property[0]?.propertyPrice}</td>
                <td>
                  <Badge pill bg="success">
                    Confirm
                  </Badge>
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
export default Bookings;
