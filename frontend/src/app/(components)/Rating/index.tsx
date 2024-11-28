import { Star } from "lucide-react";

type RatingProps ={
    rating: number;
}

export const Rating = ({rating}:RatingProps)=>{
    return [1,2,3,4,5].map((index)=>(
        <Star key={index} color={index<=rating?"#FFC107":"#E4E5E9"} className="w-4 h-4"/>
    ))
}