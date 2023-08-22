import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
// import Carousel from '../components/Carousel';

const Home = () => {

    const [search, setSearch] = useState("");
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);

    const loadData = async () => {
        try {
            let response = await fetch("http://localhost:5000/api/foodData", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            response = await response.json();
            setFoodItem(response[0]);
            setFoodCat(response[1]);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    // console.log("Food Categories:", foodCat);


    return (
        <>
        <div>
        <Navbar />
        </div>
            
            {/* carousel */}
            <div
                id="carouselExampleFade"
                className="carousel slide carousel-fade"
                
                data-bs-ride="carousel"
                style={{ objectFit: "fill",height:"100%",padding:"5px" }}
            >
                <div className="carousel-inner" id="carousel">
                    <div className="carousel-caption" style={{ zIndex: "10" }}>
                        <div className="d-flex justify-content-center rounded">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                value={search}
                                onChange={(e)=>{setSearch(e.target.value)}}
                            />
                            
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img
                            src="https://source.unsplash.com/random/1500x1200/?burger"
                            className="w-100 h-100"
                            style={{ filter: "brightness(40%)" }}

                            alt="..."
                        />
                    </div>
                    <div className="carousel-item">
                        <img
                            src="https://source.unsplash.com/random/1500x1200/?cake"
                            className="w-100 h-100"
                            style={{ filter: "brightness(40%)"  }}
                            alt="..."
                        />
                    </div>
                    <div className="carousel-item">
                        <img
                            src="https://source.unsplash.com/random/1500x900/?pizza"
                            className="w-100 h-100"
                            style={{ filter: "brightness(40%)"  }}
                            alt="..."
                        />
                    </div>
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleFade"
                    data-bs-slide="prev"
                >
                    <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleFade"
                    data-bs-slide="next"
                >
                    <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>




            {/*displaying data  */}
            <div className='container'>
                {

                    foodCat.length > 0 ? (

                        foodCat.map((data) => {
                            return (
                                <div className='row mb-2 m-3'>
                                    <div key={data._id} className='fs-3 m-3'>
                                        {data.CategoryName}
                                    </div>
                                    <hr className='bg-red'/>
                                    {foodItem !== [] ?
                                        foodItem.filter((item) => (item.CategoryName == data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase()))).map(filterItems => {
                                            return (
                                                <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                                                    <Card foodItem={filterItems}
                                                        options={filterItems.options[0]}
                                                        
                                                    ></Card>

                                                </div>
                                            )
                                        })
                                        : <div> no such data found</div>}
                                </div>
                            )
                        }
                        )
                    ) : (
                        <div>No food categories available</div>
                    )
                }

            </div>

            <Footer />
        </>
    );
}

export default Home;

// *******************************************8


// import React, { useEffect, useState } from 'react';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import Card from '../components/Card';
// // import Carousel from '../components/Carousel';

// const Home = () => {

//     const [search, setSearch] = useState("");
//     const [foodCat, setFoodCat] = useState([]);
//     const [foodItem, setFoodItem] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);

//     const loadData = async () => {
//         try {
//             let response = await fetch("http://localhost:5000/api/foodData", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 }
//             });
//             response = await response.json();
//             setFoodItem(response[0]);
//             setFoodCat(response[1]);
//             setIsLoading(false);
//         } catch (error) {
//             console.error("Error fetching data:", error);
//         }
//     }

//     useEffect(() => {
//         loadData();
//     }, []);

//     return (
//         <>
//             <div>
//                 <Navbar />
//             </div>

//             {/* Display loading spinner if loading */}
//             {isLoading ? (
//                 <div className="text-center mt-5">
//                     <div className="spinner-border" role="status">
//                         <span className="visually-hidden">Loading...</span>
//                     </div>
//                 </div>
//             ) : (
//                 <>
//                     {/* carousel */}
//                     <div
//                         id="carouselExampleFade"
//                         className="carousel slide carousel-fade"
//                         data-bs-ride="carousel"
//                         style={{ objectFit: "fill", height: "100%", padding: "5px" }}
//                     >
//                         <div className="carousel-inner" id="carousel">
//                             {/* Your carousel items */}
//                             <div className="carousel-item active">
//                                 <img
//                                     src="https://source.unsplash.com/random/1500x900/?pizza"
//                                     className="w-100 h-100"
//                                     style={{ filter: "brightness(40%)" }}
//                                     alt="..."
//                                 />
//                             </div>
//                             <div className="carousel-item">
//                                 <img
//                                     src="https://source.unsplash.com/random/1500x900/?biryani"
//                                     className="w-100 h-100"
//                                     style={{ filter: "brightness(40%)"  }}
//                                     alt="..."
//                                 />
//                             </div>
//                             <div className="carousel-item">
//                                 <img
//                                     src="https://source.unsplash.com/random/1500x900/?starter"
//                                     className="w-100 h-100"
//                                     style={{ filter: "brightness(40%)"  }}
//                                     alt="..."
//                                 />
//                             </div>
//                         </div>
//                         <button
//                             className="carousel-control-prev"
//                             type="button"
//                             data-bs-target="#carouselExampleFade"
//                             data-bs-slide="prev"
//                         >
//                             <span
//                                 className="carousel-control-prev-icon"
//                                 aria-hidden="true"
//                             ></span>
//                             <span className="visually-hidden">Previous</span>
//                         </button>
//                         <button
//                             className="carousel-control-next"
//                             type="button"
//                             data-bs-target="#carouselExampleFade"
//                             data-bs-slide="next"
//                         >
//                             <span
//                                 className="carousel-control-next-icon"
//                                 aria-hidden="true"
//                             ></span>
//                             <span className="visually-hidden">Next</span>
//                         </button>
//                     </div>

//                     {/* displaying data */}
//                     <div className='container'>
//                         {foodCat.length > 0 ? (
//                             foodCat.map((data) => {
//                                 return (
//                                     <div className='row mb-2 m-3' key={data._id}>
//                                         <div className='fs-3 m-3'>
//                                             {data.CategoryName}
//                                         </div>
//                                         <hr className='bg-red'/>
//                                         {foodItem !== [] ?
//                                             foodItem
//                                                 .filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
//                                                 .map(filterItems => (
//                                                     <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
//                                                         <Card
//                                                             foodItem={filterItems}
//                                                             options={filterItems.options[0]}
//                                                         />
//                                                     </div>
//                                                 ))
//                                             : <div>No such data found</div>}
//                                     </div>
//                                 );
//                             })
//                         ) : (
//                             <div>No food categories available</div>
//                         )}
//                     </div>

//                     <Footer />
//                 </>
//             )}
//         </>
//     );
// }

// export default Home;
