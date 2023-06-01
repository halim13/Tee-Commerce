import './App.css'
import Header from './components/Header'
import Body from './components/Body'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Loading from './components/Loading'

const URL = 'https://646f0ae509ff19b1208674bc.mockapi.io/product'

function App() {
    const [products, setProducts] = useState({
        original: [],
        filter: [],
    })
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState('idle')
    const [errorMessage, setErrorMessage] = useState('')
    const [page, setPage] = useState({
        limit: 6,
        size: 0,
        current: 1,
        numberOfPages: 1,
        min: 0,
        max: 0,
    })

    useEffect(() => {
        fetchData()
        return () => null
    }, [])
    
    const fetchData = async () => {
        try {
            setErrorMessage('')
            setLoading(true)
            setStatus('fetching')
            const { data } = await axios.get(URL)
            
            setProducts(() => ({
                filter: data.slice(0, page.limit),
                original: data,
            }))
            setCurrentPage(1, data)
            setLoading(false)
            setStatus('ready')
        } catch (error) {
            console.log({error})
            setLoading(false)
            setStatus('error')
            setErrorMessage(error)
        }
    }

    const setCurrentPage = async(curr, prod) => {
        const data = prod || products.original
        const numberOfPages = Math.ceil(data.length / page.limit)
        const minSize = ((curr || page.current) - 1) * page.limit
        const maxSize = minSize + page.limit
        const dataLength = data.length

        setPage(p => ({
            ...p,
            current: curr ? curr : p.current,
            size: dataLength || 0,
            numberOfPages,
            min: !!dataLength ? minSize + 1 : 0,
            max: maxSize > dataLength ? dataLength : maxSize,
        }))
        return ({ minSize, maxSize })
    }

    const setCurrentProduct = (min, max) => {
        setProducts(p => ({
            ...p,
            filter: products.original.slice(min, max)
        }))
    }
    const nextPage = async() => {
        const {minSize, maxSize} = await setCurrentPage(page.current + 1)
        setCurrentProduct(minSize, maxSize)
    }
    const prevPage = async() => {
        const {minSize, maxSize} = await setCurrentPage(page.current - 1)
        setCurrentProduct(minSize, maxSize)
    }
    const setPages = async(p) => {
        const {minSize, maxSize} = await setCurrentPage(p)
        setCurrentProduct(minSize, maxSize)
    }

    if (loading) {
        return (
            <div className="justify-center items-center">
                <Loading />
            </div>
        )
    }

    return (
        <div>
            <Header />
            <Body products={products} page={page} nextPage={nextPage} prevPage={prevPage} setPages={setPages} />
        </div>
    )
}

export default App
