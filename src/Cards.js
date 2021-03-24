import React from 'react';
import { Frame, useMotionValue, useTransform, useAnimation} from 'framer'
import './Cards.css'


const style = {
    backgroundImage: "URL(https://jsonplaceholder.typicode.com/photos)",
    backgroundRepeat: "no-repeat",
    backgroundColor: "55ccff",
    boxShadow: "5px 10px 18px #888",
    borderRadius: 10,
    height: 300,
};

const App = () => {
    const motionValue = useMotionValue     // To move the card as the user drags the cursor

    const rotateValue = useTransform(motionValue, [-200, 200], [-50, 50]);   // To rotate the card as the card moves on drag

    // To decrease opacity of the card when swipped
    // on dragging card to left(-200) or right(200)
    // opacity gradually changes to 0
    // and when the card is in the center opacity = 1

    const opacityValue = useTransform(motionValue, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);   

    const animControls = useAnimation();     // Framer animation hook

    function Cards() {
        return (
            <div className="Cards">
                <Frame 
                center
                // card can be drag only on x-axis
                drag="x" 
                x = {motionValue}
                rotate = {rotateValue}
                opacity = {opacityValue}
                dragConstraints = {{ left: -1000, right: 1000}}
                style = {style}
                onDragEnd = {(event, info) => {
                    // if the card is dragged only upto 150 on x-axis
                    // bring it back to initial position
                    if (Math.abs(info.point.x) <= 150) {
                        animControls.start({ x: 0 });
                    } else {
                        // if card isdragged beyond 150
                        // make it disappear
                        // making use of ternary operator
                        animControls.start({ x: info.point.x < 0 ? -200 : 200 });
                    }
                }}
                />
            </div>
        )
    }
}

export default Cards
