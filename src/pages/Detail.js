import React from 'react';
import ajax from 'superagent';

class Detail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            active: 'commits',
            commits: [],
            forks: [],
            pulls: [],
        };
    }

    componentWillMount() {

        ajax.get('https://api.github.com/repos/facebook/react/commits')
            .end((error, response) => {
                if (!error && response) {
                    console.dir(response.body);
                    this.setState({ commits: response.body });
                } else {
                    console.log('There was an error fetching from GitHub', error);
                }
            }
        );

        ajax.get('https://api.github.com/repos/facebook/react/forks')
            .end((error, response) => {
                if (!error && response) {
                    console.dir(response.body);
                    this.setState({ forks: response.body });
                } else {
                    console.log('There was an error fetching from GitHub', error);
                }
            }
        );

        ajax.get('https://api.github.com/repos/facebook/react/pulls')
            .end((error, response) => {
                if (!error && response) {
                    console.dir(response.body);
                    this.setState({ pulls: response.body });
                } else {
                    console.log('There was an error fetching from GitHub', error);
                }
            }
        );

    }

    renderCommits() {
        return (<div>
            {this.state.commits.map((commit, index) => {
                const author = commit.author ? commit.author.login : 'Anonymous';

                return (<p key={index}>
                    <strong>{author}</strong>:
                    <a href={commit.html_url}>{commit.commit.message}</a>.
                </p>);
            })}
        </div>);
    }
    renderForks() {
        return (<div>
            {this.state.forks.map((fork, index) => {
                const owner = fork.owner ? fork.owner.login : 'Anonymous';

                return (<p key={index}>
                    <strong>{owner}</strong>:
                    <a href={fork.html_url}>{fork.full_name}</a>.
                </p>);
            })}
        </div>);
    }
    renderPulls() {
        return (<div>
            {this.state.pulls.map((pull, index) => {
                const author = pull.author ? pull.author.login : 'Anonymous';

                return (<p key={index}>
                    <strong>{author}</strong>:
                    <a href={pull.diff_url}>{pull.number}</a>.
                </p>);
            })}
        </div>);
    }

    commitsButtonClicked() {
        const newState = {
            active: 'commits'
        };
        this.setState(newState);
    }
    forksButtonClicked() {
        const newState = {
            active: 'forks'
        };
        this.setState(newState);
    }
    pullsButtonClicked() {
        const newState = {
            active: 'pulls'
        };
        this.setState(newState);
    }

    render() {
        return (<div>
            <button onClick={this.commitsButtonClicked.bind(this)}>Show Commits</button>
            <button onClick={this.forksButtonClicked.bind(this)}>Show Forks</button>
            <button onClick={this.pullsButtonClicked.bind(this)}>Show Pull Requests</button>

            { this.state.active === 'commits' ? renderCommits() : };
            { this.state.active === 'forks' ? renderForks() : };
            { this.state.active === 'pulls' ? renderPulls() : };

        </div>);
    }
}

export default Detail;