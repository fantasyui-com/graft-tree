const assert = require('assert');

const Node = require('.');

const universe = new Node('Universe');

const earth = universe.add( 'Earth' );

earth.add('Ocean');

assert.equal( universe.locate('Earth/Ocean').name , 'Ocean' );
