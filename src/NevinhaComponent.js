import {updateElement, createVirtualElement} from './NevinhaDOM';

class NevinhaComponent {
  constructor(props, context) {
    this.props = props;
    this.context = context;
    this.state = this.state || {};

    this.componentWillMount();
  }

  componentWillMount(){
  }

  componentDidMount(){
  }

  componentWillUnmount(){
  }

  setState(state){
    const currentElement = this.render();

    Object.keys(state).map(key => this.state[key] = state[key]);

    updateElement(this.element.parentNode, this.render(), currentElement)
  }
}

export default NevinhaComponent;
