import React from 'react';
import SideBar from './SideBar';
import Products from './Products';

function Body({ products, page, ...rest }) {
    return (
        <div className="mt-6 flex container mx-auto justify-center">
            <SideBar />
            <Products products={products} page={page} {...rest} />
        </div>
    );
}

export default Body;
