import React from 'react';
import Tries from './trie';
import cities from './dataEndpoint';


var CommentBox = React.createClass({

/**	 initialState ==============================================================
  *  set initial state of the input text filed, the search key word and the search result.
*/
    getInitialState: function(){
      return {
        cities: cities,
        keyword: "",
        searchResult:[]
      };
    },

/**	 performSearchInKeyword ====================================================
  *  Take the search keyword into the autocomplete function and return search result
*/
    performSearchInKeyword: function(keyword){
      return this.autoComplete(keyword);
    },

/**	 handleChange ==============================================================
  *  Handle the change of the state according to the user input. display different message according to the input message length.
*/
    handleChange: function(event){
      console.log(event.target.value);
      this.setState({
        keyword: event.target.value
      });
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

/**	 Auto Complete =============================================================
  * Auto Complete:
  *     - Goal: Use Tries to generate the search tree
  *     - Input the character (including space, etc)
  *     - Output: the current node representing the
*/
    autoComplete: function(input) {
        // const cities = this.state.cities;
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


/**	 Render =====================================================================
  * Render:
  *     - Goal: Use Tries to generate the search tree
  *     - Input the character (including space, etc)
  *     - Output: the current node representing the
 */
    render: function () {
        return (
            <div className="commentBox">
                AutoComplete Application for Guidebook
                <form>
                <input
                  type = "text"
                  onChange={this.handleChange}
                  ref = "textarea"
                  value = {this.state.keyword}
                  autoFocus = "true" //autofocus on the input filed when page is rendered
                />
                </form>
                <ul>Search Result: {this.state.trie}</ul>
            </div>
        );
    }
});

export default CommentBox;
