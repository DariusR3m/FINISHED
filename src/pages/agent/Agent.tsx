import Single from "../../components/single/Single"
import { singleAgent } from "../../data"
import "./agent.scss"

const Agent = () => {
    
    //Fetch data and send to Single Component
    return (
        <div className="agent">
            <Single {...singleAgent}/>
        </div>
    )
}

export default Agent