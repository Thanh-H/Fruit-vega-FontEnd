import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function Example(args) {
    const [modalCRUD, setModalCRUD] = useState(false);

    const toggleCRUD = () => setModalCRUD(!modalCRUD);

    return (
        <div className='modal-crud-container'>
            <Modal isOpen={modalCRUD} toggleCRUD={toggleCRUD} size='sm' fullscreen='sm' >
                <ModalHeader toggleCRUD={toggleCRUD}></ModalHeader>
                <ModalBody>

                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggleCRUD}>
                        Xác nhận
                    </Button>{' '}
                    <Button color="secondary" onClick={toggleCRUD}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default Example;