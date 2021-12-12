import { useState, useEffect } from "react"
import { useParams } from "react-router"
import foodAPI from "@/api/foodAPI"


export default function Detail(){
    const [data, setData] = useState([])
    const [ingredients, setIndgredients] = useState([])
    const params = useParams()

    async function getDetailData(){
        const payload = await foodAPI(`/lookup.php?i=${params.id}`)
        setData(payload.meals[0])


        for (let i = 1; i < 20; i++) {
            if (data[`strIngredient${i}`]) {
                if(i === 1){
                    setIndgredients([data[`strIngredient${i}`] + " (" + data[`strMeasure${i}`] + ")"])
                }else{
                    setIndgredients((oldData)=>[...oldData , data[`strIngredient${i}`] + " (" + data[`strMeasure${i}`] + ")"])
                }
            }
        }
    }

    useEffect(()=>{
        getDetailData()
    })

    return(
        <div className="container">
        <p className="text-center fs-1 fw-bold text-success my-5">{ data.strMeal }</p>
            <div class="card mb-3 mt-5">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src={data.strMealThumb} class="img-fluid rounded-start" alt="..."/>
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">{ data.strMeal }</h5>
                            
                            <p className="card-text mt-4 mt-md-0 mb-3 fw-bold fs-5">Ingredients:</p>
                                <ul>
                                {
                                    ingredients.map((ingredient, index)=>{
                                        return(
                                            <li key={index}>
                                                { ingredient }
                                            </li>
                                        )
                                    })
                                }
                                </ul>
                            <p classNameName="card-text mb-3 fw-bold fs-5">Steps:</p>
                            <p>{ data.strInstructions }</p>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    )
}