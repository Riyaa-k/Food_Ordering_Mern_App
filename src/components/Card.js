import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useCart } from './ContextReducer';
import styles from './card.module.css';

const Card = (props) => {
    const dispatch = useDispatch();
    const data = useCart();
    const priceRef = useRef();

    const options = props.options;
    let foodItem = props.item;
    const priceOptions = Object.keys(options);

    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");

    const handleAddToCart = async () => {
        let food = []
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;

                break;
            }
        }
        // console.log(food)
        // console.log(new Date())
        if (food !== []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id:props.foodItem._id, price: finalPrice, qty:qty })
                return
            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id:props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size, img: props.ImgSrc })
                console.log("Size different so simply ADD one more to the list")
                return
            }
            return
        }

        await dispatch({ type: "ADD", id:props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })

    }

    let finalPrice = qty * parseInt(options[size]);
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])

    
    
    
      
    return (
        <div>
            <div className="card mt-5 " style={{ width: "18rem", maxHeight: "450px" }}>
                <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "200px", objectFit: "fill" }} />
                <div className="card-body h-100 text-red">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <p className="card-text">Some quick example text to </p>

                    <div className="w-100">
                        <select className="m-2 h-100 g-danger rounded" onChange={(e) => setQty(e.target.value)}>
                            {Array.from(Array(4), (e, i) => (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            ))}
                        </select>

                        <select className="m-2 h-100 bg-danger rounded" id="" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                            {priceOptions.map((data) => (
                                <option key={data} value={data}>{data}</option>
                            ))}
                        </select>

                        <div className='d-inline h-100 fs-7'>
                            {/* ctrl+alt+4=₹ */}
                            ₹{finalPrice}/-</div>
                    </div>
                    <hr />
                    <button className="btn bg-black text-danger justify-center ms-2 ${styles['button-hover']}" onClick={handleAddToCart}>
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Card;

