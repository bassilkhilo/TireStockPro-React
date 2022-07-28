import React, {Component} from 'react'

class ProductDetailView extends Component {

    render() {


        function isEmptyObject(obj) {
            return !obj.length;
        }


        return (

            <div className="">
                <p className="mb-0"><b>Brand</b>: {this.props.detailedStockDataLabels.brand_name}</p>
                <p><b>Product Code</b>: {this.props.detailedStockDataLabels.product_code}</p>
                <table className="table table-striped table-sm">
                    <thead>
                    <th>Source</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    </thead>
                    <tbody>
                    {isEmptyObject(this.props.detailed_stock_obj) ? "" : (
                        this.props.detailed_stock_obj.map(stock => {
                            return (
                                <tr className="search-tr">
                                    <td>{stock.client_id}</td>
                                    <td>{stock.available_quantity}</td>
                                    <td>${stock.price_in_usd}</td>
                                </tr>
                            )
                        })
                    )}


                    </tbody>

                </table>
            </div>


        )
    }
}

export default ProductDetailView