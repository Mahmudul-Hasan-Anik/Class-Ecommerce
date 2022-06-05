import React,{useState,useEffect} from 'react';
import { Helmet } from 'react-helmet-async';
import { Modal,Button, Container,Nav, Row, Col,Card} from 'react-bootstrap';
import axios from 'axios';
import BasicRating from './Rating';
import { Link } from 'react-router-dom';

const Home = () => {
  const [showImage, setShowImage] = useState('');
  const [showCatagory, setShowCatagory] = useState([]);
  const [showCatagoryProduct, setShowCatagoryProduct] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const catagoryArray = []
  useEffect(async()=>{
    setShow(false)

    // const {data} = await axios.get(`/discount`)
    // setShowImage(data.img)

    const product = await axios.get(`/product`)
    product.data.map((item)=>{
      if(catagoryArray.indexOf(item.catagory) == -1){
        const a = catagoryArray.push(item.catagory)
      }
    })
    setShowCatagory(catagoryArray)
  },[])

  const handleCatagory = async(item)=>{
    const {data} = await axios.get(`/catagory/${item}`)
    setShowCatagoryProduct(data)
  }

  return(
    <>
    <Helmet>
        <title>Any Mart</title>
    </Helmet>

    <div className="catagory-image">
     <Container >
      <Nav className="flex-column" style={{width:'200px',height:'400px',background:'white'}}>
        {showCatagory.map((item)=>(
          <>
        <Nav.Link onClick={()=>handleCatagory(item)}className='navListStyle'>{item}</Nav.Link>
        
        </>
        ))}
      </Nav>
     </Container>
    </div>
  
  {/* MODEL SHOW AFTER LOADING */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>OFFERS</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={showImage} alt="" style={{width:'100%'}}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>

     <Container style={{marginTop:'50px'}}>
      <Row lg={4}>
        {showCatagoryProduct.map((item)=>(
        <Col className='mb-4'>
        <Card >
          <Link to={`/product/${item.slug}`}>
            <Card.Img variant="top" src={item.image} />
          </Link> 
            <Card.Body>
                <Card.Title>
          <Link to={`/product/${item.slug}`}>
                  {item.name}
          </Link>
                </Card.Title>
                <Card.Text>
                  <BasicRating rating={item.rating} nameOfRating={item.nameOfRating}/>
                </Card.Text>
                <Card.Text>
                {item.desciption}
                </Card.Text>
                <Card.Text>
                {item.price}$
                </Card.Text>
            </Card.Body>
        </Card>
        
        </Col>
        ))}
      </Row>
     </Container>
    </>
  );
};

export default Home;
