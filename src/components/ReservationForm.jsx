import React from 'react'
import { Alert, Button, Col, Form, Row, Spinner } from 'react-bootstrap'

class ReservationForm extends React.Component {
    state = {
        reservation: {
            name: '',
            phone: '',
            numberOfPersons: '1',
            smoking: false,
            dateTime: '',
            specialRequests: ''
        },
        errMessage: '',
        loading: false
    }

    updateReservationField = (e) => {
        let reservation = { ...this.state.reservation } // creating a copy of the current state
        let currentId = e.currentTarget.id // 'name', 'phone', etc.

        if (currentId === 'smoking') {
            reservation[currentId] = e.currentTarget.checked
        } else {
            reservation[currentId] = e.currentTarget.value // e.currentTarget.value is the keystroke
        }
        //reservation['name'] --> reservation.name = 'S'
        //reservation['phone'] --> reservation.phone = '3'
        this.setState({ reservation: reservation })
    }

    submitReservation = async (e) => {
        e.preventDefault();
        this.setState({ loading: true })
        try {
            let response = await fetch('https://striveschool.herokuapp.com/api/reservation',
                {
                    method: 'POST',
                    body: JSON.stringify(this.state.reservation),
                    headers: new Headers({
                        "Content-Type": "application/json"
                    })
                })
            if (response.ok) {
                alert('Reservation saved!')
                this.setState({
                    reservation: {
                        name: '',
                        phone: '',
                        numberOfPersons: '1',
                        smoking: false,
                        dateTime: '',
                        specialRequests: ''
                    },
                    errMessage: '',
                    loading: false,
                })
            } else {
                console.log('an error occurred')
                let error = await response.json()
                this.setState({
                    errMessage: error.message,
                    loading: false,
                })
            }
        } catch (e) {
            console.log(e) // Error
            this.setState({
                errMessage: e.message,
                loading: false,
            })
        }
    }

    render() {
        
        if(!this.state.errMessage){
            return (
                <div>
                    
                    {
                        this.state.loading && (
                            <div className="d-flex justify-content-center my-5">
                                Reserving your table, please wait
                                <div className="ml-2">
                                    <Spinner animation="border" variant="success" />
                                </div>
                            </div>
                        )
                    }
                    
                </div>
            ) 
        }else{
            return (<Alert variant="danger">
            We encountered a problem with your request
            {this.state.errMessage}
        </Alert>) 
        }
        
    }
}

export default ReservationForm