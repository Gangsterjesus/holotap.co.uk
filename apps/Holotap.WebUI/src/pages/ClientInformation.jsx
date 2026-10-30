import { useState } from "react";
import "../styles/client-information.css";

export default function ClientInformation() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    postcode: "",
  });

  return (
    <div className="client-container">
      <div className="client-card">
        <h1>Client Information</h1>

        <p>
          Please provide your information to continue
          identity verification.
        </p>

        <div className="client-form">

          <input
            placeholder="First Name"
            value={form.firstName}
            onChange={(e) =>
              setForm({
                ...form,
                firstName: e.target.value,
              })
            }
          />

          <input
            placeholder="Last Name"
            value={form.lastName}
            onChange={(e) =>
              setForm({
                ...form,
                lastName: e.target.value,
              })
            }
          />

          <input
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value,
              })
            }
          />

          <input
            placeholder="Address"
            value={form.address}
            onChange={(e) =>
              setForm({
                ...form,
                address: e.target.value,
              })
            }
          />

          <input
            placeholder="Town / City"
            value={form.city}
            onChange={(e) =>
              setForm({
                ...form,
                city: e.target.value,
              })
            }
          />

          <input
            placeholder="Postcode"
            value={form.postcode}
            onChange={(e) =>
              setForm({
                ...form,
                postcode: e.target.value,
              })
            }
          />

        </div>
      </div>
    </div>
  );
}