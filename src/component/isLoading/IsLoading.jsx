import React from 'react'
import './Isloading.scss'

export const IsLoading = () => {
    return (
        <div className="is-loading-container">
            <div className="center" >
                <div className="ring"></div>
                <span>loading...</span>
            </div >
        </div>
    )
}
