import React from 'react';
import './app.css';
import AppBar from '@material-ui/core/AppBar';
import MonacoEditor from 'react-monaco-editor';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SumExercise from './exercises/sum.json';
import TestCase from './test-case';

const geval = eval;

class App extends React.Component {
  constructor(props) {
    super(props);
    const exercise = SumExercise;
    this.state = { code: exercise.template, logs: '...', activeTab: 0, exercise, tests: [] };
  }
  onChange(code) {
    this.setState({ code });
  }
  runTests() {
    const { exercise, code } = this.state;
    const results = exercise.testCases.map((testCase) => {
      geval(code);
      return { description: testCase.description, result: geval(testCase.verification) };
    });
    this.setState({ tests: results });
  }
  changeTab(event, activeTab) {
    this.setState({ activeTab });
  }
  renderTaskDescription() {
    const { exercise } = this.state;
    return (
      <div class="tab-container task-description">
        <h2>Task description</h2>
        <p>{exercise.description}</p>
      </div>
    );
  }
  renderTestCases() {
    const { tests } = this.state;
    return (
      <div class="tab-container test-cases">
        <h2>Test Cases</h2>
          { tests.length === 0 ? 'Click on "Verify" button to run test cases' : null }
          { tests.map((test) => TestCase(test)) }
      </div>
    );
  }
  render() {
    const { code, activeTab } = this.state;
    const options = {
      selectOnLineNumbers: true,
      automaticLayout: true
    };
    return (
      <div className="code-sandbox">
        <header>
          <h1>Code Sandbox</h1>
        </header>
        <main>
          <Paper className="paper code-editor">
            <MonacoEditor
              language="javascript"
              theme="vs-dark"
              width="100%"
              height="100%"
              value={code}
              options={options}
              onChange={this.onChange.bind(this)}
            />
          </Paper>
        </main>
        <aside className="additional-info">
          <AppBar position="static">
            <Tabs value={activeTab} onChange={this.changeTab.bind(this)}>
              <Tab label="Task description" />
              <Tab label="Test cases" />
            </Tabs>
          </AppBar>
            { activeTab === 0 ? this.renderTaskDescription() : null }
            { activeTab === 1 ? this.renderTestCases() : null }
        </aside>
        <Paper className="code-actions paper">
          <Button className="button" variant="contained" color="primary" onClick={this.runTests.bind(this)}>Verify</Button>
        </Paper>
      </div>
    );
  }
}

export default App;
