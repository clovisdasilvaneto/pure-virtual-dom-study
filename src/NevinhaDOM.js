function createVirtualElement(node){
  const {type, attributes, children} = node;

  if(typeof node == 'string'){
    return document.createTextNode(node);
  }

  if((typeof type == "function") && type.prototype.render){
    const instance = new type();
    const createdElement = createVirtualElement(instance.render());
    instance.element = createdElement;
    return createdElement;
  }else if(typeof type == "function"){
    return createVirtualElement(type())
  }else if(!children){
    return;
  }

  const $el = document.createElement(type);
  children
        .map(createVirtualElement)
        .forEach(newNode => {
          if(newNode){
            $el.appendChild(newNode)
          }
        });

  if(attributes) {
    setAttributes($el, attributes);
  }

  return $el;
}

function setAttributes($el, attributes) {
  Object.keys(attributes).map(attr => {
    if(isEvent(attr)){
      let eventName = attr.split('on')[1].toLowerCase();
      $el.addEventListener(eventName, attributes[attr]);
    }else {
      $el.setAttribute(attr, attributes[attr]);
    }
  });
}

function isEvent(attr){
  return /^on/.test(attr);
}

//Diff
function updateElement($parent, newNode, oldNode, index = 0) {
  if (!oldNode) {
    $parent.appendChild(
      createVirtualElement(newNode)
    );
  } else if (!newNode) {
    $parent.removeChild(
      $parent.childNodes[index]
    );
  } else if (changed(newNode, oldNode)) {
    $parent.replaceChild(
      createVirtualElement(newNode),
      $parent.childNodes[index]
    );
  }else if (newNode.type) {
    const newLength = newNode.children.length;
    const oldLength = oldNode.children.length;
    for (let i = 0; i < newLength || i < oldLength; i++) {
      updateElement(
        $parent.childNodes[index],
        newNode.children[i],
        oldNode.children[i],
        i
      );
    }
  }else {

  }
}

function changed(node1, node2) {
  return typeof node1 !== typeof node2 ||
         typeof node1 === 'string' && node1 !== node2 ||
         node1.type !== node2.type
}


export {changed, createVirtualElement, updateElement};
