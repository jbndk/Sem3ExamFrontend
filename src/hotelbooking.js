import mainURL from "./settings";
import facade from "./apiFacade";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from 'react';


const BookHotel = () => {

    const [hotelData, setHotelData] = useState("");
    const [showAllHotels, setShowAllHotels] = useState(false);
    const [searchHotel, setSearchHotel] = useState(false);
    const [keyword, setKeyword] = useState("");

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
            setHotelData(res.hotels);
            setShowAllHotels(true);
        }).catch((error) => {
          error.fullError.then((err) => {
            console.log("Error: ", err);
          })
        })
    }

    const onChange = (evt) => {
    setKeyword(evt.target.value)
    }

    const performHotelSearch = (evt) => {
        console.log(hotelData);
        console.log(keyword);
        setShowAllHotels(false);
        setSearchHotel(true);
    }


    return (
        <div class="sm col-8">
            <br />
            <h2>Book hotel</h2>
            <br />
            <div className="col-sm-4">
            <button className="btn btn-primary" onClick={fetchAllHotels}>See all hotels</button>
            
            <form onChange={onChange} >
            <input className="form-control" placeholder="Write keyword here" id="keyword" />
            <br />
            <button className="btn btn-primary" onClick={performHotelSearch, fetchAllHotels}>Search</button>
            </form>
            
            </div>

            <br /><br />

            {showAllHotels && (

                <div className="container-align-left">
                <div className="row">
                <div className="col-sm">
                <div className="list-group">
                        
                        <br></br>

                        <table className="table">

                            <th>ID</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Description</th>
                            <th>Price</th>
                                
                            {hotelData.map((hotel, index) => {
                                return (
                                <tr key={index}>
                                <td>{hotel.id}</td>
                                <td>{hotel.name}</td>
                                <td>{hotel.address}</td>
                                <td>{hotel.phone}</td>
                                <td>{hotel.content}</td>
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

            {searchHotel && (

                <div className="container-align-left">
                <div className="row">
                <div className="col-sm">
                <div className="list-group">
                        
                        <br></br>

                        <table className="table">

                            <th>ID</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Description</th>
                            <th>Price</th>
                                
                            {hotelData.map((hotel, index) => {
                                return (
                                <tr key={index}>
                                    <td>{hotel.id}</td>
                                    <td>{hotel.name}</td>
                                    <td>{hotel.address}</td>
                                    <td>{hotel.phone}</td>
                                    <td>{hotel.content}</td>
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
            
        </div>
    )
}

export default GetAllHotels;