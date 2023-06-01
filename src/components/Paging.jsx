import React from 'react';

function Paging({ page, nextPage, prevPage, setPages }) {
  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px">
          <li>
            <a
              onClick={() => prevPage()}
              href="#"
              className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Kembali
            </a>
          </li>
          {
            !!page.numberOfPages && [...Array(page.numberOfPages).keys()].map(map => <li key={map}>
              <a
                href="#"
                onClick={() => setPages(map+1)}
                className={`${page.current === map+1 ? 'text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700  dark:bg-gray-700 dark:text-white' : 'leading-tight text-gray-500 bg-white  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'} px-3 py-2 border border-gray-300 dark:border-gray-700`}
              >
                {map+1}
              </a>
            </li>)
          }
          <li>
            <a
              href="#"
              onClick={() => page.current >= page.numberOfPages ? {} : nextPage()}
              className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Lanjut
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Paging;
