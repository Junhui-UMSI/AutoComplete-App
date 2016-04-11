function Tries(key) {
    this.key = key;
    this.child = {};
}

Tries.prototype.put = function(name) {
    var node = this;
    var len = name.length;
    var i = 0;
    var currentLetter;

    for (i = 0; i < len; i++) {
        currentLetter = name[i];
        node = node.child[currentLetter] || (node.child[currentLetter] = new Tries(currentLetter));
        // node = node[currentLetter] || (node[currentLetter] = new Tries(currentLetter));
    }
    node.name = name;
}

Tries.prototype.get = function(name) {
    var node = this;
    var len = name.length;
    var i, node;
    for (i = 0; i < len; i++) {
        if (!(node = node.child[name[i]])) {
            break;
        }
    }

    return (i === len)? node.name : 'not found';
}

Tries.prototype.getAll = function(name) {
    var node = this;
    var len = name.length;
    var resultList = [];

    // From the root node, get the last element based on each char in ```name```
    // Get all children of the element
    // Perform BFS using queue
    if (!node) {
        throw new error('Empty Tries');
    }

    // Go through the whole tries based on each char in ```name```
    // Get the deepest tries node
    var i;
    for (i = 0; i < len; i++) {
        if (!(node = node.child[name[i]])) {
            break;
        }
    }
    if (node === undefined) {
      resultList.push("No Result found");
      return resultList;
    }

    var que = [];
    que.push(node);
    while(que.length !== 0) {
        node = que.shift();
        if (node.name !== undefined) {
          resultList.push(node.name);
        }
        if (node.child.length !== 0) {
            var i;
            var keys = Object.keys(node.child);
            for (i = 0; i < keys.length; i++) {
                que.push(node.child[keys[i]]);
            };
        }
        // else if (node.child.length == 0 && resultList.length == 0){
        //    console.log(node.name);
        //    resultList.push("Noresult");
        // }
    }
    return resultList;
}

export default Tries;
