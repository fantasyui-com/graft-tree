const EventEmitter = require('events');

class Node  extends EventEmitter {

  constructor(name, parentNode) {
    super();
    this.name = name;
    this.data = null;
    this.parentNode = parentNode;
    this.childNodes = new Map();
  }

  has(name) { return this.childNodes.has(name); }
  add(name) { this.childNodes.set(name, new Node(name, this)); return this.childNodes.get(name); }
  set(name, object) { this.childNodes.set(name, object); return object; }
  get(name) { return this.childNodes.get(name); }

  pipe(object) {
    this.emit('object', object);
    for (let [key, child] of this.childNodes) {
      child.pipe(object);
    }
  }

  location (){
    const response = [];
    let selectedNode = this;
    while(selectedNode){
      response.unshift(selectedNode.name);
      selectedNode = selectedNode.parentNode;
    }
    return response;
  }
  locate( input ) {
    const path = Array.isArray(input)?input:input.split('/');
    let selectedNode = this;
    path.forEach(function(name){
        if( selectedNode && selectedNode.has(name) ){
          selectedNode = selectedNode.get(name);
        }else{
          selectedNode = null;
        }
    });
    return selectedNode;
  }

}

module.exports = Node;
