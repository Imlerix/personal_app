import React from 'react';
import style from './style.module.scss';
import { Btn } from '../Portfolio/styled';
import SearchPanel from '../../components/SearchPanel';
import TagPanel from '../../components/TagPanel';
import Hidebar from '../../components/Hidebar';
import {connect} from 'react-redux'
import { bindActionCreators, compose } from 'redux';
import * as BlogAction from '../../actions/BlogAction';
import * as CommonAction from '../../actions/CommonAction';

class Blog extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          isMobile: false,
        }
    }

    actionsBlog = bindActionCreators(BlogAction, this.props.dispatch);
    actionsCommon = bindActionCreators(CommonAction, this.props.dispatch);

    render() {
      const {
        main,
        wrapSearch,
        wrapTag,
        disabled_btn
      } = style;

      return(
          <div className={style.BlogContainer}>
            <Hidebar>
              {
                this.state.isMobile
                &&
                <Btn active={this.props.blog.isOpenTags}
                     onClick={() => this._switchTags()}
                >2: Tags</Btn>
              }
              {
                this.state.isMobile
                &&
                <Btn active={this.props.blog.isOpenSearch}
                     onClick={() => this._switchSearch()}
                >1: Search</Btn>
              }
              <div className={disabled_btn}>Blog</div>
            </Hidebar>
            {
              this.props.blog.isOpenSearch
              &&
              <div className={wrapSearch}><SearchPanel/></div>
            }
            <div className={main}>
              {this.props.children}
            </div>
            {
              this.props.blog.isOpenTags
              &&
              <div className={wrapTag}><TagPanel/></div>
            }
          </div>
      )
    }

    updateWidth = () => {
      this.setState({isMobile: window.innerWidth <= 999})
      if (this.state.isMobile ){
        if (this.props.blog.isOpenSearch){
          this._switchSearch()
        }
        if (this.props.blog.isOpenTags){
          this._switchTags()
        }
      } else {
        if (!this.props.blog.isOpenSearch){
          this._switchSearch()
        }
        if (!this.props.blog.isOpenTags){
          this._switchTags()
        }
      }
    }
    componentDidMount() {

      window.addEventListener('resize', this.updateWidth)
      this.updateWidth()
    }
    componentWillMount() {
      this.updateWidth()
    }
    componentWillUnmount() {
      window.removeEventListener('resize', this.updateWidth)
    }

    _switchSearch = () => {
      this.actionsBlog.switchSearch()
    }

    _switchTags = () => {
      this.actionsBlog.switchTags()
    }


}

const mapStateToProps = (state) => ({
  ...state
})
export default connect(mapStateToProps)(Blog);
