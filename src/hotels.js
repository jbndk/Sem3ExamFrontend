import mainURL from "./settings";
import facade from "./apiFacade";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from 'react';


const GetAllHotels = () => {

    const [hotelDataAll, setHotelDataAll] = useState("");
    const [hotelDataSingle, setHotelDataSingle] = useState("");
    const [showDataAll, setShowDataAll] = useState(false);
    const [showDataSingle, setShowDataSingle] = useState(false);
    const [hotelID, setHotelID] = useState("");
    const [showHideDescription, setShowHideDescription] = useState(false);

const fetchAllHotels = (evt) => {
        let options = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            'Accept': 'application/json',
        }
    }

    fetch(mainURL + "/api/hotel/all", options)
        .then(facade.handleHttpErrors)
        .then((res) => {
            setShowDataSingle(false);
            setHotelDataAll(res.hotels);
            setShowDataAll(true);
        }).catch((error) => {
          error.fullError.then((err) => {
            console.log("Error: ", err);
          })
        })
    }

    const fetchSpecificHotel = (evt) => {
        evt.preventDefault();
        let options = {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                'Accept': 'application/json',
            }
        }
    
        fetch(mainURL + "/api/hotel/" + hotelID, options)
            .then(facade.handleHttpErrors)
            .then((res) => {
                setShowDataAll(false);
                setHotelDataSingle(res);
                setShowDataSingle(true);
            }).catch((error) => {
              error.fullError.then((err) => {
                console.log("Error: ", err);
              })
            })
    }
    
    const onChange = (evt) => {
        setHotelID(evt.target.value)
        }

    const showHide = () => {
            if(showHideDescription) {
                setShowHideDescription(false);
            } else {
                setShowHideDescription(true);
            }
        }


    return (
        <div>
            <br />
            <h2>All hotels</h2>
            <br />
            <div className="col-sm-4">
            <button className="btn btn-primary" onClick={fetchAllHotels}>See all hotels</button>
            <br/><br/>
            <div class="form-inline">
            <form onChange={onChange} >
            <input className="form-control" placeholder="Hotel ID here" id="hotelidinput" />
            <button className="btn btn-primary" onClick={fetchSpecificHotel}>Look up by ID</button>
            </form>
            </div>
            </div>

            <br/><br/>

            {showDataAll && (             

                <div className="container-align-left">

                <button className="btn btn-primary" onClick={showHide}>Show/hide description</button>

                <div className="row">
                <div className="col-sm-10">
                <div className="list-group">


                        <br></br>

                        <table className="table">

                            <th>ID</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Phone</th>
                            {showHideDescription && (
                            <th>Description</th>
                            )}
                            <th>Price</th>
                                
                            {hotelDataAll.map((hotel, index) => {
                                return (
                                <tr key={index}>
                                <td>{hotel.id}</td>
                                <td>{hotel.name}</td>
                                <td>{hotel.address}</td>
                                <td>{hotel.phone}</td>
                                {showHideDescription && (
                                <td>{hotel.content}</td>
                                )}
                                <td>{hotel.price}</td>
                                </tr>
                                )
                            })}

                        </table>
                        </div>
                        </div>
                        </div>
                        </div>
                )}

                {showDataSingle && (

                <div className="container-align-left">

                <button className="btn btn-primary" onClick={showHide}>Show/hide description</button>

                <div className="row">
                <div className="col-sm">
                <div className="list-group">
                        
                        <br></br>

                        <table className="table">

                            <th>ID</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Phone</th>
                            {showHideDescription && (
                            <th>Description</th>
                            )}
                            <th>Price</th>
                                
                                <tr>
                                <td>{hotelDataSingle.id}</td>
                                <td>{hotelDataSingle.name}</td>
                                <td>{hotelDataSingle.address}</td>
                                <td>{hotelDataSingle.phone}</td>
                                {showHideDescription && (
                                <td>{hotelDataSingle.content}</td>
                                )}
                                <td>{hotelDataSingle.price}</td>
                                </tr>    

                        </table>
                        </div>
                        </div>
                        </div>
                        </div>
                )}
            
        </div>
    )
}

export default GetAllHotels;