import React from 'react';

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

var CommentBox = React.createClass({
    getInitialState: function(){
      return {
        cities:['san', 'san jose', 'santiago', 'san francisco', 'santa rosa', 'san juan', 'sabadell', 'salamanca', 'salt lake city', 'salinas', 'salem', 'sausalito', 'taipei', 'tel aviv', 'tempe', 'termez', 'temuco', 'tiajuna', 'tieling', 'thousand oaks', 'thunder bay', 'tokyo', 'tulsa'],
        keyword: "",
        searchResult:[]
      };
    },
    performSearchInKeyword: function(keyword){
      return this.autoComplete(keyword);
    },

    handleChange: function(event){
      console.log(event.target.value);
      this.setState({
        keyword: event.target.value
      });
      // console.log(this.state.keyword);
      var inputText = event.target.value;
      if(inputText.length >=3){
        var result = this.performSearchInKeyword(inputText);
        console.log(result);
      }
      else if(inputText.length <3 && inputText.length >0){
        this.state.trie = "Please type in at least three words to complete search ";
      }
      else if(inputText.length == 0){
        this.state.trie = " ";
      };
    },
    autoComplete: function(input) {
        /**
         * Auto Complete:
         *     - Goal: Use Tries to generate the search tree
         *     - Input the character (including space, etc)
         *     - Output: the current node representing the
         */
        const cities = this.state.cities;

        var trie = new Tries("0");
        var i;
        for (i = 0; i < cities.length; i++) {
            trie.put(cities[i]);
        };
        console.log(trie);
        var searchresult = trie.getAll(input).toString().split(' ');
        this.state.trie = searchresult;
        return trie.getAll(input);
    },
    render: function () {
        // var result = this.autoComplete("san");
        // console.log(result);
        return (
            <div className="commentBox">
                AutoComplete Application for Guidebook
                <form>
                <input
                  type = "text"
                  onChange={this.handleChange}
                  ref = "textarea"
                  value = {this.state.keyword}
                />
                </form>
                <ul>Search Result: {this.state.trie}</ul>
            </div>
        );
    }
});

React.render(<CommentBox />, document.getElementById("app"));
