import React, {useEffect,useState} from "react"
import axios from "axios"


const HomePage = async (req,res) =>{

  const [product,setProduct] = useState([]);
  useEffect(() => {
    (async() => {
      const response = await axios.get("http://localhost:8080/api/products")
    console.log(response)
    })
  },[])

  return (
    <div>



    </div>
  )

}

