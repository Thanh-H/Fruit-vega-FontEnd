import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { getAllProductService } from '../../service/userService'

export const HeaderSearch = () => {
    let [filterProduct, setFilterProduct] = useState()
    let [searchWord, setSearchword] = useState()
    useEffect(() => {
        let getAllProduct = async () => {
            let res = await getAllProductService()
            if (res && res.errCode === 0) {
                let allProducts = res.data
                let newFilter = allProducts.filter((item, index) => {
                    return item.productTitle.toLowerCase().includes(searchWord.toLowerCase())
                })
                setFilterProduct(newFilter)
            }
        }
        getAllProduct()
    }, [searchWord])

    return (
        <>
            <input onChange={(e) => setSearchword(e.target.value)} className='search-center' type="text" />
            <div className="icon-glass">
                <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
            </div>
        </>
    )
}
