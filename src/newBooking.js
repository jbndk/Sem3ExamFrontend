
import React, { useState } from "react";
import facade from "./apiFacade";
import mainURL from "./settings";
import 'bootstrap/dist/css/bootstrap.min.css';



export default function NewBooking() {

  const [user, setUser] = useState(facade.getUsername);
  const init = {hotelID: "", cardNumber: "", startDate: "", numberOfNights: "", price: ""};
  const [bookingInfo, setBookingInfo] = useState(init);
  const [messageFromServer, setMessageFromServer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  
 
  const createBooking = (evt) => {
    evt.preventDefault();
    const options = facade.makeOptions("POST", true, {
      username: user,
      hotelID: bookingInfo.hotelID,
      cardNumber: bookingInfo.cardNumber,
      startDate: bookingInfo.startDate,
      numberOfNights: bookingInfo.numberOfNights,
      price: bookingInfo.price
    });

    return fetch(mainURL + "/api/hotel/book", options)
    .then(res => res.json())   
    .then(res => {
      console.log(options)
      console.log(res.message);
      setMessageFromServer(res.message);  
      setSubmitted(true);
      setBookingInfo(init);    
    });
};

const onChange = (evt) => {
  setBookingInfo({ ...bookingInfo, [evt.target.id]: evt.target.value});
};
    return (
        <>

          {!submitted && (
            <div class="sm col-8">
                        <br/>
                        <br/>
                        <h2>Make a new booking:</h2>
            <div class="sm col-6">
            <br/>
            <form onChange={onChange}>
              <input className="form-control" placeholder="Hotel ID" id="hotelID" />
              <br />
              <input className="form-control" placeholder="Card number" id="cardNumber" />
              <br />
              <input className="form-control" placeholder="Start date" id="startDate" />
              <br />
              <input className="form-control" placeholder="Number of nights" id="numberOfNights" />
              <br />
              <input className="form-control" placeholder="Agreed price" id="price" />
            </form>
            <br/>
            <button className="btn btn-primary" onClick={createBooking}>Submit</button> 
            </div>
            </div>
          )}

            {submitted && (
            <div class="sm col-8">
              <br/>
              <br/>
              <h2>Booking status: {messageFromServer}</h2>
              <br/>
              <button className="btn btn-primary" onClick={() => setSubmitted(false)}>Return</button> 
            </div>
            )}

        </>
    )
            }