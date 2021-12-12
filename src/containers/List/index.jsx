import Card from "@/components/Card"
import Search from "@/components/Search"
import foodAPI from "@/api/foodAPI"

import { useState, useEffect } from "react"
import { useParams } from "react-router"



export default function List(){
    const params = useParams()
    const[recipesData, setRecipesData] = useState([])

    async function searchData(query=""){
        const payload = await foodAPI(`/search.php?s=${query}`, "GET");
        setRecipesData(payload.meals || []);
    }

    async function getRecipes(){
        const response = await foodAPI(`/filter.php?c=${params.category}`, "GET")
        setRecipesData(response.meals)
        console.log(recipesData)
    }

    useEffect(()=>{
        getRecipes()
    }, [])

    return(
        <div className="container d-flex flex-column justify-content-center">
            {/*<!-- Search Section -->*/}
            <p className="text-center fs-1 fw-bold text-success mt-5">
                {params.category} 
            </p>

            <Search search={searchData}/>

            {/*<!-- Card List Section -->*/}
            <div className="row row-cols-1 row-cols-md-6 g-4 mt-3">
            {
                recipesData.map((data, index)=>{
                   return(
                    <Card
                        key={data.idMeal}
                        category={data.strMeal}
                        image={data.strMealThumb}
                        link={`/detail/${data.idMeal}`}
                    />
                   )
                })
            }
            </div>
        </div>
    )
}