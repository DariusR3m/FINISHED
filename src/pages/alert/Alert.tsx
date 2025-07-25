import Single from "../../components/single/Single"
import { singleAlert } from "../../data"
import "./alert.scss"

const Alert = () => {
    
    //Fetch data and send to Single Component
    return (
        <div className="alert">
            <Single {...singleAlert}/>
        </div>
    )
}

export default Alert