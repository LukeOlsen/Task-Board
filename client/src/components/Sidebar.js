import React from 'react';
import { connect } from 'react-redux';
import { setActiveProject, addProject } from '../actions/index';
import { updateAddProject } from '../actions/actionsAPI';
import Button from '@material-ui/core/Button';


const mapStateToProps = state => {
    return {
        projects: state.boardReducer.projects,
        user: state.userReducer.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setActiveProject: a => dispatch(setActiveProject(a)),
        updateAddProject: p => dispatch(updateAddProject(p))
    }
}

const Sidebar = ({projects, user, setActiveProject, updateAddProject}) => {

    return (
        <div className="sidebar">
            <h4>PROJECTS</h4>
            <Button variant="contained" color="primary" onClick={event => updateAddProject()}>New Project</Button>
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