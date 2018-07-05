/** @jsx h */
function h(type, attributes, ...args) {
  let children = args.length ? [].concat(...args) : [];
  return { type, attributes, children };
}

import NevinhaComponent from './NevinhaComponent';
import {createVirtualElement, updateElement} from './NevinhaDOM';

class Form extends NevinhaComponent {
  constructor(){
    super();

    this.teste = this.teste.bind(this);
    this.state.nevinha = 'asd'
  }

  teste(){
    this.setState({
      nevinha: 'oi'
    })
  }

  componentWillMount(){
    console.log('vai montar!');
  }

  componentDidMount(){
    console.log('montou');
  }

  render() {
    return (
      <div class="form">
        <input type = "text" data-state={this.state.nevinha} onClick={this.teste} />

        {this.state.nevinha == 'oi' && (
          <p>Passou!</p>
        )}
      </div>
    );
  }
};

const app = (
  <div class="asds">
    <Form />

    <ul>
      <li>asd</li>
    </ul>
  </div>
);

const b = (
  <div class="nevinha teasd">
    <p>asd</p>

    <ul>
      <li>asd</li>
    </ul>
  </div>
);


const $root = document.querySelector('#my-app');
$root.appendChild(createVirtualElement(app));

const $reload = document.querySelector('button');

$reload.addEventListener('click', () => {
  updateElement($root, b, app);
});
