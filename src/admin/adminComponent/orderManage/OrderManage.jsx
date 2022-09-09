import { CancelOutlined, Check, DeleteOutline, Edit } from '@material-ui/icons'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import NumberFormat from 'react-number-format'
import { cancelOrder, deleteOrder, getAllOrdersService } from '../../../service/userService'
import './OrderManage.scss'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import moment from 'moment';
import { confirmOrder } from '../../../service/userService'
import { toast } from 'react-toastify'
import Select from 'react-select';
import { useSelector } from 'react-redux'

export const OrderManage = () => {
    let accessToken = useSelector((state => state.auth.login.userInfor?.accessToken))
    console.log(accessToken)
    let [count, setCount] = useState(1)
    //Modal see Detail ORder
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    //Modal Confirm CRUD
    const [modalCRUD, setModalCRUD] = useState(false);
    const toggleCRUD = () => setModalCRUD(!modalCRUD);

    let [allOrders, setAllOrders] = useState([])

    // Build select options BEGIN:
    const [selectedStatus, setSelectedStatus] = useState()
    const options =
        [
            { value: 'all', label: 'Tất cả' },
            { value: 'pending', label: 'Chưa xác nhận' },
            { value: 'confirmed', label: 'Đã xác nhận ' },
            { value: 'cancelled', label: 'Đã hủy' }

        ]
    // Build select options END.
    useEffect(() => {
        let getOrders = async () => {
            let res = await getAllOrdersService()
            if (res && res.data && res.errCode === 0) {
                let dataOrder = res.data
                setAllOrders(dataOrder.reverse())
                if (selectedStatus.value === 'all') {
                    setAllOrders(dataOrder.reverse())
                }
                if (selectedStatus.value === 'pending') {
                    let newDataOrder = dataOrder.filter((item, index) =>
                        item.status === 'pending'
                    )
                    setAllOrders(newDataOrder.reverse())
                }
                if (selectedStatus.value === 'confirmed') {
                    let newDataOrder = dataOrder.filter((item, index) =>
                        item.status === 'confirmed'
                    )
                    setAllOrders(newDataOrder.reverse())
                }
                if (selectedStatus.value === 'cancelled') {
                    let newDataOrder = dataOrder.filter((item, index) =>
                        item.status === 'cancelled'
                    )
                    setAllOrders(newDataOrder.reverse())
                }
            }
        }
        getOrders()

    }, [selectedStatus, count])


    // see infor Order BEGIN:
    let [inforOrder, setInforOrder] = useState({})

    let handleOpenToggle = (data) => {
        setInforOrder(data)
        toggle()
    }
    // see infor Order END.

    //CRUD ORDER BEGIN

    let handleConfirm = async (id) => {
        setCount(++count)
        let res = await confirmOrder(id, accessToken)
        if (res && res.errCode === 0) {
            toast.success('confirm succeed!')
        }
        else {
            toast.error('confirm failed')
        }
    }

    let handleCancel = async (id) => {
        setCount(++count)
        let res = await cancelOrder(id, accessToken)
        if (res && res.errCode === 0) {
            toast.success('cancel order succeed!')
        }
        else {
            toast.error('cancel order failed')
        }
    }


    let handleDelete = async (id) => {
        setCount(++count)
        let res = await deleteOrder(id, accessToken)
        if (res && res.errCode === 0) {
            toast.success('delete order succeed!')
        }
        else {
            toast.error('delete order failed')
        }
    }
    let [idWillBeAction, setIdWillBeAction] = useState()
    let [nameHandle, setNameHandle] = useState('')
    let openModalCRUD = (id, name) => {
        toggleCRUD()
        setNameHandle(name)
        setIdWillBeAction(id)
    }

    let handleCRUD = () => {
        console.log('check name', nameHandle)
        console.log('check id', idWillBeAction)

        if (nameHandle === 'confirm') { handleConfirm(idWillBeAction) }
        if (nameHandle === 'cancel') { handleCancel(idWillBeAction) }
        if (nameHandle === 'delete') { handleDelete(idWillBeAction) }

    }

    //CRUD ORDER END.


    return (
        <div className='order-manage-container'>
            <Select
                className='select-container'
                placeholder="Tình trạng đơn hàng"
                defaultValue='all'
                onChange={setSelectedStatus}
                options={options}
            />

            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Ngày đặt hàng</th>
                        <th scope="col">Tên khách hàng</th>
                        <th scope="col">Số điện thoại</th>
                        <th scope="col">Email</th>
                        <th style={{ width: '20%' }} scope="col">Địa chỉ</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Tổng Tiền</th>
                        <th scope="col">Thông tin đơn hàng</th>
                        <th style={{ textAlign: 'center' }} scope="col">Xử lý</th>
                    </tr>
                </thead>
                <tbody>
                    {allOrders && allOrders.length > 0 && allOrders.map((item, index) => {
                        return (<tr key={index}>
                            <td> {index + 1}</td>
                            <td>{moment(item.createdAt).format(' hh:mm, DD/MM/YYYY  ')} </td>
                            <td>{item.nameCustomer} </td>
                            <td>{item.phoneNumber}</td>
                            <td>{item.emailCustomer}</td>
                            <td> {item.address}</td>
                            {/* <td> {item.note} </td> */}
                            <td> {item.quantity} </td>
                            <td>
                                <NumberFormat
                                    value={item.total}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'đ'} />
                            </td>
                            <td> <button
                                onClick={() => { handleOpenToggle(item) }} className='btn btn-info'>Details..</button> </td>
                            <td> {item.status === 'pending' && <button onClick={() => openModalCRUD(item._id, 'confirm')} className='btn btn-primary' > <Check /> </button>} </td>
                            <td> <button className='btn btn-warning' > <Edit /> </button> </td>
                            <td> {item.status !== 'cancelled' && <button onClick={() => openModalCRUD(item._id, 'cancel')} className='btn btn-secondary'> <CancelOutlined /> </button>} </td>
                            <td> <button onClick={() => openModalCRUD(item._id, 'delete')} className='btn btn-danger'> <DeleteOutline /> </button> </td>




                        </tr>)
                    })
                    }
                </tbody>
            </table>


            {/* Modal see detail order */}
            <div >
                <Modal isOpen={modal} toggle={toggle} size='xl' fullscreen='l' centered={true}>
                    <ModalHeader toggle={toggle}>Chi tiết đơn hàng:</ModalHeader>
                    <ModalBody>
                        <div className="body-container">
                            <div className="content-left">
                                <div className="time-order">
                                    <span> Ngày đặt hàng:</span>   {moment(inforOrder.createdAt).format(' hh:mm, DD/MM/YYYY  ')}
                                </div>
                                <div className="name">
                                    <span> Họ và tên:</span> {inforOrder.nameCustomer}
                                </div>
                                <div className="phone-number">
                                    <span>Số điện thoại:</span>      {inforOrder.phoneNumber}
                                </div>
                                <div className="email">
                                    <span>email:</span>       {inforOrder.emailCustomer}
                                </div>
                                <div className="address">
                                    <span>Địa chỉ nhận hàng:</span>       {inforOrder.address}
                                </div>
                                <div className="note">
                                    <span>  Ghi chú:</span>    {inforOrder.note}
                                </div>
                                <div className="status">
                                    <span> Trạng thái :</span>    {inforOrder.status === 'pending' ? 'Chưa xác nhận' : "Đã xác nhận"}</div>
                            </div>
                            <div className="content-right">

                                {inforOrder.arrProduct && inforOrder.arrProduct.length > 0 && inforOrder.arrProduct.map((item, index) => {
                                    return (
                                        <div key={index} className="product-box">
                                            <div style={{ backgroundImage: `url(${item.image})` }} className="image"></div>
                                            <div className="conten-box">
                                                <div className="top-box">
                                                    <div className='title'>{item.productTitle} {item.productCode}</div>
                                                </div>
                                                <div className="desciption"> {item.description}</div>
                                                <div className="footter-box">
                                                    <div className="quantity">{item.quantity}</div>
                                                    <div className="price">
                                                        <NumberFormat
                                                            value={item?.price}
                                                            displayType={'text'}
                                                            thousandSeparator={true}
                                                            suffix={'đ'} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                                }
                                <div className="sub-total">
                                    Tổng tiền:   <NumberFormat
                                        value={inforOrder.total}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'đ'} />

                                </div>
                            </div>

                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => {
                            handleConfirm(inforOrder._id)
                            toggle()
                        }} color="primary" >
                            Xác Nhận
                        </Button>{' '}
                        <Button color="secondary" onClick={toggle}>
                            Hủy
                        </Button>
                    </ModalFooter>
                </Modal>


            </div>
            <div className='modal-crud-container'>
                <Modal isOpen={modalCRUD} toggleCRUD={toggleCRUD} size='sm' fullscreen='sm' >
                    <ModalBody>
                        Bạn chắc chắn muốn {nameHandle} đơn hàng?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => {
                            handleCRUD()
                            toggleCRUD()
                        }}>
                            Xác nhận
                        </Button>{' '}
                        <Button color="secondary" onClick={toggleCRUD}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>

        </div>
    )
}
