import React, { Component } from "react";
import { connect } from 'react-redux'

import Question from './Question'
import Result from './Result'

import {
  fetchTest,
  changeQuestion,
  fetchAnswer
} from '../../actions/test/main'

class Test extends Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchTest(this.props.match.params.id));
  }

  handleClick() {
    const { dispatch, question, id, questions } = this.props;
    let last = question + 1 == questions.length;
    if(!last) {
      dispatch(changeQuestion(question + 1));
    } else {
      dispatch(fetchAnswer(question, id, questions.map((question) => ({id: question.id, select: question.select}))));
    }
  }

  render() {
    const { id, title, img, questions, question, dispatch, result } = this.props;

    if(!id) {
      return null;
    }

    let curQuest;
    if(question >= 0) {
      curQuest = questions[question];
    }

    return (
      <div className='test'>
        {question >= questions.length ? 
        <Result result={result} title={title} img={img} questions={questions} /> : !curQuest ?
        <div className='question' >
          <img src={img} />
          <h1>{title}</h1>
          <button onClick={() => dispatch(changeQuestion(0))}>
            Начать
          </button>
        </div> :
        <Question
          id={question}
          title={curQuest.title}
          img={curQuest.img}
          answers={curQuest.answers}
          select={curQuest.select}
          last={question + 1 == questions.length}
          handleClick={this.handleClick} />}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { id, title, img, questions, question, result } = state.test
  return { id, title, img, questions, question, result };
}

export default connect(mapStateToProps)(Test);