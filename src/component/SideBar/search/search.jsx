import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './Search.scss'

export const Search = (props) => {
    let { handleCloseSideBarFromParent } = props
    let handleCloseSideBar = () => {
        handleCloseSideBarFromParent('close')
    }

    return (
        <div className="search-container">
            <div className="top-content">
                <div className='search-block'>
                    <span className='search-title'>TÌM KIẾM</span>
                    <span onClick={() => handleCloseSideBar()} className='close'>X</span>
                </div>
            </div>
            <div className="center-content">
                <input className="center-content-top" />
                <i> <FontAwesomeIcon icon={faMagnifyingGlass} /> </i>
            </div>
        </div>
    )
}
