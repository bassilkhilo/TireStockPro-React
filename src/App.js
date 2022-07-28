import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from "react";
import ListViewTable from "./components/listviewtable";
import SearchBox from "./components/searchbox";
import ProductDetailView from './components/productdetailview'
import {Modal, Button} from "react-bootstrap";


function App() {

    const [tireStock, setStockData] = useState([]);
    const [searchQuery, setSearchQuery] = useState([]);
    const sendSearchQueryToParent = (query) => {
        setSearchQuery(query);
    };

    // Detail view modal
    const [showDetailViewModal, setDetailViewModal] = useState(false);
    const handleClose = () => setDetailViewModal(false);
    const handleShow = () => setDetailViewModal(true);

    // Get pk of averaged data object to then fetch detailed data relating to brand and product code to modal
    const [getAvgObjPk, setDetailedData] = useState([]);
    const sendAvgObjPkToParent = (avgObjPk) => {
        setDetailedData(avgObjPk);
    };

    //Detailed data of averaged data
    const [detailedStockData, setDetailedStockData] = useState([]);

    // Detailed data labels
    const [detailedStockDataLabels, setDetailedStockDataLabels] = useState([]);


    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/averaged_tire_stock/get_average_price_and_stock_availability/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token f7cf72f70effb2e02f3b2474d44eea235302291a',
            },
            body: JSON.stringify({'search_query': searchQuery}),

        })
            .then(response => response.json())
            .then(response => setStockData(response))
            .catch(error => console.log(error))
    }, [searchQuery])

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/averaged_tire_stock/get_detailed_quantity_price_list/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token f7cf72f70effb2e02f3b2474d44eea235302291a',
            },
            body: JSON.stringify({'average_obj_pk': getAvgObjPk}),

        })
            .then(response => response.json())
            .then(response => setDetailedStockData(response))
            .catch(error => console.log(error))
    }, [getAvgObjPk])

      useEffect(() => {
        fetch("http://127.0.0.1:8000/api/averaged_tire_stock/get_brand_and_product_code/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token f7cf72f70effb2e02f3b2474d44eea235302291a',
            },
            body: JSON.stringify({'average_obj_pk': getAvgObjPk}),

        })
            .then(response => response.json())
            .then(response => setDetailedStockDataLabels(response))
            .catch(error => console.log(error))
    }, [getAvgObjPk])


    return (
        <div className="App mt-5">
            <header className="container">
                <h1 className="mb-5">TireStockPro</h1>


                <SearchBox sendSearchQueryToParent={sendSearchQueryToParent}/>
                <ListViewTable stock_obj={tireStock} handleShow={handleShow}
                               sendAvgObjPkToParent={sendAvgObjPkToParent}/>


            </header>


            <Modal show={showDetailViewModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Detailed Stock View</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ProductDetailView detailed_stock_obj={detailedStockData} detailedStockDataLabels={detailedStockDataLabels}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>


        </div>
    );
}

export default App;
