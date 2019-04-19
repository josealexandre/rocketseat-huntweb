import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

import "./styles.css";

export default class Main extends Component {
    state = {
        products: [],
        productInfo: {},
        page: 1
    };

    componentDidMount() {
        this.loadProducts();
    }

    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);

        const { docs, ...productInfo } = response.data;

        console.log(response.data);
        this.setState({ products: docs, productInfo });
    };

    prevPage = () => {
        if (this.state.page === 1) return;

        const page = this.state.page - 1;
        this.setState({ page });
        this.loadProducts(page);
    };

    nextPage = () => {
        if (this.state.page === this.state.productInfo.pages) return;

        const page = this.state.page + 1;
        this.setState({ page });
        this.loadProducts(page);
    };

    render() {
        const { products, page, productInfo } = this.state;

        return (
            <div className="products-list">
                {products.map(product => (
                    <article key={product._id}>
                        <strong>{product.title}</strong>
                        <p>{product.description}</p>
                        <Link to={`/products/${product._id}`}>Acessar</Link>
                    </article>
                ))}
                <div className="pages">
                    <button disabled={page === 1} onClick={this.prevPage}>
                        Anterior
                    </button>
                    <button
                        disabled={page === productInfo.pages}
                        onClick={this.nextPage}
                    >
                        Próximo
                    </button>
                </div>
            </div>
        );
    }
}
