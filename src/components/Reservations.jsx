import React from 'react'
import { Container, ListGroup, Spinner } from 'react-bootstrap'
import ReservationForm from './ReservationForm'

class Reservations extends React.Component {

    state = {
        reservations: [],
        loading: true
    }

    // componentWillUnmount fires an instant before unmounting

    //lifecycle method that is going to be triggered just once after initial loading
    componentDidMount = async () => {
        try {
            let response = await fetch("https://striveschool.herokuapp.com/api/reservation")
            let reservations = await response.json()
            this.setState({ reservations: reservations, loading: false })
        } catch (e) {
            console.log("error happened, that's life", e)
            this.setState({ loading: false })
        }
    }


    render() {

        console.log('IN THE RENDER METHOD')

        return (
            <Container>
                <div className="mb-5">
                    <h2>RESERVATIONS</h2>
                    {
                        this.state.loading && (
                            <div className="font-bold d-flex justify-content-center">
                                <span>Feching reservations</span>
                                <Spinner animation="border" variant="success" />
                            </div>
                        )
                    }
                    {this.state.reservations.map((reservation, index) => (
                        <ListGroup key={index}>
                            <ListGroup.Item>
                                Name: {reservation.name}, for {reservation.numberOfPersons}
                            at {reservation.dateTime}
                            </ListGroup.Item>
                        </ListGroup>
                    ))}
                    <ReservationForm />
                </div>
            </Container>
        )
    }
}

export default Reservations