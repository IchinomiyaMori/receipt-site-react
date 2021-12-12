import {useState, useEffect} from "react"
import foodAPI from '@/api/foodAPI'
import {useLocation} from 'react-router-dom'

// components
import Card from '@/components/Card'
import Search from '@/components/Search'

export default function Home() {
    const [categoryData, setCategoryData] = useState([])

    async function getCategoryData() {
      const payload = await foodAPI("/categories.php", "GET");
      setCategoryData(payload.categories)
    }

    function handleSearchData(){
        
    }

    useEffect(() => {
        getCategoryData()
    }, [])
    
    return ( 
        <div className="container d-flex flex-column justify-content-center">
            {/*<!-- Search Section -->*/}
            <p className="text-center fs-1 fw-bold text-success mt-5">Food Recipes</p>

            {/*<!-- Card List Section -->*/}
            <div className="row row-cols-1 row-cols-md-5 g-4 mt-3">
                
                {
                    categoryData.map((item, index)=>{
                        return(
                            <Card
                                key={index}
                                category={item.category}
                                description={item.strCategoryDescription}
                                image={item.strCategoryThumb}
                                link={`/list/${item.strCategory}`}
                            />
                        )
                    }) 
                }
                    
            </div>
        </div>
    )
}