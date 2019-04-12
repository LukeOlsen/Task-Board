import React from 'react';
import { connect } from 'react-redux';
import { setActiveProject, addProject } from '../actions/index';
import Button from '@material-ui/core/Button';


const mapStateToProps = state => {
    return {
        projects: state.projects,
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setActiveProject: a => dispatch(setActiveProject(a)),
        addProject: p => dispatch(addProject(p))
    }
}

const Sidebar = ({projects, users, setActiveProject, addProject}) => {
    console.log(projects)
    console.log(projects)

    return (
        <div className="sidebar">
            <h4>PROJECTS</h4>
            <a href="/auth/google"> Sign In With Google</a>
            <Button variant="contained" color="primary" onClick={() => addProject()}>New Project</Button>
            {Object.keys(projects).map(d => {
                return (
                    <div onClick={() => setActiveProject(projects[d].id)}>
                        <p id={projects[d].id}>{projects[d].title}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);