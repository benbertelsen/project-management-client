import React from 'react';
import { addProject, uploadFile } from '../api';
import { toast } from 'react-toastify';

class AddProject extends React.Component {
    state = {
        title: "",
        description: "",
        imageUrl: "",
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    //NB: Lot of stuff below which is a bit abstact, but releates to uploading and handling images
    handleFormSubmit = async (event) => {
        event.preventDefault();

        const uploadData = new FormData();
        uploadData.append("image", this.state.imageUrl);

        const response = await uploadFile(uploadData);

        const newProject = {
            imageUrl: response.data.imageUrl,
            title: this.state.title,
            description: this.state.description,
        };

        await addProject(newProject);
        
        //TOAST an npm package and our ability to send a little 'we got your submission'-message (that can be styled)
        toast.success("Project created");

        // .HISTORY.PUSH sends the user onwards to the URL we have specified after the function has executed
        this.props.history.push("/");
    };

    handleChangeFile = (event) => {
        this.setState({ 
            imageUrl: event.target.files[0], 
        });    
    };

    //The encType enables us to do image umpoade together with the onChange handleChangeFile command
    render() {
        const { title, description } = this.state;
        return (
        <div>
            <h2>Add Project</h2>
            <form onSubmit={this.handleFormSubmit} encType="multipart/form-data">
                <label>Title</label>
                <input 
                type="text" 
                onChange={this.handleChange} 
                name="title" 
                value={title} 
                />
                <label>Description</label>
                <input 
                type="text"
                onChange={this.handleChange} 
                name="description" 
                value={description} 
                />
                <label>Image</label>
                <input
                type="file" 
                onChange={this.handleChangeFile} 
                name="image" 
                />
                <button type="submit">Create</button>
            </form>
        </div>
        );
    }
}

export default AddProject;