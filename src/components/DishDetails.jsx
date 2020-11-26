import React from 'react'
import { Badge, Card, Col, Container, Row } from 'react-bootstrap'
import { DishComments } from './DishComments'
import allTheDishes from '../data/menu.json'

class DishDetails extends React.Component {
    state = {
        dish: null
    }

    componentDidMount() {
        let dishIdFromTheSearchBar = this.props.match.params.stefano;
        let correctDishToLoad = allTheDishes.find(dish => dish.id.toString() === dishIdFromTheSearchBar)
        this.setState({
            dish: correctDishToLoad
        })
    }

    render() {
        return (
            <Container>
                {this.state.dish &&
                    <div>
                        <Row className="my-2">
                            <Col md={3}>
                                <img src={'/' + this.state.dish.image} alt="dish" className="img-fluid" />
                            </Col>
                            <Col md={9}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{this.state.dish.name}</Card.Title>
                                        <Card.Subtitle>
                                            <Badge variant="danger">{this.state.dish.label}</Badge>
                                        </Card.Subtitle>
                                        <Card.Text>
                                            {this.state.dish.description}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <DishComments selectedDish={this.state.dish} />
                    </div>}
                {!this.state.dish && <h1>LOADING</h1>}
            </Container>
        )
    }
}

export default DishDetails