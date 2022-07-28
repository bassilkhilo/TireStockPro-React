import React, {Component} from 'react'

class ListViewTable extends Component {

    state = {
        avg_obj_pk: 0,
    }


    render() {



        const showDetailViewModal = (event, dataId) => {
            this.props.handleShow();
            this.setState({avg_obj_pk: dataId});
            this.props.sendAvgObjPkToParent(dataId);

        };

        function isEmptyObject(obj) {
            return !obj.length;
        }

        return (
            <table className="table table-striped">
                <thead>
                <th>Brand</th>
                <th>Product Code</th>
                <th>Available Quantity</th>
                <th>Average Price</th>
                </thead>
                <tbody>
                {isEmptyObject(this.props.stock_obj) ? "" : (
                    this.props.stock_obj.map(stock => {
                        return (
                            <tr className="search-tr" onClick={event => showDetailViewModal(event, stock.id)}>
                                <td>{stock.brand_name}</td>
                                <td>{stock.product_code}</td>
                                <td>{stock.total_available_quantity}</td>
                                <td>${stock.average_price_in_usd}</td>
                            </tr>
                        )
                    })
                )}


                </tbody>

            </table>
        )
    }
}

export default ListViewTable