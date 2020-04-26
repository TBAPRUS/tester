import React, { Component } from "react";
import { connect } from 'react-redux'

import {
  fetchAddTests,
  fetchTests,
  setLast
} from '../../actions/tests/main'

import Test from './Test'

class Tests extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(setLast(false))
    this.props.dispatch(fetchTests(0));
  }

  handleShowTests() {
    this.props.dispatch(fetchAddTests(Math.floor(this.props.tests.length/10)));
  }

  render() {
    let showTests;
    if(this.props.tests) {
      showTests = this.props.tests.map((test) => {
        return <Test key={test.id} test={test} />
      });
    } else {
      showTests='Тестов нет'
    }

    return (
      <div className='content'>
        <div className='tests'>
          {showTests}
        </div>
        {!this.props.last && this.props.tests > 0 ? 
          <button onClick={() => this.handleShowTests()}>
            Показать следующие тесты
          </button> : 
          null
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { tests, last } = state.tests
  return { tests, last };
}

export default connect(mapStateToProps)(Tests);