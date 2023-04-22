import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import { Badge, Table } from "react-bootstrap";
import moment from "moment/moment";
import axios from "axios";
function AdminPayments() {
  let token = Cookies.get("token");
  const history = useHistory();
  if (token != "admin") {
    history.push("/admin/login");
    window.location.reload();
  }
  const [getProperties, setProperties] = useState(undefined);

  const getData = async () => {
    try {
      const { data } = await axios.get(`http://localhost:4000/admin/payments`);
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
          <th>Payment Id</th>
          {/* <th>Card Number Ending</th> */}
          <th>Payment Date</th>
          <th>Payment Status</th>
        </tr>
      </thead>
      <tbody>
        {getProperties ? (
          getProperties.map((i, index) => {
            return (
              <tr key={i._id}>
                <td>{index + 1}</td>
                <td>{i._id.toString()}</td>
               {/* // <td>{i.cardNo.substr(-4)}</td> */}
                <td>{moment(i.paymentDate).format("MMM Do YYYY")}</td>
                <td>
                  {" "}
                  <Badge pill bg="success">
                    Success
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

export default AdminPayments;
