import React, { useState ,useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import { Form, Button, Row, Col } from 'react-bootstrap';
import './Dashboard.css'
import data from './Data.json';
import Card from 'react-bootstrap/Card';


function Dashboard() {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [bedrooms, setBedrooms] = useState('');
  const [rent, setRent] = useState('');
  const [type, setType] = useState('');
  const [bookingMessage, setBookingMessage] = useState('');
  
  const [SearchClicked, setSearchClicked] = useState(false);
  const importAll = (r) => r.keys().map(r);
const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));


  const apartmentsData = data.apartments;
  const [randomRentals, setRandomRentals] = useState([]);
  useEffect(() => {
    // Filter apartments in Bloomington
    const bloomingtonApartments = data.apartments.filter(
      (apartment) => apartment.city.toLowerCase() === 'bloomington'
    );

    // Generate 4 random numbers between 0 and the length of the bloomingtonApartments array
    const randomIndexes = [];
    while (randomIndexes.length < 4) {
      const randomIndex = Math.floor(Math.random() * bloomingtonApartments.length);
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
      }
    }

    // Select 4 random apartments from the bloomingtonApartments array
    const randomApartments = randomIndexes.map(
      (randomIndex) => bloomingtonApartments[randomIndex]
    );
    setRandomRentals(randomApartments);
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };
 const handleBedroomsChange = (event)=>{
  setBedrooms(event.target.value);

 }
 const handleRentChange = (event) => {
  setRent(event.target.value);

 }
 const handleTypeChange =(event)=> {
  setType(event.target.value);

 }
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const filteredApartments = apartmentsData.filter((apartment) => {
      const regex = /\s+/g;
      const searchInputTrimmed = searchInput.replace(regex, '');
      return (
        apartment.city.toLowerCase().trim().replace(regex, '') === searchInputTrimmed.toLowerCase() ||
        apartment.state.toLowerCase() === searchInputTrimmed.toLowerCase() ||
        apartment.zipCode.toLowerCase() === searchInputTrimmed.toLowerCase()
      );
    });

    setSearchResults(filteredApartments);
    setIsLoading(false);
    setSearchClicked(true);
  };

  const handleRentalBooking = (rentalId) => {
    const selectedRental = apartmentsData.find((rental) => rental.id === rentalId);
    setBookingMessage(`You have successfully booked ${selectedRental.name} for ${selectedRental.rent}$ per month. Enjoy your stay!`);
  };

  return (
    <div className='dashboard'>
      <h1>Welcome To Book My Nest   !</h1>
      <Container className='dashboard__container'>
        <h2>Search for Rentals</h2>
        <Form onSubmit={handleSearchSubmit}>
    <Row className='mb-3'>
      <Col>
      <label htmlFor='bedrooms' Text-align="center">Rental</label>
        <Form.Control
          type='text'
          placeholder='Enter a city, state, or ZIP code'
          value={searchInput}
          onChange={handleSearchInputChange}
        />
      </Col>
     <Button type='submit' variant='primary' align="center" >
          Search
        </Button>
        
       </Row>
 
    

    <div style={{ display: 'inline-flex', justifyContent: 'center' }}> 
        <div className='option'>
          <label htmlFor='bedrooms' text-align="center">Bedrooms:</label>
          <select id='bedrooms' value={bedrooms} onChange={handleBedroomsChange}>
            <option value=''>No min</option>
            <option value='1'>1 bed</option>
            <option value='2'>2 bed</option>
            <option value='3'>3 bed</option>
            <option value='4'>4 bed</option>
          </select>
        </div>
     
        <div className='option'  style={{ marginLeft: '5px', marginRight: '10px' }}>
          <label htmlFor='rent' text-align="center">Price</label>
          <select id='rent' value={rent} onChange={handleRentChange}>
            <option value=''>No min</option>
            <option value='800'>$800</option>
            <option value='900'>$900</option>
            <option value='1100'>$1100</option>
            <option value='1300'>$1300</option>
            <option value='1500'>$1500</option>
            <option value='1700'>$1700</option>
            <option value='greater'>$1700+</option>
          </select>
        </div>
    
        <div className='option' style={{ marginLeft: '5px', marginRight: '10px' }} >
          <label htmlFor='type'>Type:</label>
          <select id='type' value={type} onChange={handleTypeChange}>
            <option value=''>All</option>
            <option value='Apartments'>Apartments</option>
            <option value='Houses'>Houses</option>
            <option value='Condos'>Condos</option>
            <option value='Townhomes'>Townhomes</option>
          </select>
        </div>
      
      <Button type='reset' variant='primary' align="center" >
          Reset
        </Button>
        </div>
    
          </Form>
        {!SearchClicked ? (
  <div>
    <br>
    </br>

    <p align="center">Home Away From Home</p>
  </div>
) : isLoading ? (
  <p>Loading search results...</p>
) : searchResults.length > 0 ? (
  <div>
    <p>Showing {searchResults.length} results</p>
    <ul>
      {searchResults.map((result) => (
        <li key={result.id}>
          <h3>{result.name}</h3>
          <p>
            {result.address}, {result.city}, {result.state} {result.zipCode}
          </p>
          <p>
            Rent: {result.rent}, Bedrooms: {result.bedrooms}, Bathrooms:{' '}
            {result.bathrooms}
          </p>
          <p>
            Pets allowed: {result.petsAllowed ? 'Yes' : 'No'}, Parking
            available: {result.parkingAvailable ? 'Yes' : 'No'}
          </p>
          <Button onClick={() => handleRentalBooking(result.id)}>View Details</Button>
        </li>
      ))}
    </ul>
  </div>
) : (
  <div>
    <p align="center">No results</p>
  </div>
)}
{bookingMessage && <p>{bookingMessage}</p>}

        
</Container>
<Container className='user__container'>

        <h2>Explore Rentals in Bloomington</h2>
        <div className='user__rentals'>
          {randomRentals.map((rental) => (
             <div key={rental.id} className='user__rental-card'>
             <Card style={{ width: '100%' }}>
            <Card key={rental.id} style={{ width: '18rem' }}>
              <Card.Img variant='top' src={images[rental.image]} />
              <Card.Body>
                <Card.Title>{rental.name}</Card.Title>
                <Card.Text>
                  {rental.address}, {rental.city}, {rental.state} {rental.zipCode}
                </Card.Text>
                <Card.Text>Rent: {rental.rent}</Card.Text>
                <Card.Text>Bedrooms: {rental.bedrooms}</Card.Text>
                <Card.Text>Bathrooms: {rental.bathrooms}</Card.Text>
              </Card.Body>
            </Card>
            </Card>
            </div>
          ))}
        </div>
      </Container>
    <Container>
      <div className='lastline'>
        <h2>The Most Rental Listings</h2>

        <h4> Choose from over 1 million apartments, houses, condos, and townhomes for rent.</h4>

      </div>
    </Container>
    </div>
    
  );
}

export default Dashboard;
