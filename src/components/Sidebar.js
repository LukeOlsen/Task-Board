import React from 'react';
import { connect } from 'react-redux';
import { setActiveProject } from '../actions/index';

const mapStateToProps = state => {
    return {
        projects: state.projects,
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setActiveProject: a => dispatch(setActiveProject(a))
    }
}

const Sidebar = ({projects, users, setActiveProject}) => {
    console.log(projects)
    console.log(projects)

    return (
        <div className="sidebar">
            <h4>PROJECTS</h4>
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