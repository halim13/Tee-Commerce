import React from 'react';
import Paging from './Paging';
import Sort from './Sort';

const convertCurrency = (value) => value?.toString()?.replace(/(.)(?=(\d{3})+$)/g, '$1.') || 0

function Products({ products, page, ...rest }) {
  const productLength = products?.original?.length || 0;

  return (
    <div>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className='flex justify-between'>
            <div className="flex items-center">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                KAOS PRIA
              </h2>
              <p className="text-gray-500 ml-10">{productLength} produk</p>
            </div>
            <Sort />
          </div>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-5">
            {products?.filter?.map((product, key) => (
              <div key={key} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={
                      `https://source.unsplash.com/random/500x300?clothes,shirt,${product.nama}`
                    }
                    alt={product.nama}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={product.href} className='font-bold'>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.nama}
                      </a>
                    </h3>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    Rp {convertCurrency(product.harga)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-gray-500 ml-6">
          {`${page.min || 0} - ${page.max || 0} dari ${productLength} produk`}
        </p>
        <Paging page={page} {...rest} />
      </div>
    </div>
  );
}

export default Products;
