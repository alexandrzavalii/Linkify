import React, { Component } from 'react'
import Swiper from 'react-native-deck-swiper'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import Settings from '../Settings/Settings';
import Card from './Card';
import { saveSwipedCard, cardSwipedRight, cardSwipedLeft } from '../../api/firebase';

export default class Tinder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            swipeDirection: '',
            isSwipingBack: false,
            cardIndex: 0
        }
        this.onSwipedLeft = this.onSwipedLeft.bind(this);
        this.onSwipedRight = this.onSwipedRight.bind(this);        
    }

    componentDidMount() {
        console.log("this", this.props);
    }

    renderCard = (person) =>
        <Card
            {...person}
            index={this.props.cards.indexOf(person)}
            swipeRight={this.swipeRight}
            swipeLeft={this.swipeLeft}
            totalNumber={this.props.cards.length}
        />

    swipeBack = () => {
        if (!this.state.isSwipingBack) {
            this.setIsSwipingBack(true, () => {
                this.swiper.swipeBack(() => {
                    this.setIsSwipingBack(false)
                })
            })
        }
    };

    setIsSwipingBack = (isSwipingBack, cb) => {
        this.setState(
            {
                isSwipingBack: isSwipingBack
            },
            cb
        )
    };

    swipeLeft = () => {
        this.swiper.swipeLeft()
    };

    swipeRight = (index) => {
        this.swiper.swipeRight()
    }

    onSwipedLeft(index) {
        // saveSwipedCard(this.props.cards[index].clientID, false)
        const card = this.props.cards[index];
        cardSwipedLeft(card.clientID, card.toSwipeWith);
    }

    onSwipedRight(index) {
        const card = this.props.cards[index];
        if(card.toSwipeWith) alert('wow');
        cardSwipedRight(card.clientID, card.toSwipeWith);
    }

    render() {
        return (
            <View style={styles.container}>
                <Swiper
                    ref={swiper => {
                        this.swiper = swiper
                    }}
                    verticalSwipe={false}
                    onSwiped={this.onSwiped}
                    cards={this.props.cards}
                    cardIndex={this.state.cardIndex}
                    cardVerticalMargin={80}
                    renderCard={this.renderCard}
                    onSwipedAll={this.props.onSwipedAllCards}
                    onSwipedLeft={this.onSwipedLeft}
                    onSwipedRight={this.onSwipedRight}
                    overlayLabels={{
                        left: {
                            title: 'NOPE',
                            style: {
                                label: {
                                    backgroundColor: 'black',
                                    borderColor: 'black',
                                    color: 'white',
                                    borderWidth: 1
                                },
                                wrapper: {
                                    flexDirection: 'column',
                                    alignItems: 'flex-end',
                                    justifyContent: 'flex-start',
                                    marginTop: 30,
                                    marginLeft: -30
                                }
                            }
                        },
                        right: {
                            title: 'LIKE',
                            style: {
                                label: {
                                    backgroundColor: 'black',
                                    borderColor: 'black',
                                    color: 'white',
                                    borderWidth: 1
                                },
                                wrapper: {
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    justifyContent: 'flex-start',
                                    marginTop: 30,
                                    marginLeft: 30
                                }
                            }
                        }
                    }}
                    animateOverlayLabelsOpacity
                    animateCardOpacity
                >
                </Swiper>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
    },
    text: {
        textAlign: 'center',
        fontSize: 50,
    },
    done: {
        textAlign: 'center',
        fontSize: 30,
        color: 'white',
    }
})