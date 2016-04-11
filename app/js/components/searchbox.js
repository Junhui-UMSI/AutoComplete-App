import React from 'react';
import Tries from './trie';
import cities from './dataEndpoint';


var SearchBox = React.createClass({

/**	 initialState ==============================================================
  *  construt the search tree (trie) based on the input dataEndpoint
  *  set initial state of the cities, searchResult and trie.
*/
    getInitialState: function(){
      var trie = new Tries("0");
      var i;
      for (i = 0; i < cities.length; i++) {
          trie.put(cities[i]);
      };
      return {
        cities: cities,
        searchResult:[],
        trie: trie
      };
    },

/**	 handleChange ==============================================================
  *  Handle the change of the state according to the user input.
*/
    handleChange: function(event){
      var inputText = event.target.value;
      if(inputText.length >=3){
        this.autoComplete(inputText);
      }
      else if(inputText.length <3 && inputText.length >0){
        this.setState({
          searchResult:["Please type in at least three words to complete search "]
        });
      }
      else if(inputText.length == 0){
        this.setState({
          searchResult:[]
        });
      };
    },

/**	 Auto Complete =============================================================
  * adopt the value of user input and use trie to search through the list and
   return all the results that match the user input.
*/
    autoComplete: function(input) {
        this.setState({
          searchResult:this.state.trie.getAll(input)
        });
    },


/**	 Render =====================================================================
  * Render:
  *    - render back the DOM elements to the page
 */
    render: function () {
        return (
            <div className="commentBox">
                AutoComplete Application for Guidebook
                <form>
                <input
                  type = "text"
                  ref = "textarea"
                  autoFocus = "true" //autofocus on the input filed when page is rendered
                  onChange={this.handleChange}
                />
                </form>
                <ResultList searchResult = {this.state.searchResult} />
            </div>
        );
    }
});

/**	 ResultList   ==============================================================
  *  Place the result in a list for better UI experience
*/
var ResultList = React.createClass({
  render: function() {
    var resultItem = function(searchResult) {
      return <li>{searchResult}</li>;
    };
    return <ul>{this.props.searchResult.map(resultItem)}</ul>;
  }
});

export default SearchBox;
