import React from 'react';
import { getProject, deleteProject,  } from "../api";
import { toast } from 'react-toastify';
import { NavLink } from "react-router-dom";

class ProjectDetail extends React.Component {
    state = {
        id: "",
        title: "",
        description: "",
        imageUrl: "",
    }

    async componentDidMount() {
        const response = await getProject(this.props.match.params.id);
        this.setState({
            id: response.data._id,
            title: response.data.title,
            description: response.data.description,
            imageUrl: response.data.imageUrl,
        });
    }

//Handle delete project
    handleDeleteProject = async () => {
        await deleteProject(this.state.id);
        toast.success("Project deleted");
        this.props.history.push("/");
    };

//Rendering the project details here + a delete button 🗑
    render() {
        const { id, title, description, imageUrl } = this.state;
        return (
            <div>
                <h2>{title}</h2>
                <p>{description}</p>
                {imageUrl && <img src={imageUrl} alt="project" />}
            <div>
                <button onClick={this.handleDeleteProject}>Delete</button>
                <button onClick={() => {this.props.history.push(`/projects/${id}/edit`);
                }}>Edit</button>
          
          <NavLink to={`/projects/${id}/edit`}>Edit</NavLink>
            </div>
            </div>
        );
    }
}

export default ProjectDetail;








//ANOTHER WAY OF SETTING STATET

//We are doing something NEW here by setting MULTIPLE STATES for the different values. This is okay. 👇 Often seen.
        // const NewExpenseForm = (props) => {
        //     const [enteredTitle, setEnteredTitle ] = useState('');
        //     const [enteredAmount, setEnteredAmount ] = useState('');
        //     const [enteredDate, setEnteredDate ] = useState('');
    
//When the even change fires, the handler function starts and updates the state    
        // const titleChangeHandler = (event) => {
        //     setEnteredTitle(event.target.value);
        // };