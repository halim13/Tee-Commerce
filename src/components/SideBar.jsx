import React, { Fragment, useEffect, useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';

const defaultFilters = [
  {
    id: 'size',
    name: 'Ukuran',
    type: 'checkbox',
    options: [
      { value: 'xs', label: 'XS', checked: false },
      { value: 's', label: 'S', checked: false },
      { value: 'm', label: 'M', checked: false },
      { value: 'l', label: 'L', checked: false },
      { value: 'xl', label: 'XL', checked: false },
    ],
  },
  {
    id: 'color',
    name: 'Warna',
    type: 'color',
    options: [
      { value: 'merah', label: 'Merah', color: '#FF2536', checked: false },
      { value: 'hitam', label: 'Hitam', color: '#323232', checked: false },
      { value: 'white', label: 'Putih', color: '#FFFFFF', checked: false },
      { value: 'abu abu', label: 'Abu-abu', color: '#626067', checked: false },
      { value: 'hijau', label: 'Hijau', color: '#5DB63E', checked: false },
      { value: 'biru', label: 'biru', color: '#1C5CD8', checked: false },
      { value: 'biru muda', label: 'Biru Muda', color: '#C9E0FF', checked: false },
      { value: 'cream', label: 'Krem', color: '#FBE2C5', checked: false },
      { value: 'kuning', label: 'Kuning', color: '#FFE86F', checked: false },
      { value: 'orange', label: 'Orange', color: '#FF8B37', checked: false },
      { value: 'ungu', label: 'Ungu', color: '#A44ED9', checked: false },
    ],
  },
  {
    id: 'brand',
    name: 'Brand',
    type: 'checkbox',
    options: [
      { value: '3-second', label: '3Second', checked: false },
      { value: 'adidas', label: 'ADIDAS', checked: false },
      {
        value: 'abercrombie-fitch',
        label: 'Abercrombie & Fitch',
        checked: false,
      },
      { value: 'boss', label: 'BOSS', checked: false },
      { value: 'celciusmen', label: 'Celciusmen', checked: false },
      { value: 'hnm', label: 'H&M', checked: false },
      { value: 'hollister', label: 'Hollister', checked: false },
      { value: 'jack-jones', label: 'Jack & Jones', checked: false },
      { value: 'levis', label: 'Levi’s', checked: false },
      { value: 'Tolliver', label: 'Tolliver', checked: false },
      { value: 'Trendyol', label: 'Trendyol', checked: false },
      { value: 'Under Armour', label: 'Under Armour', checked: false },
      { value: 'VANS', label: 'VANS', checked: false },
    ],
  },
]

function SideBar() {
  const [checked, setChecked] = useState(0)
  const [filters, setFilters] = useState(defaultFilters)

  const filterInput = (key, id, value) => {
    const filter = filters.reduce((acc, curr) => {
      let current = curr
      if (current.id === key) {
        current.options = current.options.map((map, i) => ({ ...map, checked: map.value === id ? value : map.checked }))
      }
      return [...acc, current]
    }, [])
    setFilters(filter)
    setChecked(filter.reduce((acc, curr) => [...acc, ...curr.options], []).filter(fil => !!fil.checked).length)
  }

  return (
    <div>
      <div className="border rounded-lg shadow-lg" style={{ minWidth: 250 }}>
        <div className="overflow-y-auto overflow-x-hidden flex-grow p-5">
          <h3 className='text-black font-bold border-b pb-2'>Filter ({checked})</h3>
          {filters.map((section) => (
            <Disclosure defaultOpen
              as="div"
              key={section.id}
              className="py-3"
            >
              {({ open }) => (
                <>
                  <h3 className="-my-3 flow-root">
                    <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                      <span className="font-bold text-gray-900">
                        {section.name}
                      </span>
                      <span className="ml-6 flex items-center">
                        {open ? (
                          <ChevronUpIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        ) : (
                          <ChevronDownIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                    </Disclosure.Button>
                  </h3>
                  <Disclosure.Panel className="pt-2">
                    <div className="space-y-4">
                      {
                        section.type === 'color' ? <div className='flex flex-wrap flex-grow' style={{ maxWidth: 250 }}>
                          {
                            section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center mr-4 mb-2">
                                <input
                                  type="checkbox"
                                  id={`react-option${optionIdx}`}
                                  className="hidden peer"
                                  onChange={(e) => filterInput(section.id, option.value, e.target.checked)}
                                  checked={option.checked}
                                />
                                <label htmlFor={`react-option${optionIdx}`} className="inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border-2 border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                  <div className="flex items-center">
                                    <div style={{ backgroundColor: option.color }} className='w-4 h-4 border-2 mr-2' />
                                    <label
                                      htmlFor={`react-option${optionIdx}`}
                                      className="ml-1 text-sm text-gray-600"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                </label>
                              </div>
                            ))
                          }
                        </div> : section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              id={`filter-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              defaultValue={option.value}
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              onChange={(e) => filterInput(section.id, option.value, e.target.checked)}
                              checked={option.checked}
                            />
                            <label
                              htmlFor={`filter-${section.id}-${optionIdx}`}
                              className="ml-3 text-sm text-gray-600"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))
                      }
                    </div>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
